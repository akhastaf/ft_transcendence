import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Interval } from '@nestjs/schedule';
import { ConnectedSocket, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { createTokenMiddleware } from 'src/messages/socket-io-adapter';
import { Input, SocketWithUser } from 'src/types';
import { User } from 'src/user/entities/user.entity';
import { GameService } from './game.service';

@WebSocketGateway({
  cors: {
		origin: 'http://localhost:5173',
		// origin: 'http://localhost:3001',
	}
})
export class GameGateway {

  @WebSocketServer()
	server: Server;
  private logger : Logger = new Logger(GameGateway.name);
  // waitingUsers: Array<User>;

  constructor(private gameService: GameService, private configService: ConfigService, private authService: AuthService) {
    // this.waitingUsers = new Array<User>();
  }
  
  // async handleConnection(client : SocketWithUser) {
  //   client.user = await this.authService.getUser(client.handshake.auth.token);
  //   this.logger.log(client.user);
  //   if (!client.user)
  //     client.disconnect();
  //   // this.waitingUsers.push(client.user);
  //   // if (this.waitingUsers.length > 2)
  //   //   client.emit('gamestart', { user1: this.waitingUsers.pop(), user2: this.waitingUsers.pop()});
  // }
  // handleConnection(@ConnectedSocket() client: SocketWithUser) {

  // }
  
  // @SubscribeMessage('gamejoin')
  // handleMessage(client: SocketWithUser, payload: any): string {
  //   // console.log(client.user);
  //   // this.gameService.saveSocket(client);
  //   return 'Hello world!';
  // }

  // async handleDisconnect(client: SocketWithUser) {
  //   console.log('stop game event');
  //   await this.gameService.removePlayer(client);
  // }

  @SubscribeMessage('add')
  async add(client: SocketWithUser, mode: string): Promise<void> {
    console.log(mode, client.user.username);
    await this.gameService.add(client, mode, this.server);
  }
  @SubscribeMessage('joingame')
  async joinGame(client: SocketWithUser, room: string): Promise<void> {
    await this.gameService.joinGame(client, room, this.server);
  }
  @SubscribeMessage('input')
  async getInput(client: SocketWithUser, input: Input): Promise<void> {
    await this.gameService.getInput(client, input);
  }
  @SubscribeMessage('inviteToGame_client')
  async inviteToGame(client : SocketWithUser, userId: number) {
    await this.gameService.inviteToGame(client, userId, this.server);
  }
  @SubscribeMessage('acceptGame_client')
  async acceptGame(client : SocketWithUser, userId: number) {
    await this.gameService.accept_game(client, userId);
  }
  @SubscribeMessage('rejectGame_client')
  async reject_game(client : SocketWithUser, userId: number) {
    await this.gameService.reject_game(client, userId);
  }
}
