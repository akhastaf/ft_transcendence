import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AchievmentController } from "./achievment.controller";
import { AchievmentService } from "./achievment.service";
import { Achievment } from "./entities/achievment.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Achievment])],
    controllers: [AchievmentController],
    providers: [AchievmentService],
    exports: [AchievmentService]
})
export class AchievmentModule {}