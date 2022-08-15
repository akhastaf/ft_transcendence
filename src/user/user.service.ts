import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

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
            const user = await this.userRepository.findOneByOrFail({id});
            return user;
        }
        catch (err)
        {
            throw err;
        }
    } 
}
