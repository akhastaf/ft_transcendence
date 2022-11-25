import { Request } from "express";
import { type } from "os";
import { Socket } from "socket.io";
import { User } from "./user/entities/user.entity";

export interface RequestWithUser extends Request {
    user: User,
}

export interface SocketWithUserId extends Socket {
    userId: number,
	user: User,
}
export interface SocketWithUser extends Socket {
    user: User,
}

export class messageModel
{
	message: string;
	userId: number;
	userName: string;
	date: Date;
	currentUser: boolean;
	avatar: string;
}

export class channelModel
{
	id: number;
	name: string;
	privacy: string;
	avatar: string;
	description: string;
}

export class memberModel
{
	id: number;
	name: string;
	avatar: string;
	status : string;
}

export type tokens = {
	access_token: string,
	refresh_token: string
}