import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { FtStrategy } from "./strategies/ft.strategy";
import { HttpModule } from "@nestjs/axios";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";
import { JWTStrategy } from "./strategies/jwt.strategy";
import { jwtModule } from "./jwt.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        UserModule,
        PassportModule,
        jwtModule,
        HttpModule
    ],
    controllers: [AuthController],
    providers: [AuthService, FtStrategy, JWTStrategy],
    exports: [AuthService],
})
export class AuthModule {}