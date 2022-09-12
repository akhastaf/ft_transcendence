import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/auth/guards/jwt.guard";
import { RequestWithUser } from "src/types";
import { User } from "src/user/entities/user.entity";
import { CreateRoomDTO } from "./dto/create-room.dto";
import { Room } from "./entities/room.entity";
import { RoomGateway } from "./room.gateway";
import { RoomService } from "./room.service";

@ApiTags('Room')
@ApiBearerAuth()
@Controller('room')
@UseGuards(JWTGuard)
export class RoomController {
    constructor(private roomService: RoomService, private roomGateway: RoomGateway) {}

    @Get()
    async getAll() : Promise<Room[]> {
        return await this.roomService.getAll();
    }
    @Post()
    async create(@Req() req : any ,@Body() createRoomDTO: CreateRoomDTO) : Promise<Room> {
        const room = await this.roomService.create(createRoomDTO, req.user.id);
        if (!room.private)
            this.roomGateway.getallrooms();
        return room;
    }

    @Get('join/:id')
    async join(@Req() req: RequestWithUser, @Param('id', ParseIntPipe) id: number) : Promise<Room> {
        return this.roomService.join(req.user.id, id);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number, @Req() req: RequestWithUser): Promise<any> {
        const room = await this.roomService.delete(req.user, id);
        if (!room.private)
            this.roomGateway.getallrooms();
        console.log(room);
        return room;
    }

}