import { ForbiddenException, Injectable, Logger, Param } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { GameLocal, Player, SocketWithUser, Ball, GameState, Input } from "src/types";
import { User, Userstatus } from "src/user/entities/user.entity";
import { Repository } from "typeorm"
import { Game, GameMode, GameStatus } from "./entites/game.entity";
import { v4 as uuidv4} from "uuid";
import { UserService } from "src/user/user.service";
import { Server } from "socket.io";

@Injectable()
export class GameService {
    private logger: Logger = new Logger(GameService.name);
    socketsClassic: Array<SocketWithUser> = [];
    socketsCustom: Array<SocketWithUser> = [];
    games: Map<string, GameLocal> = new Map();
    server : Server| null = null;
    constructor(private userService: UserService, @InjectRepository(Game) private gameRepository: Repository<Game>,) {}
    
    async getAllGames() {
        return this.gameRepository.find();
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

    async add(socket: SocketWithUser, mode: string, server: Server): Promise<void> {
        // console.log(socket.user);
        if (this.server === null)
            this.server = server;
        if (!socket.user)
            return;
        const sockets = this.getSocketsArray(mode);
        for (const s of sockets)
        {
            // console.log('user ',s.user);
            if (s.user.id === socket.user.id)
                return;
        }
        if (this.getPlayer(socket.user))
            return;
        sockets.push(socket);
        if (sockets.length < 2)
            return;
        if (mode != GameMode.CUSTOM)
            mode = GameMode.CLASSIC;
        const gamelocal : GameLocal = this.createGame(mode as GameMode);
        const game: Game = this.gameRepository.create({ score1: 0, score2: 0, status: GameStatus.WAITING, room: gamelocal.room, mode: mode});
        while (sockets.length && gamelocal.players.length < 2)
        {
            const s: SocketWithUser = sockets.shift();
            const player: Player = this.createPlayer(s, gamelocal);
            gamelocal.players.push(player);
            player.socket.join(gamelocal.room);
            this.server.to(player.socket.id).emit('game', gamelocal.room);
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
        
    }
    getSocketsArray(mode: string) {
        if (mode === GameMode.CUSTOM)
            return this.socketsCustom;
        return this.socketsClassic;
        
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
        console.log('player', player.x);
        return player;
    }
    

    joinGame(socket: SocketWithUser, room: string): void
    {
        if (!socket.user)
            return;
        const game = this.games.get(room);
        if (!game)
            return;
        socket.join(game.room);
        game.spectators.push(socket);
    }

    async stopGame(game: GameLocal, winner : Player): Promise<void> {
        // console.log('the winer is : ', winer.user.username);
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
                gameUpdated.status = GameStatus.END;
                game.status = GameStatus.END;
                await this.gameRepository.update(gameUpdated.id, gameUpdated);
                this.emit(game, 'stopgame', winner.user);
                this.games.delete(game.room);
            }
        } catch (error) {
            console.log(error.message);
            return;
        }
    }

    createGame(mode: GameMode) : GameLocal {
        console.log('mode ', mode);
        const game : GameLocal = {
            players: [],
            room: uuidv4(),
            spectators: [],
            status: GameStatus.WAITING,
            ball: new Ball(),
            width: 800,
            height: 500,
            maxScore: 50,
            mode: GameMode.CLASSIC,
            countdown: 0
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
            else if (game.status === GameStatus.PAUSE) {
                if (game.countdown > 0)
                    game.countdown--;
                else if (game.countdown === 0)
                    this.stopGame(game, game.players[0].user.status == Userstatus.OFFLINE ? game.players[0] : game.players[1]);
            }
        }
    }

    
    async emit(game: GameLocal, event: string,  payload: any) {
        this.server.to(game.room).emit(event, payload);
        // for (const player of game.players)
        //     player.socket.emit(event, payload);
        // if (game.spectators.length)
        //     for (const spectator of game.spectators)
        //         spectator.emit(event, payload);
    }

    async update(game: GameLocal) {

        // Get left player
        const rightPlayer = game.players[1];
        const leftPlayer = game.players[0];

        game.ball.x += game.ball.velocityX;
        game.ball.y += game.ball.velocityY;

        // control computer paddle
        // let computerLevel: number = 0.1;
        // leftPlayer.y += (game.ball.y - (leftPlayer.y + leftPlayer.height/2)) * computerLevel;

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
    }


    getGameState(game: GameLocal): GameState {
        return {
            leftPlayer: {
                x: game.players[0].x,
                y: game.players[0].y,
                width: game.players[0].width,
                height: game.players[0].height,
                score: game.players[0].score
            },
            rightPlayer: {
                x: game.players[1].x,
                y: game.players[1].y,
                width: game.players[1].width,
                height: game.players[1].height,
                score: game.players[1].score,
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

    // write a function to check collision between ball and player different from the one in the client
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
        
        for (const game of this.games.values())
        {
            for(const player of game.players)
            {
                if (player.user.id === socket.user.id)
                {
                    const sizeY = input.height / game.height;
                    player.y = (input.eventY * sizeY) - (input.top * sizeY) - player.height / 2;
                    return this.emit(game, 'gamestate', this.getGameState(game));
                }
            }
        }
    }

    async removePlayer(client: SocketWithUser) {
        // if (this.socketsClassic.find((s) => s.user.id === client.user.id))
        //     this.socketsClassic.dele
        for (const game of this.games.values()) {
            for (const player of game.players) {
                if (player.user.id === client.user.id) {
                    player.user.status = Userstatus.OFFLINE;
                    game.status = GameStatus.PAUSE;
                    game.countdown = 1800;
                }
            }
        }
    }
}

