import { Body, Controller, Delete, ForbiddenException, Get, Param, ParseIntPipe, Post, Req, Res, UnauthorizedException, UseGuards, UseFilters } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { Verify2FaDTO } from "./dto/verify-2fa.dto";
import { FTAuthGuard } from "./guards/ft-auth.guard";
import { RequestWithUser, tokens } from "src/types";
import { JWTGuard } from "./guards/jwt.guard";
import { Reset2FaDto } from "./dto/reset2fa.dto";
import { HttpExceptionFilter } from "./http-exception.filter";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
        private configService: ConfigService) {}
        
    @Get('login/42')
    @UseGuards(FTAuthGuard)
    loginft(@Req() req: any, @Res() res: Response) {
        return req.user;
    }

    @Get('login/42/return')
    @UseGuards(FTAuthGuard)
    @UseFilters(new HttpExceptionFilter())
    async ftcallback(@Req() req : any, @Res() res: Response)
    {
        const {user, newLog} = await this.authService.register(req.user);
        const access: tokens = await this.authService.login(user);
        if (!user.twofa)
        {
            const expireIn = new Date();
            expireIn.setMonth(expireIn.getMonth() + 3);
            res.cookie('refresh_token', access.refresh_token, { httpOnly: true, expires: expireIn });
            res.redirect(`${this.configService.get('CLIENT_HOST')}/callback?accessToken=${access["access_token"]}&newlog=${newLog}`);
        }
		else
       		res.redirect(`${this.configService.get('CLIENT_HOST')}/callback?user_id=${user.id}&twofa=true`);
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