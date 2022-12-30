import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as speakeasy from "speakeasy";
import { Verify2FaDTO } from "./dto/verify-2fa.dto";
import { Reset2FaDto } from "./dto/reset2fa.dto";
import { Payload, tokens } from "src/types";


@Injectable()
export class AuthService {
    constructor(private configService: ConfigService,
        private userService: UserService,
        private jwtService: JwtService) {}

    async login(user :any): Promise<any> {
        try {
            const payload = { email: user.email, sub: user.id };
            return {
                access_token: this.jwtService.sign(payload),
                refresh_token: this.jwtService.sign(payload, {
                    secret: this.configService.get('JWT_REFRESH_SECRET'),
                    expiresIn: '90d'
                })
            }
        } catch (error) {
            throw new ForbiddenException(error.message);
        }
    }

    async register(user: any): Promise<any> {
        return await this.userService.create(user);
    }

    async verify(verifydto: Verify2FaDTO) : Promise<any> {
        try {
            const user = await this.userService.getUser(verifydto.id);
            const verified = speakeasy.totp.verify({ secret: user.secret, encoding: 'base32', token: verifydto.token, window: 6});
            if (verified)
                return this.login(user);
            console.log('error 2fa');
            throw new ForbiddenException("2fa dose not match");
        } catch (error) {
            console.log(error.message);
            throw new ForbiddenException(error.message);
        }
    }
    async reset2Fa(reset2FaDto : Reset2FaDto) : Promise<any> {
        try {
            const user = await this.userService.getUser(reset2FaDto.id);
            const verified = user.recoveryCode === reset2FaDto.recovery_code;
            if (verified)
            {
                await this.userService.reset2Fa(user);
                return this.login(user);
            }
            throw new ForbiddenException("recovery code dose not match");
        } catch (error) {
            throw new ForbiddenException(error.message);
        }
    }

    async getUser(token: string) : Promise<User|null> {
        try {
            const payload = await this.jwtService.verifyAsync(token);
            const user = await this.userService.getUser(payload.sub);
            return user;
        } catch (error) {
            return null;
        }
    }

    async getAccess_token(refrsh_token: string) : Promise<tokens>{
        try {
            const payload: Payload = await this.jwtService.verifyAsync(refrsh_token, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                ignoreExpiration: false
            });
            const user = await this.userService.getUser(payload.sub);
            return this.login(user);
        } catch (error) {
            throw new ForbiddenException(error.message);
        }
    }
}