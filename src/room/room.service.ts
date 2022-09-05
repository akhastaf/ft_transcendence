import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRoomDTO } from "./dto/create-room.dto";
import { Room } from "./entities/room.entity";
import * as bcrypt from "bcrypt"
import { UserService } from "src/user/user.service";
import { User } from "src/user/entities/user.entity";
import { UserToRoom } from "./entities/userToRoom.entity";

@Injectable()
export class RoomService {
    constructor(private userService: UserService,
                @InjectRepository(Room) private roomRepository: Repository<Room>,
                @InjectRepository(UserToRoom) private userToroomRepository: Repository<UserToRoom>,) {}


    async getAll() : Promise<Room[]> {
        return await this.roomRepository.find({
            relations: {
                userToRoom: true,
                createdBy: true,
                adminstartors: true,
            },
            order: {
                id: 'ASC'
            }
        });
    }


    async create(createRoomDTO: CreateRoomDTO, userid: number) : Promise<Room> {
        const room = this.roomRepository.create(createRoomDTO);
        if (room.password)
            room.password = bcrypt.hashSync(room.password, 10);
        const user = await this.userService.getUser(userid);
        room.createdBy = user;
        const savedroom = await this.roomRepository.save(room);
        const userToRoom = this.userToroomRepository.create({userId: user.id, roomId: savedroom.id});
        // room.userToRoom = [userToRoom];
        await this.userToroomRepository.save(userToRoom);
        return savedroom;
    }

    async join(userId: number, id: number) : Promise<Room> {
        const room = await this.roomRepository.findOne({
            where: {
                id: id,
            },
            relations: {
                userToRoom: true,
            }
        });
        const userToroom = this.userToroomRepository.create({userId: userId, roomId: room.id});
        this.userToroomRepository.save(userToroom);
        // room.userToRoom = [userToroom];
        return room;
    }
}