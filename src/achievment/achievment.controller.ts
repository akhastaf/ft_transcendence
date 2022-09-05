import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/auth/guards/jwt.guard";
import { AchievmentService } from "./achievment.service";
import { Achievment } from "./entities/achievment.entity";

@ApiBearerAuth()
@ApiTags('Achievment')
@Controller('achievment')
@UseGuards(JWTGuard)
export class AchievmentController {
    constructor(private achivmentService: AchievmentService){}

    @Get()
    async findAll(): Promise<Achievment[]> {
        return this.achivmentService.findAll();
    }
}