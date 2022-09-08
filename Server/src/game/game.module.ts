import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JWTGuard } from "src/auth/guards/jwt.guard";
import { Game } from "./entites/game.entity";
import { GameController } from "./game.controller";
import { GameService } from "./game.service";

@Module({
    imports: [TypeOrmModule.forFeature([Game])],
    controllers: [GameController],
    providers: [GameService]
})
export class GameModule {}