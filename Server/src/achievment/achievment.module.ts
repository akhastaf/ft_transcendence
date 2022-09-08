import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JWTGuard } from "src/auth/guards/jwt.guard";
import { AchievmentController } from "./achievment.controller";
import { AchievmentService } from "./achievment.service";
import { Achievment } from "./entities/achievment.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Achievment])],
    controllers: [AchievmentController],
    providers: [AchievmentService]
})
export class AchievmentModule {}