import { INestApplicationContext, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { WsException } from "@nestjs/websockets";
import { ServerOptions, Server, Socket,  } from "socket.io";
import { JWTGuard } from "src/auth/guards/jwt.guard";
import { SocketWithUserId } from "src/types";

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
            ]
        };

        const optionsWithCors = {
            ...options,
            cors
        };
        const jwtService = this.app.get(JwtService);
        const server : Server = super.createIOServer(port, optionsWithCors);
        server.use(createTokenMiddleware(jwtService, this.configService, this.logger));
        return server;
    }
    
}


const createTokenMiddleware = (jwtService: JwtService, configService: ConfigService, logger : Logger) => (
    (socket: SocketWithUserId, next:any) => {
        const token = socket.handshake.auth.token || socket.handshake.headers['token'];
        logger.log(token);
		// console.log("token", token);
        try {
            const payload = jwtService.verify(token, {
                secret: configService.get('JWT_SECRET'),
                ignoreExpiration: false,
            });
            socket.userId = payload.sub; // we need to inject userService to get the user object
            next();
        } catch {
            throw new WsException('Forbbiden');
        }
    }
)