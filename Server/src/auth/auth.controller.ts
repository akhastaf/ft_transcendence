import { Body, Controller, Delete, ForbiddenException, Get, Logger, Param, ParseIntPipe, Post, Redirect, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { LoginUserDTO } from "./dto/login-user.dto";
import { RegisterUserDTO } from "./dto/register-user.dto";
import { Verify2FaDTO } from "./dto/verify-2fa.dto";
import { FTAuthGuard } from "./guards/ft-auth.guard";
import {access} from "./dto/access"
import { RequestWithUser, tokens } from "src/types";
import { JWTGuard } from "./guards/jwt.guard";
import { Reset2FaDto } from "./dto/reset2fa.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    private logger: Logger = new Logger(AuthController.name);
    constructor(private authService: AuthService,
        private configService: ConfigService) {}

    // @Post('register')
    // register(@Body() registerUserDTO: RegisterUserDTO): any {
    //     return this.authService.registerLocal(registerUserDTO);
    // }
    @Get('login/42')
    @UseGuards(FTAuthGuard)
    loginft(@Req() req: any, @Res() res: Response) {
        return req.user;
    }

    @Get('login/42/return')
    @UseGuards(FTAuthGuard)
    async ftcallback(@Req() req : any, @Res() res: Response)
    {
        const user = await this.authService.register(req.user);
        console.log(user);
        const access: tokens = await this.authService.login(user);
        if (!user.twofa)
        {
            const expireIn = new Date();
            expireIn.setMonth(expireIn.getMonth() + 3);
            res.cookie('refresh_token', access.refresh_token, { httpOnly: true, expires: expireIn });
            // res.status(200).send(access.access_token);
            res.redirect(`http://localhost:3001/callback?accessToken=${access["access_token"]}`);
        }
       res.redirect(this.configService.get('CILENT_HOST') + '/callback?user_id=' + user.id + '&twfa=true');
    }
    
    @UseGuards(JWTGuard)
    @Delete('logout')
    async logout (@Req() req: RequestWithUser, @Res() res: Response) {
        res.clearCookie('refresh_token');
        res.status(200).send();
    }
    @Post('2fa')
    async verify(@Body() verifydto: Verify2FaDTO, @Res() res: Response) :Promise<any> {
        const access: tokens = await this.authService.verify(verifydto);
        const expireIn = new Date();
        expireIn.setMonth(expireIn.getMonth() + 3);
        res.cookie('refresh_token', access.refresh_token, { httpOnly: true, expires: expireIn });
        res.status(200).json({
            access_token: access.access_token
        });
    }

    @Post('2fa/reset')
    async reset2Fa(@Body() reset2FaDTO: Reset2FaDto, @Res() res: Response) :Promise<any> {
        const access: tokens =  await this.authService.reset2Fa(reset2FaDTO);
        const expireIn = new Date();
        expireIn.setMonth(expireIn.getMonth() + 3);
        res.cookie('refresh_token', access.refresh_token, { httpOnly: true, expires: expireIn });
        res.status(200).json({
            access_token: access.access_token
        });
    }
    @Get('refresh_token')
    async getAccess_token(@Req() req: Request, @Res() res: Response) {
        if ('refresh_token' in req.cookies)
        {
            const expireIn = new Date();
            expireIn.setMonth(expireIn.getMonth() + 3);
            const tokens :tokens = await this.authService.getAccess_token(req.cookies['refresh_token']);
            res.cookie('refresh_token', tokens.refresh_token, { httpOnly: true, expires: expireIn })
            res.status(200).send({ access_token: tokens.access_token });
        }
        throw new UnauthorizedException('refresh_token not exist')
    }

    // for Test
    @Get(':id')
    async getToken(@Param('id', ParseIntPipe) id: number) : Promise<string> {
        try {
            return await this.authService.getToken(id);
        } catch (error) {
            throw new ForbiddenException(error.message);
        }
    }

}