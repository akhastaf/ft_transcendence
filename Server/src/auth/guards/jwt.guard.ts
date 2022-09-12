import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { WsException } from "@nestjs/websockets";
import { Observable } from "rxjs";
import { Socket } from "socket.io";
import { SocketWithUser, SocketWithUserId } from "src/types";
import { UserService } from "src/user/user.service";

@Injectable()
export class JWTGuard extends AuthGuard('jwt') {}


@Injectable()
export class JWTGuardWs implements CanActivate {
    private readonly logger: Logger = new Logger(JWTGuardWs.name);
    constructor(private jwtService: JwtService, private configService: ConfigService, private userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const socket: SocketWithUser = context.switchToWs().getClient();
        
        const token: string = socket.handshake.auth.token || socket.handshake.headers['token'];
        try {
            const payload = this.jwtService.verify(token, {
                secret: this.configService.get('JWT_SECRET'),
                ignoreExpiration: false
            });
            socket.user = await this.userService.getUser(payload.sub);
            this.logger.log('is working');
            this.logger.log(this.configService.get('JWT_SECRET'));
            return true;
        } catch {
            throw new WsException('Unauthorized');
        }
    }

}