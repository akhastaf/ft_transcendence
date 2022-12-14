import { Body, ClassSerializerInterceptor, Controller, Get, Param, ParseIntPipe, Post, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/auth/guards/jwt.guard";
import { Game } from "./entites/game.entity";
import { GameService } from "./game.service";

@ApiTags('Game')
@ApiBearerAuth()
@Controller('game')
@UseGuards(JWTGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class GameController {
    constructor (private gameService: GameService) {
    }

    @Get()
    async getallGames(): Promise<Game[]> {
        return this.gameService.getAllGames();   
    }
    @Get('/user/:id')
    async getUserGames(@Param('id', ParseIntPipe) id: number): Promise<Game[]> {
        return this.gameService.getUserGames(id);   
    }
}