import { Request } from "express";
import { type } from "os";
import { Socket } from "socket.io";
import { Status } from "./messages/entities/usertogroup.entity";
import { GameMode, GameStatus } from "./game/entites/game.entity";
import { User } from "./user/entities/user.entity";

export type Payload = {
    sub: number,
    email: string
}

export interface RequestWithUser extends Request {
    user: User,
}

export interface SocketWithUserId extends Socket {
    userId: number,
	user: User,
}
export interface SocketWithUser extends Socket {
    userId: number;
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
	action : Status;
	role: string;
}

export type tokens = {
	access_token: string,
	refresh_token: string
}

export type Player = {
    user: User,
    socket: Socket,
    x: number,
    y: number,
    width: number,
    height : number,
    score: number,
    top?: number,
    bottom?: number,
    right?: number,
    left?: number,
}

export class Ball {
    x: number = 800 / 2;
    y: number = 500 / 2;
    radius: number = 10;
    speed: number = 5;
    velocityX: number = 5;
    velocityY: number = 5;
    top?: number;
    bottom?: number;
    right?: number;
    left?: number;
}
export type BallState = {
    x: number,
    y: number,
    radius: number,
    // speed: number = 5;
    // velocityX: number = 5;
    // velocityY: number = 5;
}

export type PlayerState = {
    x: number,
    y: number,
    width: number,
    height : number,
    score: number,
}

export type GameState = {
    // players: Array<Player>,
    leftPlayer : PlayerState,
    rightPlayer : PlayerState,
	ball: BallState,
    width: number,
    height : number,
}

export type Input = {
    eventY: number,
    top: number,
    width: number,
    height: number
}


export type GameLocal = {
    players: Array<Player>,
    spectators : Array<SocketWithUser>,
    room: string,
    status: GameStatus,
    ball: Ball,
    width: number,
    height: number,
    maxScore: number,
    mode: GameMode,
    countdown: number,
    computerLevel: number,
}