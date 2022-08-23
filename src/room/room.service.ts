import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRoomDTO } from "./dto/create-room.dto";
import { Room } from "./entities/room.entity";

@Injectable()
export class RoomService {
    constructor(@InjectRepository(Room) private roomRepository: Repository<Room>,) {}

    async create(createRoomDTO: CreateRoomDTO) : Promise<Room> {
        const room = this.roomRepository.create(createRoomDTO);
        return this.roomRepository.save(room);
    }
}