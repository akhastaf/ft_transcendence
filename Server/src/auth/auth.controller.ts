// import { Body, Controller, Get, Post, Redirect, Req, UseGuards } from "@nestjs/common";
// import { ApiTags } from "@nestjs/swagger";
// import { Request } from "express";
// import { UserService } from "src/user/user.service";
// import { AuthService } from "./auth.service";
// import { LoginUserDTO } from "./dto/login-user.dto";
// import { RegisterUserDTO } from "./dto/register-user.dto";
// import { Verify2FaDTO } from "./dto/verify-2fa.dto";
// import { FTAuthGuard } from "./guards/ft-auth.guard";
// import { LocalAuthGuard } from "./guards/local-auth.guard";

// @ApiTags('Auth')
// @Controller('auth')
// export class AuthController {
//     constructor(private authService: AuthService,
//         private userService: UserService) {}

//     @Post('login')
//     @UseGuards(LocalAuthGuard)
//     login(@Req() req: any, @Body() loginUserDTO: LoginUserDTO) {
//         return this.authService.login(req.user);
//     }

//     @Post('register')
//     register(@Body() registerUserDTO: RegisterUserDTO): any {
//         return this.authService.register(registerUserDTO);
//     }
//     @Get('login/42')
//     @UseGuards(FTAuthGuard)
//     loginft(@Req() req: any) {
//         return req.user;
//     }

//     @Get('login/42/return')
//     @UseGuards(FTAuthGuard)
//     async ftcallback(@Req() req : any)
//     {
//         const user = await this.authService.register(req.user);
//         if (!user.twofa)
//             return this.authService.login(user);
//         return { userid: user.id}
//     }

//     @Post('2fa')
//     async verify(@Body() verifydto: Verify2FaDTO) :Promise<any> {
//         return await this.authService.verify(verifydto);
//     }

// }

import { Body, Controller, Get, Post, Redirect, Req, Res, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { LoginUserDTO } from "./dto/login-user.dto";
import { RegisterUserDTO } from "./dto/register-user.dto";
import { Verify2FaDTO } from "./dto/verify-2fa.dto";
import { FTAuthGuard } from "./guards/ft-auth.guard";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import {access} from "./dto/access"

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
        private configService: ConfigService) {}

    @Post('register')
    register(@Body() registerUserDTO: RegisterUserDTO): any {
        return this.authService.register(registerUserDTO);
    }
    @Get('login/42')
    @UseGuards(FTAuthGuard)
    loginft(@Req() req: any, @Res() res: Response) {
        // console.log(req.params.accessToken);
        // localStorage.setItem('accessToken',req.params.accessToken);
        //res.header('Access-Control-Allow-Origin',"*");
        return req.user;
    }

    @Get('login/42/return')
    @UseGuards(FTAuthGuard)
    async ftcallback(@Req() req : any, @Res() res: Response)
    {
        const user = await this.authService.register(req.user);
        // console.log(this.authService.login(user));
        console.log(user);
        const access = await this.authService.login(user);
        // const accessToken = await this.authService.login(user);
        //const access_token = JSON.stringify(accessToken);
        //console.log(access_token);
        if (!user.twofa)
        {
            // return accessToken;
            // res.status(200).json(accessToken);
            // res.cookie('accessToken', access_token);
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Origin',"*");
            // res.redirect("http://localhost:3001/channels/");
            console.log('============accesstoken===================');
            // console.log(accessToken.toString());
            console.log('====================================');
            console.log('====================================');
            // console.log(access["access_token"]);
            console.log('====================================');
            res.redirect("http://localhost:3001/channels?accessToken=" + access);
            // res.redirect("http://localhost:3001/channels?accessToken=" + accessToken);
        }
      //  res.redirect(this.configService.get('CILENT_HOST') + '/channels?user_id=' + user.id + '&twfa=true');
    }

    @Post('2fa')
    async verify(@Body() verifydto: Verify2FaDTO) :Promise<any> {
        return await this.authService.verify(verifydto);
    }

}