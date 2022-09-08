import { INestApplicationContext } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { IoAdapter } from "@nestjs/platform-socket.io";
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

    createIOServer(port: number, options?: ServerOptions) {
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
        server.use(createTokenMiddleware(jwtService));
        return server;
    }
    
}


const createTokenMiddleware = (jwtSercise: JwtService) => (
    (socket: SocketWithUserId, next:any) => {
        const token = socket.handshake.auth.token || socket.handshake.headers['token'];

        try {
            const payload = jwtSercise.verify(token);
            console.log(payload);
            socket.userId = payload.sub;
            next();
        } catch {
            next(new Error('Forbbiden'));
        }
    }
)