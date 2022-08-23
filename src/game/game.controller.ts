import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Game } from "./entites/game.entity";
import { GameService } from "./game.service";

@ApiTags('Game')
@Controller('game')
export class GameController {
    constructor (private gameService: GameService) {}
    @Get('user/:userId')
    async getUserGames(@Param('userId', ParseIntPipe) userId: number): Promise<Game[]> {
        return this.gameService.getUserGames(userId);
    }

    @Get(':id')
    async getGame(@Param('id', ParseIntPipe) id: number) : Promise<Game> {
        return this.gameService.getGame(id);
    }

    @Post()
    async create() : Promise<Game> {
        return this.gameService.create();
    }
}