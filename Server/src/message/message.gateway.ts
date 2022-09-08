import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Namespace } from 'socket.io';

@WebSocketGateway({ namespace: 'message'})
export class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger: Logger = new Logger(MessageGateway.name);
  constructor () {}

  @WebSocketServer() io: Namespace;
  afterInit(server: any) {
    // throw new Error('Method not implemented.');
  }
  handleConnection(client: any, ...args: any[]) {
    // throw new Error('Method not implemented.');
  }
  handleDisconnect(client: any) {
    // throw new Error('Method not implemented.');
  }

}
