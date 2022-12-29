import { ForbiddenException, Injectable } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { GameLocal, Player, SocketWithUser, Ball, GameState, Input } from "src/types";
import { User, Userstatus } from "src/user/entities/user.entity";
import { Repository } from "typeorm"
import { Game, GameMode, GameStatus } from "./entites/game.entity";
import { v4 as uuidv4} from "uuid";
import { UserService } from "src/user/user.service";
import { Server } from "socket.io";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GameService {
    sockets: Array<SocketWithUser> = [];
    games: Map<string, GameLocal> = new Map();
    inviteGames: Map<string, GameLocal> = new Map();
    server : Server| null = null;
    constructor(private configService: ConfigService, private userService: UserService, @InjectRepository(Game) private gameRepository: Repository<Game>,) {}
    
    async getAllGames() {
        return this.gameRepository.find({
            order: {
                updatedAt: 'DESC'
            }
        });
    }
    async getUserGames(userId: number) : Promise<Game[]> {
        try {
            return await this.gameRepository.find({
                where: [
                    { player1: { id: userId } },
                    { player2: { id: userId } }
                ],
                order : {
                    updatedAt: 'DESC'
                }
            });
        } catch (error) {
            throw new ForbiddenException(error.message);
        }
    }

    async playVsComp(socket : SocketWithUser, mode : string) : Promise<void> {
        if (this.checkPlaying(socket))
            return;
        const gamelocal : GameLocal = this.createGame(mode as GameMode);
        const game: Game = this.gameRepository.create({ score1: 0, score2: 0, status: GameStatus.WAITING, room: gamelocal.room, mode: mode});
        if (mode === GameMode.CUSTOM) {
            const p: Player = this.createPlayer(socket, gamelocal);
            await this.userService.setStatus(p.user.id, Userstatus.PLAYING);
            const com = await this.userService.getUserByEmail(this.configService.get('COMP_EMAIL'));
            const comp : Player = this.createPlayerComp(com, gamelocal);
            gamelocal.players.push(p);
            gamelocal.players.push(comp);
            game.player1 = p.user;
            game.player2 = com;
            gamelocal.status = GameStatus.PLAYING;
            game.status = GameStatus.PLAYING;
            p.socket.join(gamelocal.room);
            await this.gameRepository.save(game);
            this.games.set(gamelocal.room, gamelocal)
            this.server.emit('newGame_server');
        }
    }
    checkPlaying(socket: SocketWithUser) {
        for (const g of this.games.values())
        {
            for (const p of g.players) {
                if (p.user.id === socket.user.id) {
                    return true;
                }
            }
        }
        return false;
    }

    async add(socket: SocketWithUser, mode: string, server: Server): Promise<void> {
        if (this.server === null)
            this.server = server;
        if (!socket.user)
            return;
        if (this.checkPlaying(socket))
            return;
        this.clearRoom(socket);
        if (mode === GameMode.CUSTOM)
            return this.playVsComp(socket, mode);
        for (const s of this.sockets)
        {
            if (s.user.id === socket.user.id)
                return;
        }
        if (mode === GameMode.CLASSIC)
            this.sockets.push(socket);
        if (this.sockets.length < 2 && mode === GameMode.CLASSIC)
            return;
        if (mode != GameMode.CLASSIC)
            mode = GameMode.CLASSIC;
        const gamelocal : GameLocal = this.createGame(mode as GameMode);
        const game: Game = this.gameRepository.create({ score1: 0, score2: 0, status: GameStatus.WAITING, room: gamelocal.room, mode: mode});
        while (this.sockets.length && gamelocal.players.length < 2)
        {
            const s: SocketWithUser = this.sockets.shift();
            const player: Player = this.createPlayer(s, gamelocal);
            await this.userService.setStatus(player.user.id, Userstatus.PLAYING);
            this.server.emit('connection', {});
            gamelocal.players.push(player);
            player.socket.join(gamelocal.room);
            //this.server.to(player.socket.id).emit('game', gamelocal.room);
            if (!game.player1)
                game.player1 = s.user;
            else if (!game.player2)
                game.player2 = s.user;
        }
        if (gamelocal.players.length === 2)
        {
            gamelocal.status = GameStatus.PLAYING;
            game.status = GameStatus.PLAYING; 
        }
        await this.gameRepository.save(game);
        this.games.set(gamelocal.room, gamelocal)
        this.server.emit('newGame_server');
    }
    clearRoom(socket: SocketWithUser) {
        for (const g of this.games.values())
        {
            for (const s of g.spectators)
            {
                if (s.user.id === socket.user.id) {
                    socket.leave(g.room);
                    g.spectators.splice(g.spectators.findIndex((sp) => sp.user.id === socket.user.id), 1);
                }
            }
        }
    }
    createPlayerComp(comp : User, game: GameLocal): Player {
        const player: Player = {
            user: comp,
            socket: null,
            x: game.width - 15,
            y: game.height / 2 - 150 / 2,
            width: 15,
            height : 150,
            score: 0,
        };
        return player;
    }
    createPlayer(socket: SocketWithUser, game: GameLocal): Player {
        const player: Player = {
            user: socket.user,
            socket: socket,
            x: game.players.length > 0 ? game.width - 15 : 0,
            y: game.height / 2 - 150 / 2,
            width: 15,
            height : 150,
            score: 0,
        };
        return player;
    }
    

    joinGame(socket: SocketWithUser, room: string, server : Server): void
    {
        if (!socket.user || socket.user.status === Userstatus.PLAYING)
            return;
        this.clearRoom(socket);
        const game = this.games.get(room);
        if (!game)
            return;
        socket.join(game.room);
        game.spectators.push(socket);
    }

    async stopGame(game: GameLocal, winner : Player): Promise<void> {
        try {
            if (game.status === GameStatus.END)
                return;
            const gameUpdated = await this.gameRepository.findOneOrFail({
                where: {
                    room: game.room,
                }
            });
            if (game.players.length === 2)
            {
                const looser = game.players.find((p) => p.user.id != winner.user.id);
                await this.userService.updateLevel(winner.user.id, looser.user.id);
                this.emit(game, 'stopgame', {});
                gameUpdated.status = GameStatus.END;
                game.status = GameStatus.END;
                await this.gameRepository.save(gameUpdated);
                this.server.socketsLeave(game.room);
                this.userService.setStatus(looser.user.id, Userstatus.ONLINE);
                this.userService.setStatus(winner.user.id, Userstatus.ONLINE);
                this.server.emit('disconnect_server', {});
                this.games.delete(game.room);
            }
        } catch (error) {
            return;
        }
    }

    createGame(mode: GameMode) : GameLocal {
        const room: string = uuidv4();
        const game : GameLocal = {
            players: [],
            room: room.substring(0, 8),
            spectators: [],
            status: GameStatus.WAITING,
            ball: new Ball(),
            width: 800,
            height: 500,
            maxScore: 11,
            mode: mode,
            countdown: 0,
            computerLevel: 0.1,
        }
        return game;
    }



    getPlayer(user: User) : Player | null {
        for (const game of this.games.values())
        {
            const player = game.players.find((p) => p.user.id === user.id);
            if (player)
                return player;
        }
        return null;
    }

    @Interval(1000 / 60 )
    play():void {
        for (const game of this.games.values()) {
            if (game.status === GameStatus.PLAYING)
                this.update(game);
        }
    }

    
    async emit(game: GameLocal, event: string,  payload: any) {
        this.server.to(game.room).emit(event, payload);
    }

    async update(game: GameLocal) {

        try {
            // Get left player
            const rightPlayer = game.players[1];
            const leftPlayer = game.players[0];
    
            game.ball.x += game.ball.velocityX;
            game.ball.y += game.ball.velocityY;
    
            // control computer paddle
            if (game.mode === GameMode.CUSTOM)
                rightPlayer.y += (game.ball.y - (rightPlayer.y + rightPlayer.height/2)) * game.computerLevel;
    
            if (game.ball.y + game.ball.radius > game.height || game.ball.y - game.ball.radius < 0) {
                game.ball.velocityY *= -1;
            }
            
            const player = game.ball.x < game.width/2 ? leftPlayer : rightPlayer;
            if (this.collision(game.ball, player)) {
                let colliedPoint: number = (game.ball.y - (player.y + player.height/2));
                colliedPoint /= (player.height/2);
                const angleRad: number = colliedPoint * (Math.PI/4);
    
                const direction: number = game.ball.x < game.width/2 ? 1 : -1;
    
                game.ball.velocityX = direction * game.ball.speed * Math.cos(angleRad);
                game.ball.velocityY = game.ball.speed * Math.sin(angleRad);
    
                game.ball.speed += 0.3;
            } 
    
            if (game.ball.x - game.ball.radius < 0) {
                rightPlayer.score++;
                this.resetBall(game);
            }
            if (game.ball.x + game.ball.radius > game.width) {
                leftPlayer.score++;
                this.resetBall(game);
            }
            this.emit(game, 'gamestate', this.getGameState(game));
            const updatedGame = await this.gameRepository.findOne({
                where: {
                    room: game.room,
                }
            });
            updatedGame.score1 = game.players[0].score;
            updatedGame.score2 = game.players[1].score;
            await this.gameRepository.update(updatedGame.id, updatedGame);
            for (const player of game.players)
                if (player.score >= game.maxScore)
                    return this.stopGame(game, player);
        } catch (error) {
            return;
        }
    }


    getGameState(game: GameLocal): GameState {
        return {
            leftPlayer: {
                x: game.players[0].x,
                y: game.players[0].y,
                width: game.players[0].width,
                height: game.players[0].height,
                score: game.players[0].score,
                username: game.players[0].user.username,
            },
            rightPlayer: {
                x: game.players[1].x,
                y: game.players[1].y,
                width: game.players[1].width,
                height: game.players[1].height,
                score: game.players[1].score,
                username: game.players[1].user.username,
            },
            ball: {
                x: game.ball.x,
                y: game.ball.y,
                radius: game.ball.radius
            },
            width: game.width,
            height: game.height
        }
    }



    resetBall(game : GameLocal) {
        game.ball.x = game.width / 2;
        game.ball.y = game.height / 2;
        game.ball.speed = 5;
        game.ball.velocityX = 5;
        game.ball.velocityY = 5; 
    }

    collision(ball: Ball, player: Player): boolean {
        ball.top = ball.y - ball.radius;
        ball.bottom = ball.y + ball.radius;

        ball.left = ball.x - ball.radius;
        ball.right = ball.x + ball.radius;

        player.top = player.y;
        player.bottom = player.y + player.height;

        player.left = player.x;
        player.right = player.x + player.width;

        return ball.right > player.left && ball.bottom > player.top && ball.left < player.right && ball.top < player.bottom;
        
    }

    getInput(socket: SocketWithUser, input: Input) {
        try {
            for (const game of this.games.values())
            {
                if (game.mode === GameMode.CUSTOM)
                {
                    if (game.players[0].user.id === socket.user.id)
                    {
                        const sizeY = game.height / input.height;
                        game.players[0].y = (input.eventY * sizeY) - (input.top * sizeY) - game.players[0].height / 2;
    
                        return this.emit(game, 'gamestate', this.getGameState(game));
                    }
                }
                else {
                    for(const player of game.players)
                    {
                        if (player.user.id === socket.user.id)
                        {
                            const sizeY = game.height / input.height;
                            player.y = (input.eventY * sizeY) - (input.top * sizeY) - player.height / 2;
                            return this.emit(game, 'gamestate', this.getGameState(game));
                        }
                    }
                }
            }
        } catch (error) {
            return;
        }
    }

    async removePlayer(client: SocketWithUser) {
        try {
            const i: number = this.sockets.indexOf(client);
            this.sockets.splice(i, 1);
            for (const game of this.games.values()) {
                    for (const player of game.players) {
                        if (player.user.id === client.user.id) {
                            player.score = 0;
                            const winner = game.players.find((p) => p.user.id != player.user.id);
                            await this.stopGame(game, winner);
                        }
                    }
            }
        } catch (error) {
            return;
        }
    }

    async inviteToGame(client: SocketWithUser, userId: number, server: Server) {
        try {
            if (this.server === null)
                this.server = server;
            for (const g of this.inviteGames.values()) {
                if (g.players[0].user.id == userId)
                    return;
            }
            this.server.to(userId.toString()).emit('inviteToGame_server', {id: client.user.id, username: client.user.username});
            const game = this.createGame(GameMode.CLASSIC);
            const player = this.createPlayer(client, game);
            game.players.push(player);
            client.join(game.room);
            this.inviteGames.set(game.room, game);
        } catch (error) {
            return;
        }
    }

    async accept_game(client: SocketWithUser, userId: number, server: Server) {
        if (this.checkPlaying(client))
        {
            server.to(userId.toString()).emit('rejectGame_server');
            return;
        }
        try {
            for (const gameLocal of this.inviteGames.values()) {
                if (gameLocal.players[0].user.id == userId) {
                    const player = this.createPlayer(client, gameLocal);
                    gameLocal.players.push(player);
                    const game: Game = this.gameRepository.create({ score1: 0, score2: 0, status: GameStatus.PLAYING, room: gameLocal.room, mode: gameLocal.mode});
                    game.player1 = gameLocal.players[0].user;
                    game.player2 = player.user;
                    await this.gameRepository.save(game);
                    gameLocal.status = GameStatus.PLAYING;
                    this.games.set(gameLocal.room, gameLocal);
                    this.inviteGames.delete(gameLocal.room);
                    this.server.to(client.user.id.toString()).emit('ready');
                    await this.userService.setStatus(player.user.id, Userstatus.PLAYING);
                    await this.userService.setStatus(gameLocal.players[0].user.id, Userstatus.PLAYING);
                    client.join(game.room);
                    break;
                }
            }
        } catch (error) {
            return;
        }
    }
    async reject_game(client: SocketWithUser, userId: number, server: Server) {
        for (const gameLocal of this.inviteGames.values()) {
            if (gameLocal.players[0] && gameLocal.players[0].user.id === userId) {
                gameLocal.players[0].socket.leave(gameLocal.room);
                this.inviteGames.delete(gameLocal.room);
                server.to(userId.toString()).emit('rejectGame_server');
            }
        }
    }
}

