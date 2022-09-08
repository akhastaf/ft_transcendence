import { INestApplicationContext } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { ServerOptions } from "socket.io";

export class SocketIoAdapter extends IoAdapter {
    constructor(
        private app: INestApplicationContext,
        private configService: ConfigService
    ) {
        super(app);
    }

    createIOServer(port: number, options?: ServerOptions) {
        const clientPort = parseInt(this.configService.get('CLIENT_PORT'));
        // const 
        
    }
    
}