import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JWTGuard } from "src/auth/guards/jwt.guard";
import { jwtModule } from "src/auth/jwt.module";
import { UserModule } from "src/user/user.module";
import { Room } from "./entities/room.entity";
import { UserToRoom } from "./entities/userToRoom.entity";
import { RoomController } from "./room.controller";
import { RoomGateway } from "./room.gateway";
import { RoomService } from "./room.service";

@Module({
    imports: [UserModule, TypeOrmModule.forFeature([Room, UserToRoom]), jwtModule, ConfigModule],
    controllers: [RoomController],
    providers: [RoomService, RoomGateway],
})
export class RoomModule {}