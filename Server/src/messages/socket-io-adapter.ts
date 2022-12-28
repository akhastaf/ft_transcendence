import { INestApplicationContext } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { ServerOptions, Server, Socket,  } from "socket.io";
import { SocketWithUser } from "src/types";
import { UserService } from "src/user/user.service";

export class SocketIoAdapter extends IoAdapter {
    constructor(
        private app: INestApplicationContext,
        private configService: ConfigService,
    ) {
        super(app);

    }
    createIOServer(port: number, options?: ServerOptions) {
        const clientHost = parseInt(this.configService.get('CLIENT_HOST'));
        const cors = {
            origin: [
                `${clientHost}`,
            ]
        };

        const optionsWithCors = {
            ...options,
            cors
        };
        const jwtService = this.app.get(JwtService);
        const userService = this.app.get(UserService);
        const server : Server = super.createIOServer(port, optionsWithCors);
        server.use(createTokenMiddleware(userService, jwtService, this.configService));
        return server;
    }
    
}


export const createTokenMiddleware = (userService: UserService, jwtService: JwtService, configService: ConfigService) => (
    async (socket: SocketWithUser, next:any) => {
        const token = socket.handshake.auth.token || socket.handshake.headers['token'];
        try {
            const payload = jwtService.verify(token, {
                secret: configService.get('JWT_SECRET'),
                ignoreExpiration: false,
            });
            socket.userId = payload.sub;
            socket.user = await userService.getUser(payload.sub);
            next();
        } catch {
            // throw new ForbiddenException();
            // throw new WsException('Forbbiden');
        }
    }
)