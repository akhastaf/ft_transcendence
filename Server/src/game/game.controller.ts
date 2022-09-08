import { Body, Controller, Get, Param, ParseIntPipe, Post, UseFilters, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/auth/guards/jwt.guard";
import { Game } from "./entites/game.entity";
import { GameService } from "./game.service";

@ApiTags('Game')
@ApiBearerAuth()
@Controller('game')
@UseGuards(JWTGuard)
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