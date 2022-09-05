import { Logger } from '@nestjs/common';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { RoomService } from './room.service';

@WebSocketGateway({ namespace: 'room', cors: true})
export class RoomGateway implements OnGatewayInit {
  private readonly logger: Logger = new Logger(RoomGateway.name);
  constructor (private readonly roomService: RoomService) {}
  afterInit(server: any) {
    this.logger.log(`Websockets roomGateway`);
    // throw new Error('Method not implemented.');
  }
  // @WebSocketServer() server: Server
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): any {
    console.log(payload);
    return payload;
  }
}
