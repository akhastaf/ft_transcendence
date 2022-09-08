import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/auth/guards/jwt.guard";
import { RequestWithUser } from "src/user/dto/request-with-user.interface";
import { CreateRoomDTO } from "./dto/create-room.dto";
import { Room } from "./entities/room.entity";
import { RoomService } from "./room.service";

@ApiTags('Room')
@ApiBearerAuth()
@Controller('room')
@UseGuards(JWTGuard)
export class RoomController {
    constructor(private roomService: RoomService) {}

    @Get()
    async getAll() : Promise<Room[]> {
        return await this.roomService.getAll();
    }
    @Post()
    async create(@Req() req : any ,@Body() createRoomDTO: CreateRoomDTO) : Promise<Room> {
        return this.roomService.create(createRoomDTO, req.user.id);
    }

    @Get('join/:id')
    async join(@Req() req: RequestWithUser, @Param('id', ParseIntPipe) id: number) : Promise<Room> {
        return this.roomService.join(req.user.id, id);
    }

}