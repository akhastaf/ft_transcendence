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
import { jwtModule } from "./jwt.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        UserModule,
        PassportModule,
        jwtModule,
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