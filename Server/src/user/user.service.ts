import { ForbiddenException, UnauthorizedException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserProvider } from './entities/user.entity';
import { UpdateUserDTO } from './dto/update-user.dto';
import * as speakeasy from "speakeasy";
import { TwofaVerificationDTO } from './dto/twofa-verification.dto';
import { ConfigService } from '@nestjs/config';
import { AchievmentService } from 'src/achievment/achievment.service';
import { Achievment } from 'src/achievment/entities/achievment.entity';
import { v4 as uuidv4} from "uuid";
@Injectable()
export class UserService {
    private logger: Logger = new Logger(UserService.name);
    constructor (
        private readonly configService: ConfigService,
        private achievmentService: AchievmentService,
        @InjectRepository(User) 
    private userRepository: Repository<User>,
    ) {
        // this.logger =
    }
    
    async getUsers(): Promise<User[]> {
        return await this.userRepository.find({
            relations: {
                friends: true,
                bloked: true,
                groups:true,
                achievments:true,
                usertogroup: true
            }
        });
    } 
    
    
    async getUser(id: number): Promise<User> {
        try 
        {
            return await this.userRepository.findOneOrFail({
                where: {
                    id: id,
                },
                relations: {
                    usertogroup: true,
                    friends: true,
                    bloked: true,
                    achievments: true,
                }
            });
            
        }
        catch (err)
        {
            throw new UnauthorizedException();
        }
    }
    async getUserByEmail(email: string): Promise<User> {
        try 
        {
            return await this.userRepository.findOneOrFail({
                where: {
                    email: email,
                },
                relations: {
                    usertogroup: true,
                    friends: true,
                    bloked: true,
                    achievments: true,
                }
            });
            
        }
        catch (err)
        {
            throw new UnauthorizedException();
        }
    }

    async findOneByUsername(username: string): Promise<User>
    {
        const user = await this.userRepository.findOneBy({username});
        if (!user)
            return null;
        return user;
    }

    async create(userData: any): Promise<any> 
    {
        console.log(userData.email);
        const user = await this.userRepository.findOneBy({email: userData.email});
        if (user)
            return { user, newLog: false };
      
        const createduser = this.userRepository.create({ username: userData.login, email: userData.email, avatar: userData.image.link, provider: UserProvider.FT, coalition: userData.color});
        const newUser = await this.userRepository.save(createduser);
        return { user: newUser, newLog: true };
    }
    // async createLocal(userData: RegisterUserDTO): Promise<any> 
    // {
    //     const user = this.userRepository.create(userData);
    //     const newUser = await this.userRepository.save(user);
    //     const { password, ...rest } =newUser;
    //     return rest;
    // }

    async updateUser(user: User, updateUserDTO: UpdateUserDTO) : Promise<any> {
        try {
            const updatedUser = await this.userRepository.findOneOrFail({
                where: {
                    id: user.id
                }
            });
            await this.userRepository.update(user.id, updateUserDTO);
            if (!user.twofa && updateUserDTO.twofa)
            {
                const secret = speakeasy.generateSecret();
                const otpauthURL = speakeasy.otpauthURL({ secret: secret.ascii, label: user.username, issuer: this.configService.get('SERVER_NAME') });
                await this.userRepository.update(user.id, { twofa: false, secret_tmp: secret.base32});
                return { user: await this.getUser(user.id), secret : { otpauthURL, base32: secret.base32} };
            }
            else if (user.twofa && !updateUserDTO.twofa)
                await this.userRepository.update(user.id, {twofa: false, secret: null, secret_tmp: null, recoveryCode: null});
            return await this.getUser(user.id);
        } catch (error) {
            throw new ForbiddenException(error.message);
        }
    }

    async verify2fa(user: User, twofaVerificationDTO: TwofaVerificationDTO) : Promise<any> {
        // const user = await this.userRepository.findOneBy({id});
        if (user.twofa)
            throw new ForbiddenException('2 factor authentication alredy verified');
        const verified = speakeasy.totp.verify({ secret: user.secret_tmp, encoding: 'base32', token: twofaVerificationDTO.token, window: 6});
        if (verified)
        {
            const recoveryCode: string = uuidv4();
            await this.userRepository.update(user.id, { twofa: true ,secret: user.secret_tmp, recoveryCode: recoveryCode});
            return { recoveryCode };
        }
        throw new ForbiddenException('token is invalide');
    }

    async getFriends(user: User) : Promise<User[]>{
        return (await this.userRepository.findOne({
            where: {
                id: user.id,
            },
            relations: {
                friends: true,
            }
        })).friends;
    }
    async addFriend(user: User, id: number) : Promise<User>{
        try {
            const friend = await this.userRepository.findOneOrFail({
                where: {
                    id
                },
            });
            console.log('before', user.friends);
            if (user.friends!.find((f) => friend.id === f.id) || user.id === id)
                return user;
            user.friends.push(friend);
            const i = user.bloked.findIndex((u) => u.id === friend.id);
            user.bloked.splice(i, 1);
            await this.userRepository.save(user);
            return user;
        } catch (error) {
            console.log('add firend error ', error.message);
            throw new ForbiddenException(error.message);
        }
    }
    async getBlocked(user: User) : Promise<User[]>{
        return (await this.userRepository.findOne({
            where: {
                id: user.id
            },
            relations: {
                bloked: true,
            }
        })).bloked;
    }
    async blockFriend(user: User, id: number) : Promise<User>{
        try {
            const userToBlock =  await this.userRepository.findOneOrFail({
                where: {
                    id
                },
            });
            if (!user.bloked.find((f) => id === f.id) && userToBlock.id != user.id)
                user.bloked.push(userToBlock);
            const i = user.friends.findIndex((u) => u.id === userToBlock.id);
            user.friends.splice(i, 1);
            await this.userRepository.save(user);
            return user;
        } catch (error) {
            throw new ForbiddenException(error.message);
        }
    }

    async updateLevel(winnerId: number, looserId: number): Promise<void> {
        try {
            const winner = await this.userRepository.findOneOrFail({
                where: {
                    id: winnerId,
                },
                relations: {
                    achievments: true,
                }
            })
            const looser = await this.userRepository.findOneOrFail({
                where: {
                    id: looserId,
                },
                relations: {
                    achievments: true,
                }
            })
            winner.win++;
            looser.loss++;
            winner.level += (winner.level === 0 ? 0.25 : winner.level * 0.25);
            if (looser.level > 0)
                looser.loss =- 0,20;
            winner.achievments = [];
            looser.achievments = [];
            const achievments : Achievment[] = await this.achievmentService.findAll();
            for (const achievment of achievments) {
                if (winner.win >= achievment.win
                    && winner.loss <= achievment.loss 
                    && winner.level >= achievment.level)
                    winner.achievments = [achievment, ...winner.achievments];
                if (looser.win >= achievment.win
                    && looser.loss <= achievment.loss 
                    && looser.level >= achievment.level)
                    looser.achievments = [achievment, ...looser.achievments];
            }
            
            await this.userRepository.save(winner);
            await this.userRepository.save(looser);

        } catch (error) {
            console.log('here ', error.message);
        }
    }

    async reset2Fa(user: User) {
        try {
            user.twofa = false;
            user.secret = null;
            user.secret_tmp = null;
            user.recoveryCode = null;
            await this.userRepository.save(user);
        } catch (error) {
            throw new ForbiddenException(error.message);
        }
    }

    async setStatus(user: User, status: string) {
        user.status = status;
        await this.userRepository.save(user);
    }
    
}
