import { Injectable, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm"
import { Game } from "./entites/game.entity";

@Injectable()
export class GameService {
    constructor(@InjectRepository(Game) 
        private gameRepository: Repository<Game>,) {}

    async getUserGames(userId: number): Promise<Game[]> {
        console.log(userId);
        return this.gameRepository.find({
            relations: {
                player1: true,
                player2: true,
            },
            where: {
                player1: {
                    id: userId,
                }
            }   
        });
    }

    async create(): Promise<Game>
    {
        const game = this.gameRepository.create();
        return await this.gameRepository.save(game);
    }

    async getGame(gameId: number) : Promise<Game> {
        const game = this.gameRepository.findOne({
            where: {
                id: gameId,
            },
            relations: {
                player1: true,
                player2: true,
            }
        });
        return game;
    }
}