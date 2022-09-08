import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Achievment } from "./entities/achievment.entity";

@Injectable()
export class AchievmentService {
    constructor (@InjectRepository(Achievment) 
    private achievmentRepositoty: Repository<Achievment>,) {}

    async findAll(): Promise<Achievment[]> {
        return await this.achievmentRepositoty.find();
    }
}