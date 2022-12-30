import { ForbiddenException, UnauthorizedException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDTO } from './dto/update-user.dto';
import * as speakeasy from "speakeasy";
import { TwofaVerificationDTO } from './dto/twofa-verification.dto';
import { ConfigService } from '@nestjs/config';
import { AchievmentService } from 'src/achievment/achievment.service';
import { Achievment } from 'src/achievment/entities/achievment.entity';
import { v4 as uuidv4} from "uuid";
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';


@Injectable()
export class UserService {
    constructor (
        private readonly configService: ConfigService,
        private achievmentService: AchievmentService,
        @InjectRepository(User) 
    private userRepository: Repository<User>,
    ) { }
    
    async getUsers(): Promise<User[]> {
        try {
            return await this.userRepository.find({
                relations: {
                    friends: true,
                    bloked: true,
                    groups:true,
                    achievments:true,
                    usertogroup: true
                }
            });
        } catch (error) {
            throw new ForbiddenException();
        }
    } 
    
    
    async getUser(id: number): Promise<User> {
        try 
        {
            return await this.userRepository.findOneOrFail({
                where: {
                    id: id,
                },
                relations: {
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
        try {
              
            const nickname: string = uniqueNamesGenerator({
                dictionaries: [adjectives, colors, animals]
            });
            const user = await this.userRepository.findOneBy({email: userData.email});
            if (user)
                return { user, newLog: false };
            const createduser = this.userRepository.create({ nickname: nickname, username: userData.login, email: userData.email, avatar: userData.image.link});
            const newUser = await this.userRepository.save(createduser);
            return { user: newUser, newLog: true };
        } catch (error) {
            throw new ForbiddenException();
        }
    }

    async updateUser(user: User, updateUserDTO: UpdateUserDTO) : Promise<any> {
        try {
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
        try {
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
        } catch (error) {
            throw new ForbiddenException();
        }
    }

    async getFriends(user: User) : Promise<User[]>{
        try {
            return (await this.userRepository.findOneOrFail({
                where: {
                    id: user.id,
                },
                relations: {
                    friends: true,
                }
            })).friends;
        } catch (error) {
            throw new ForbiddenException('user not found');
        }
    }
    async addFriend(user: User, id: number) : Promise<User>{
        try {
            const friend = await this.userRepository.findOneOrFail({
                where: {
                    id
                },
            });
            if (user.friends!.find((f) => friend.id === f.id) || user.id === id)
                return user;
            user.friends.push(friend);
            const i = user.bloked.findIndex((u) => u.id === friend.id);
            user.bloked.splice(i, 1);
            await this.userRepository.save(user);
            return user;
        } catch (error) {
            throw new ForbiddenException(error.message);
        }
    }
    async getBlocked(user: User) : Promise<User[]>{
        try {
            return (await this.userRepository.findOneOrFail({
                where: {
                    id: user.id
                },
                relations: {
                    bloked: true,
                }
            })).bloked;
        } catch (error) {
            throw new ForbiddenException('user not find');
        }
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
            winner.level += Math.ceil((winner.level === 0 ? 1 : winner.level * 0.1));
            winner.achievments = [];
            const achievments : Achievment[] = await this.achievmentService.findAll();
            for (const achievment of achievments) {
                if (winner.level >= achievment.level && this.hasNotAchivement(achievment, winner))
                    winner.achievments = [achievment, ...winner.achievments];
            }
            await this.userRepository.save(winner);
            await this.userRepository.save(looser);
        } catch (error) {
            throw new ForbiddenException(error.message);
        }
    }
    hasNotAchivement(achievment: Achievment, winner: User) {
        for (const ach of winner.achievments) {
            if (ach.id === achievment.id)
                return false;
        }
        return true;
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

    async setStatus(userId: number, status: string) {
        try {
            const user = await this.userRepository.findOneOrFail({
                where : {
                    id: userId
                }
            });
            user.status = status;
            await this.userRepository.save(user);
        } catch (error) {
            throw new ForbiddenException(error.message);
        }
    }
    
}
