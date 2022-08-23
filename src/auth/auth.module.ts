import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { LocalStrategy } from "./strategies/local.strategy";
import { FtStrategy } from "./strategies/ft.strategy";
import { HttpModule } from "@nestjs/axios";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { JWTStrategy } from "./strategies/jwt.strategy";

@Module({
    imports: [
        ConfigModule.forRoot(),
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: 'SECRET',//process.env.SECRET,
            signOptions: { expiresIn: '10m'},
        }),
        HttpModule
    ],
    controllers: [AuthController],
    providers: [AuthService,LocalStrategy, FtStrategy, JWTStrategy],
    exports: [AuthService],
})
export class AuthModule {}