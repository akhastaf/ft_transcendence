import { ForbiddenException, INestApplicationContext, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { WsException } from "@nestjs/websockets";
import { ServerOptions, Server, Socket,  } from "socket.io";
import { JWTGuard } from "src/auth/guards/jwt.guard";
import { SocketWithUser, SocketWithUserId } from "src/types";
import { UserService } from "src/user/user.service";

export class SocketIoAdapter extends IoAdapter {
    constructor(
        private app: INestApplicationContext,
        private configService: ConfigService,
    ) {
        super(app);

    }
    private logger : Logger = new Logger(SocketIoAdapter.name);
    createIOServer(port: number, options?: ServerOptions) {
        this.logger.log('socketIOAdapter');
        const clientPort = parseInt(this.configService.get('CLIENT_PORT'));
        const cors = {
            origin: [
                `http://localhost:${clientPort}`,
                `http://127.0.0.1:${clientPort}`,
                'http://localhost:5173',
                'http://127.0.0.1:5173',
            ]
        };

        const optionsWithCors = {
            ...options,
            cors
        };
        const jwtService = this.app.get(JwtService);
        const userService = this.app.get(UserService);
        const server : Server = super.createIOServer(port, optionsWithCors);
        server.use(createTokenMiddleware(userService, jwtService, this.configService, this.logger));
        return server;
    }
    
}


export const createTokenMiddleware = (userService: UserService, jwtService: JwtService, configService: ConfigService, logger : Logger) => (
    async (socket: SocketWithUser, next:any) => {
        const token = socket.handshake.auth.token || socket.handshake.headers['token'];
        logger.log(`token : ${token}`);
        try {
            const payload = jwtService.verify(token, {
                secret: configService.get('JWT_SECRET'),
                ignoreExpiration: false,
            });
            socket.userId = payload.sub; // we need to inject userService to get the user object
            socket.user = await userService.getUser(payload.sub);
            next();
        } catch {
            // throw new ForbiddenException();
            // throw new WsException('Forbbiden');
        }
    }
)