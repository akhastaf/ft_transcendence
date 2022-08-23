import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateRoomDTO } from "./dto/create-room.dto";
import { Room } from "./entities/room.entity";
import { RoomService } from "./room.service";

@ApiTags('Room')
@Controller('room')
export class RoomController {
    constructor(private roomService: RoomService) {}

    @Post()
    async create(@Body() createRoomDTO: CreateRoomDTO) : Promise<Room> {
        return this.roomService.create(createRoomDTO);
    }
}