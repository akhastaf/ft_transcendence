import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcryptjs';
import { JwtService } from "@nestjs/jwt";
import { RegisterUserDTO } from "./dto/register-user.dto";
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

    // async validateUser(username: string, password: string) : Promise<any> {
    //     const user = await this.userService.findOneByUsername(username);
    //     if (user)
    //     {
    //         if (bcrypt.compare(password, user.password))
    //         {
    //             const {password, ...result} = user;
    //             return result;
    //         }
    //     }
    //     return null;
    // }

    async login(user :any): Promise<any> {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, {
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: '90d'
            })
        }
    }

    async register(user: any): Promise<any> {
        return await this.userService.create(user);
    }

    async verify(verifydto: Verify2FaDTO) : Promise<any> {
        const user = await this.userService.getUser(verifydto.id);
        const verified = speakeasy.totp.verify({ secret: user.secret, encoding: 'base32', token: verifydto.token, window: 6});
        if (verified)
            return this.login(user);
        throw new BadRequestException("2fa dose not match");
    }
    async reset2Fa(reset2FaDto : Reset2FaDto) : Promise<any> {
        const user = await this.userService.getUser(reset2FaDto.id);
        // const verified = speakeasy.totp.verify({ secret: user.secret, encoding: 'base32', token: verifydto.token, window: 6});
        const verified = user.recoveryCode === reset2FaDto.recovery_code;
        if (verified)
        {
            await this.userService.reset2Fa(user);
            return this.login(user);
        }
        throw new BadRequestException("recovery code dose not match");
    }

    async getUser(token: string) : Promise<User|null> {
        try {
            const payload = await this.jwtService.verifyAsync(token);
            const user = await this.userService.getUser(payload.sub);
            return user;
        } catch (error) {
            console.log(error.message);
            return null;
        }
    }

    async getToken(id: number) : Promise<string>{
        try {
            const user = await this.userService.getUser(id);
            const payload = { username: user.username, sub: user.id };
            return this.jwtService.sign(payload);
        } catch (error) {
            console.log(error.message);
            throw new ForbiddenException(error.message);
        }
    }

    async getAccess_token(refrsh_token: string) : Promise<tokens>{
        try {
            const payload: Payload = await this.jwtService.verifyAsync(refrsh_token, {
                secret: this.configService.get('JWT_SECRET'),
                ignoreExpiration: false
            });
            const user = await this.userService.getUser(payload.sub);
            return this.login(user);
        } catch (error) {
            throw new ForbiddenException(error.message);
        }
    }
}