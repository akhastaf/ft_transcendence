import { INestApplicationContext, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { WsException } from "@nestjs/websockets";
import { ServerOptions, Server, Socket,  } from "socket.io";
import { JWTGuard } from "src/auth/guards/jwt.guard";
import { SocketWithUserId } from "src/types";
import { UserProvider } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";

export class SocketIoAdapter extends IoAdapter {
    constructor(
        private app: INestApplicationContext,
        private configService: ConfigService,
        private userService : UserService
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
            ]
        };

        const optionsWithCors = {
            ...options,
            cors
        };
        const jwtService = this.app.get(JwtService);
        const server : Server = super.createIOServer(port, optionsWithCors);
        server.use(createTokenMiddleware(jwtService, this.configService, this.logger, this.userService));
        return server;
    }
    
}


const createTokenMiddleware = (jwtService: JwtService, configService: ConfigService, logger : Logger, userService: UserService) => (
    async (socket: SocketWithUserId, next:any) => {
        const token = socket.handshake.auth.token || socket.handshake.headers['token'];
        try {
            const payload = jwtService.verify(token, {
                secret: configService.get('JWT_SECRET'),
                ignoreExpiration: false,
            });
            socket.userId = payload.sub; // we need to inject userService to get the user object
            socket.user = await userService.getUser(payload.sub);
            logger.log(socket.user);
            next();
        } catch (error){
            logger.log(error.message);
            throw new WsException('Forbbiden');
        }
    }
)