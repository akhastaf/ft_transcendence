import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AchievmentService } from "./achievment.service";
import { Achievment } from "./entities/achievment.entity";

@ApiTags('Achievment')
@Controller('achievment')
export class AchievmentController {
    constructor(private achivmentService: AchievmentService){}

    @Get()
    async findAll(): Promise<Achievment[]> {
        return this.achivmentService.findAll();
    }
}