import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { RequestWithUser } from 'src/types';
import { TwofaVerificationDTO } from './dto/twofa-verification.dto';
// import { ApiFile } from './decorators/apifile.decorator';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';


@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
@UseGuards(JWTGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    
    @Get()
    async getUsers(): Promise<User[]> {
        return await this.userService.getUsers();
    }

    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id:number): Promise<User> {
        return await this.userService.getUser(id);
    }


    @Patch(':id')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                twofa: {
                    type: 'boolean',
                    format: 'string'
                },
                avatar: {
                    type: 'string',
                    format: 'binary'
                },
            },
        },
    })
    @UseInterceptors(FileInterceptor('avatar', {
        dest: 'uploads/',
    }))
    async updateUser (@Body() updateUserDTO: UpdateUserDTO,
                    @UploadedFile() avatar: Express.Multer.File,
                    @Param('id', ParseIntPipe) id: number) : Promise<User> {
        console.log(avatar, updateUserDTO);
        return await this.userService.updateUser(updateUserDTO,id);
    }


    @ApiBody({
        schema: {
            properties: {
                twofa: {
                    type: 'string',
                    format: 'string'
                }
            }
        }
    })
    
    @Post('2fa')
    async updateTwofa(@Req() req: RequestWithUser,@Body('twofa') twofa: boolean) : Promise<any> {
        return await this.userService.twofaSetup(req.user.id, twofa, req.user);
    }

    @Post('2fa/verify')
    async verify2fa(@Req() req: RequestWithUser, @Body() twofaVerificationDTO : TwofaVerificationDTO) : Promise<any> {
        return this.userService.verify2fa(req.user.id, twofaVerificationDTO);
    }


}
