import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Input, SocketWithUser } from 'src/types';
import { GameService } from './game.service';

@WebSocketGateway()
export class GameGateway {

  @WebSocketServer()
	server: Server;

  constructor(private gameService: GameService) {
  }
  
  

  @SubscribeMessage('add')
  async add(client: SocketWithUser, mode: string): Promise<void> {
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
    await this.gameService.reject_game(client, userId, this.server);
  }
}
