import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { RequestWithUser } from 'src/types';
import { TwofaVerificationDTO } from './dto/twofa-verification.dto';
// import { ApiFile } from './decorators/apifile.decorator';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { SharpPipe } from './pipes/sharp.pipe';
import { UserService } from './user.service';


@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
@UseGuards(JWTGuard)
export class UserController {
    constructor(private readonly userService: UserService, private readonly configService: ConfigService) {}


    @Get('me')
    async getMe(@Req() req: RequestWithUser): Promise<User> {
        return req.user;
    }
    
    @Get('friends')
    async getFriends(@Req() req: RequestWithUser) {
        return this.userService.getFriends(req.user);
    }
    @Get('blocked')
    async getBlocked(@Req() req: RequestWithUser) {
        return this.userService.getBlocked(req.user);
    }
    @Get('add/:id') 
    async addFriend(@Param('id', ParseIntPipe) id:number, @Req() req: RequestWithUser) {
        console.log("done");
        return this.userService.addFriend(req.user, id);
         
    }
    @Get('block/:id')
    async blockFriend(@Param('id', ParseIntPipe) id:number, @Req() req: RequestWithUser) {
        return this.userService.blockFriend(req.user, id);
    }

    @Post('2fa/verify')
    async verify2fa(@Req() req: RequestWithUser, @Body() twofaVerificationDTO : TwofaVerificationDTO) : Promise<any> {
        return this.userService.verify2fa(req.user.id, twofaVerificationDTO);
    }

    @Get()
    async getUsers(): Promise<User[]> {
        return await this.userService.getUsers();
    }

    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id:number): Promise<User> {
        return await this.userService.getUser(id);
    }
    

    @Patch()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                username : {
                    type: 'string',
                    format: 'string'
                },
                twofa: {
                    type: 'boolean',
                    format: 'boolean'
                },
                avatar: {
                    type: 'string',
                    format: 'binary'
                },
            },
        },
    })
    @UseInterceptors(FileInterceptor('avatar'))
    async updateUser (
        @Body() updateUserDTO: UpdateUserDTO,
        @Req() req: RequestWithUser,
        @UploadedFile(SharpPipe) avatar: string) : Promise<User>
    {
        if (avatar && avatar.length)
            updateUserDTO.avatar = this.configService.get('SERVER_HOST') + avatar;
        return await this.userService.updateUser(req.user, updateUserDTO);
    }



}
