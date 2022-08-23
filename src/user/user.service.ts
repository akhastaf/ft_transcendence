import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDTO } from 'src/auth/dto/register-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

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
                games: true,
                rooms:true,
                achievments:true,
                userToRoom: true
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
                    games: true
                }
            });
            return user;
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
            const { username, email } =user;
            return { username, email};
        }
        const createduser = this.userRepository.create({ username: userData.login, email: userData.email, avatar: userData.image_url, provider: '42'});
        await this.userRepository.save(createduser);
        const { username, email } =createduser;
        return {username, email};
    }
}
