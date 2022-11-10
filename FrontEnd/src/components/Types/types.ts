export type RoomType = {
	_id: string;
	name: string;
	private: boolean;
	password: string;
	createdBy: UserType;
	members: UserType[];
	createdAt: Date;
	updatedAt: Date;
	messages: string[];
	notifications?: number;
}

export type MessageType = {
	_id: string;
	roomId: string;
	sendBy: { // in back end its a type User
		_id: string;
		username: string;
	};
	content: string;
	updatedAt: Date;
}

export type Game = {
	_id : string,
	score1 : number
	score2 : number
	isRunning: boolean
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
	status: string
	// achievements: AchivementType[]
}

export type AuthUserType = {
	access_token: string;
	username: string;
	userId: string;
}


export type ChatType = {
	_id: string;
	name: string;
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