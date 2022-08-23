import { Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@ApiBearerAuth('jwt')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JWTGuard)
    @Get()
    getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }
    
    @UseGuards(JWTGuard)
    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id:number): Promise<User> {
        return this.userService.getUser(id);
    }
}
