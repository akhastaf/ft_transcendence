import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "src/user/user.module";
import { Game } from "./entites/game.entity";
import { GameController } from "./game.controller";
import { GameGateway } from "./game.gateway";
import { GameService } from "./game.service";

@Module({
    imports: [TypeOrmModule.forFeature([Game]), AuthModule, UserModule],
    controllers: [GameController],
    providers: [GameService, GameGateway]
})
export class GameModule {}