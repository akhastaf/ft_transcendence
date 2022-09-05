import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { LocalStrategy } from "./strategies/local.strategy";
import { FtStrategy } from "./strategies/ft.strategy";
import { HttpModule } from "@nestjs/axios";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JWTStrategy } from "./strategies/jwt.strategy";

@Module({
    imports: [
        ConfigModule.forRoot(),
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: 'SECRET',//configService.get('SECRET'),
                signOptions: { expiresIn: '1200s'},  
            }),
            inject: [ConfigService],
        }),
        HttpModule
        // register({
        //     secret: ,//process.env.SECRET,
        //     signOptions: { expiresIn: '1200s'},
        // })
    ],
    controllers: [AuthController],
    providers: [AuthService,LocalStrategy, FtStrategy, JWTStrategy],
    exports: [AuthService],
})
export class AuthModule {}