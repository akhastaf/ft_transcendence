

export enum GameStatus {
    WAITING = 'waiting',
    PLAYING = 'playing',
    END = 'end',
    PAUSE = 'pause'
}

export enum GameMode {
    CLASSIC = 'classic',
    CUSTOM = 'custom'
}

export type RoomType = {
	id: string;
	name: string;
	private: boolean;
	password: string;
	createdBy: UserType;
	members: UserType[];
	createdAt: Date;
	avatar?: string;
	updatedAt: Date;
	messages: string[];
	notifications?: number;
}

export type MessageType = {
	_id: string;
	roomId: string;
	sendBy: UserType;
	content: string;
	updatedAt: Date;
}
export type MessageModal = {
	roomId: string,
	message: string;
	userId: number;
	userName: string;
	date: Date;
	currentUser: boolean;
	avatar: string;
}

export type Game = {
	_id : string,
	score1 : number
	score2 : number
	status : GameStatus
	roomGame: string
	player1: UserType
	player2: UserType
	gameStates : GameStates[]

}

export type GameStates = {
	_id: string
	score1 : number
	score2 : number
	game : Game
	createdAt : Date
	updatedAt : Date
}


export type UserType = {
	_id: string;
	username: string;
	createdAt: Date;
	updatedAt: Date;
	avatar: string;
	notifications?: number;
	isOnline?: boolean;
	email: string
	phoneNumber: string | null
	friends: UserType[];
	bloked: UserType[],
	status: string,
	twofa : boolean
	// achievements: AchivementType[]
}

export type AuthUserType = {
	access_token: string;
	username: string;
	userId: string;
}


export type ChatType = {
	_id: string;
	username: string;
}

export interface User {
	fname : string;
	lname : string;
	login :string;
	// channels:  Channels[];
}

export  interface Channels {
		name : string;
		icon : any;
		// Users: User;
}

export enum Userstatus {
    ONLINE = "online",
    OFFLINE = "offline",
    PLAYING = "playing",
}

export enum Privacy {
	DM = 'dm',
	PUBLIC = 'public',
	PRIVATE = 'private',
	PROTECTED = 'protected'
} 

export interface IFormInput {
	name: string;
	avatar?: string;
	password?: string;
	description?: string;
	privacy: Privacy;
  }


export interface profileUpdate {
	name? : string
}
export interface userModel
{
	id: number;
	name: string;
	avatar: string;
	status : string;
	notifications: number;
	action : string;
	role : string;
}

export interface roomModal {
	id: number;
	name: string;
	privacy: string;
	avatar: string;
	description: string;

}

export enum Role {
	OWNER = 'owner',
	ADMIN = 'admin',
	MEMBER = 'member'
}

export enum Status {
	ACTIVE = 'active',
	BANNED = 'banned',
	MUTED = 'muted',
	// KICKED = 'kicked',
}
//   export class CreateGroupDto {

//     @ApiProperty()
//     @MinLength(3)
//     @MaxLength(20)
//     @IsAlphanumeric()
//     name: string;

//     @ApiProperty()
//     @IsOptional()
//     @IsString()
//     avatar?: string;

//     @ApiProperty()
//     @ValidateIf(obj => obj.privacy === Privacy.PROTECTED)
//     @IsNotEmpty()
// 	@IsString()
// 	@MinLength(8)
//     @MaxLength(20)
//     password?: string;

//     @ApiProperty()
//     @IsOptional()
// 	@MaxLength(500)
//     @IsString()
//     description?: string;

//     @ApiProperty()
//     @IsOptional()
//     @IsString()
//     privacy?: Privacy;


// ------- Game Side
export type Player = {
    x: number,
    y: number,
    width: number,
    height : number,
    score: number,
	username: string,
    // color: string,
    // top?: number,
    // bottom?: number,
    // right?: number,
    // left?: number,
}

export type Ball = {
    x: number,
    y: number,
    radius: number,
    // speed: number,
    // velocityX: number,  
    // velocityY: number, 
    // color: string
    // top?: number,
    // bottom?: number,
    // right?: number,
    // left?: number,
}

export type Net = {
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
}


export type Gamestate = {
    leftPlayer : Player,
    rightPlayer : Player,
	ball: Ball,
    width: number,
    height: number
}