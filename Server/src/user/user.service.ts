import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDTO } from 'src/auth/dto/register-user.dto';
import { Repository } from 'typeorm';
import { User, UserProvider, Userstatus } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDTO } from './dto/update-user.dto';
import * as speakeasy from "speakeasy";
import * as Qrcode from 'qrcode';
import { TwofaVerificationDTO } from './dto/twofa-verification.dto';
import { Privacy } from 'src/messages/entities/group.entity';
import { emit } from 'process';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
    constructor (
        private readonly configService: ConfigService,
        @InjectRepository(User) 
    private userRepository: Repository<User>,
    ) {}
    
    async getUsers(): Promise<User[]> {
        return await this.userRepository.find({
            relations: {
                friends: true,
                bloked: true,
                gamesAsFirst: true,
                gamesAsSecond: true,
                groups:true,
                achievments:true,
                usertogroup: true
            }
        });
    } 
    
    
    async getUser(id: number): Promise<User> {
        try 
        {
            const user = await this.userRepository.findOneOrFail({
                where: {
                    id: id,
                },
                relations: {
                    gamesAsFirst: true,
                    gamesAsSecond: true,
                    usertogroup: true,
                }
            });
            const {password, ...rest} = user;
            return rest;
        }
        catch (err)
        {
            throw err;
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
        {
            const { password, ...rest } =user;
            return rest;
        }
        const createduser = this.userRepository.create({ username: userData.login, email: userData.email, avatar: userData.image_url, provider: UserProvider.FT, coalition: userData.color});
        const newUser = await this.userRepository.save(createduser);
        const { password, ...rest } =newUser;
        return rest;
    }
    async createLocal(userData: RegisterUserDTO): Promise<any> 
    {
        const user = this.userRepository.create(userData);
        const newUser = await this.userRepository.save(user);
        const { password, ...rest } =newUser;
        return rest;
    }

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

    async verify2fa(id: number, twofaVerificationDTO: TwofaVerificationDTO) : Promise<any> {
        const user = await this.userRepository.findOneBy({id});
        const verified = speakeasy.totp.verify({ secret: user.secret_tmp, encoding: 'base32', token: twofaVerificationDTO.token, window: 6});
        console.log(verified);
        if (verified)
        {
            await this.userRepository.update(user.id, { twofa: true ,secret: user.secret_tmp, recoveryCode: twofaVerificationDTO.token});
            return { recoveryCode : twofaVerificationDTO.token};
        }
        throw new BadRequestException();
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
            user.friends = [friend, ...user.friends];
            await this.userRepository.update(user.id, user);
            return this.getUser(user.id);
        } catch (error) {
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
            const u = await this.userRepository.findOne({
                where: {
                    id: user.id,
                },
                relations: {
                    bloked: true
                }
            });
            if (!u.bloked.includes(userToBlock) && userToBlock.id != user.id)
                user.bloked = [userToBlock, ...user.bloked];
            return await this.getUser(user.id);
        } catch (error) {
            throw new ForbiddenException(error.message);
        }
    }
}
