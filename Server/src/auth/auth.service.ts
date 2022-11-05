import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcryptjs';
import { JwtService } from "@nestjs/jwt";
import { RegisterUserDTO } from "./dto/register-user.dto";
import { ConfigService } from "@nestjs/config";
import * as speakeasy from "speakeasy";
import { Verify2FaDTO } from "./dto/verify-2fa.dto";


@Injectable()
export class AuthService {
    constructor(private configService: ConfigService,
        private userService: UserService,
        private jwtService: JwtService) {}

    async validateUser(username: string, password: string) : Promise<any> {
        const user = await this.userService.findOneByUsername(username);
        if (user)
        {
            if (bcrypt.compare(password, user.password))
            {
                const {password, ...result} = user;
                return result;
            }
        }
        return null;
    }

    async login(user :any): Promise<any> {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async register(user: any): Promise<any> {
        // const { password, ...rest} = registerUserDTO;
        // const hash = await bcrypt.hash(password, 10);
        // const user = { password: hash, ...rest};
        return await this.userService.create(user);
    }

    async verify(verifydto: Verify2FaDTO) : Promise<any> {
        const user = await this.userService.getUser(verifydto.id);
        const verified = speakeasy.totp.verify({ secret: user.secret, encoding: 'base32', token: verifydto.token, window: 6});
        if (verified)
            return this.login(user);
        throw new BadRequestException("2fa dose not match");
    }
}