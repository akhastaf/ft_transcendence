import { Body, Controller, Get, Post, Redirect, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { LoginUserDTO } from "./dto/login-user.dto";
import { RegisterUserDTO } from "./dto/register-user.dto";
import { Verify2FaDTO } from "./dto/verify-2fa.dto";
import { FTAuthGuard } from "./guards/ft-auth.guard";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
        private userService: UserService) {}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    login(@Req() req: any, @Body() loginUserDTO: LoginUserDTO) {
        return this.authService.login(req.user);
    }

    @Post('register')
    register(@Body() registerUserDTO: RegisterUserDTO): any {
        return this.authService.register(registerUserDTO);
    }
    @Get('login/42')
    @UseGuards(FTAuthGuard)
    loginft(@Req() req: any) {
        return req.user;
    }

    @Get('login/42/return')
    @UseGuards(FTAuthGuard)
    async ftcallback(@Req() req : any)
    {
        const user = await this.authService.register(req.user);
        if (!user.twofa)
            return this.authService.login(user);
        return { userid: user.id}
    }

    @Post('2fa')
    async verify(@Body() verifydto: Verify2FaDTO) :Promise<any> {
        return await this.authService.verify(verifydto);
    }

}