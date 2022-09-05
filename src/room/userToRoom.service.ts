import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserToRoom } from "./entities/userToRoom.entity";

@Injectable()
export class UserToRoomService {
    constructor(@InjectRepository(UserToRoom) private userToRoomRepositoty: Repository<UserToRoom>,) {}
}