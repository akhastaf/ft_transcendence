import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }
    
    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id:number): Promise<User> {
        return this.userService.getUser(id);
    }
}
