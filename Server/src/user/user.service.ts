import { BadRequestException, Injectable } from '@nestjs/common';
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

@Injectable()
export class UserService {
    constructor (
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
        const user = await this.userRepository.findOneBy({username: userData.login});
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

    async updateUser(updateUserDTO: UpdateUserDTO, id: number) : Promise<any> {
        console.log(updateUserDTO);
        const updatedUser = await this.userRepository.findOneBy({id});
        console.log(updatedUser);

        console.log(updatedUser, updateUserDTO);
        await this.userRepository.update(id, updatedUser);
        return await this.getUser(id);
    }

    async twofaSetup(id: number, twofa : boolean, user: any): Promise<any> {
        //const user = await this.userRepository.findOneBy({id});
        if (!user.twofa && twofa)
        {
            const secret = speakeasy.generateSecret();
            console.log(secret, secret.base32.length);
            await this.userRepository.update(user.id, { secret_tmp: secret.base32});
            return secret;
        }
        else if (user.twofa && !twofa)
        {
            await this.userRepository.update(user.id, {twofa: false, secret: null, secret_tmp: null, recoveryCode: null});
            return { msg: '2fa is desactivated successfully'};
        }
        return { msg: 'hhh'};
    }

    async verify2fa(id: number, twofaVerificationDTO: TwofaVerificationDTO) : Promise<any> {
        const user = await this.userRepository.findOneBy({id});
        const verified = speakeasy.totp.verify({ secret: user.secret_tmp, encoding: 'base32', token: twofaVerificationDTO.token});
        console.log(verified);
        if (verified)
        {
            await this.userRepository.update(user.id, { twofa: true ,secret: user.secret_tmp, recoveryCode: twofaVerificationDTO.token});
            return { recoveryCode : twofaVerificationDTO.token};
        }
        throw new BadRequestException();
    }
}
