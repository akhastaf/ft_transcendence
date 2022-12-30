import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Payload } from "src/types";
import { UserService } from "src/user/user.service";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private configService: ConfigService, private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }
    async validate(payload: Payload) : Promise<any> {
        try {
            const user = await this.userService.getUser(payload.sub);
            if (user)
                return user;
            throw new UnauthorizedException();
        } catch (error) {
            throw new UnauthorizedException();
            
        }
    }
}