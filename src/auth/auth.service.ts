import { Injectable } from "@nestjs/common";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { RegisterUserDTO } from "./dto/register-user.dto";
import { ConfigService } from "@nestjs/config";


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
}