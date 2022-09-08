import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'net';
import { SocketWithUserId } from 'src/types';
import { UserService } from 'src/user/user.service';
import { RoomService } from './room.service';
import { Namespace } from 'socket.io'
import { JoinRoomDTO } from './dto/join-room.dto';
import { Room } from './entities/room.entity';

@WebSocketGateway({ namespace: 'room'})
export class RoomGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger: Logger = new Logger(RoomGateway.name);
  constructor (private readonly roomService: RoomService, private configService: ConfigService) {}
  
  
  @WebSocketServer() io: Namespace;
  
  afterInit(server: any) {
    this.logger.log(`Websockets roomGateway from port ${this.configService.get('PORT')}`);
    // throw new Error('Method not implemented.');
  }
  handleConnection(client: any, ...args: any[]) {
    // throw new Error('Method not implemented.');
  }
  handleDisconnect(client: any) {
    // throw new Error('Method not implemented.');
  }

  @SubscribeMessage('addroom')
  async getallrooms(): Promise<any> {
    const rooms: Room[] = await this.roomService.getAll();
    this.io.emit('getAllRooms', rooms);
  }
  @SubscribeMessage('join')
  join(client: SocketWithUserId, payload: JoinRoomDTO): any {
    console.log(payload);
    client.join(payload.rooms);
    return payload;
  }
  @SubscribeMessage('joinOneRoom')
  async joinOneRoom(client: SocketWithUserId, roomid: number): Promise<any> {
    const room = await this.roomService.join(client.userId, roomid);
    client.join(room.name);
    return room;
  }
  @SubscribeMessage('leave')
  leave(client: SocketWithUserId, payload: string): any {
    console.log(payload);
    client.leave(payload);
    return payload;
  }
  @SubscribeMessage('leaveOneRoom')
  async leaveOneRoom(client: SocketWithUserId, roomid: number): Promise<any> {
    const room = await this.roomService.leave(client.userId, roomid);
    client.leave(room.name);
    return room;
  }
}
