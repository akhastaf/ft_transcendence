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