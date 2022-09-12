import { Request } from "express";
import { Socket } from "socket.io";
import { User } from "./user/entities/user.entity";

export interface RequestWithUser extends Request {
    user: User,
}

export interface SocketWithUserId extends Socket {
    userId: number;
}
export interface SocketWithUser extends Socket {
    user: User,
}