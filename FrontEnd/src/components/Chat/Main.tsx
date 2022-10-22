import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { getAllRomsAndUsersApi } from "../Services/room";
import { ChatType, MessageType, RoomType, UserType } from "../Types/types";
 
let socket: Socket;


interface User {
	fname : string;
	lname : string;
	login :string;
	// channels:  Channels[];
}

const Users : User[] = [
	{
	fname : "med",
	lname : "kh",
	login : "mokhames",
	// channels : channels1,

	},
	{
	fname : "ihssane",
	lname : "ouardi",
	login : "iouardi",
	// channels : channels2,

	},

];


const DUMMY_MESSAGES: { [key: string]: MessageType[] } = {
	botRoom: [
		{
			_id: "1",
			roomId: "1",
			sendBy: { _id: "ds", username: "Bot 🤖" },
			content: "We are so happy to see you here",
			updatedAt: new Date(),
		},
		{
			_id: "2",
			roomId: "1",
			sendBy: { _id: "ds", username: "Bot 🤖" },
			content: "you can contact your friends using dm",
			updatedAt: new Date(),
		},
		{
			_id: "3",
			roomId: "1",
			sendBy: { _id: "ds", username: "Bot 🤖" },
			content:
				"And also you can create your own room and chat with your friends",
			updatedAt: new Date(),
		},
	],
};
const createNewMsg = (
	content: string,
	roomId: string,
	userId: string,
	username: string
): MessageType => {
	return {
		_id: Math.random().toString(),
		roomId: roomId,
		sendBy: { _id: userId, username: username },
		content: content,
		updatedAt: new Date(),
	};
};

const ChatSide: React.FC = () => {

    const [messages, setMessages] = useState<{ [key: string]: MessageType[] }>(
		DUMMY_MESSAGES
	);
	const [users, setUsers] = useState<any>([]);
	const [rooms, setRooms] = useState<any>([]);
	const [selectedUserDM, setSelectedUserDM] = useState<ChatType>({
		_id: "",
		name: "",
	});
	const [isMemberOfRoom, setIsMemberOfRoom] = useState<boolean>(true);
	const [choosenChat, setChoosenChat] = useState<ChatType>({
		name: "Direect Messages",
		_id: "",
	});
	const chatroomref = useRef(choosenChat);
	const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    

	const navigate = useNavigate();

    useEffect(() => {
		getAllRomsAndUsersApi()
			.then((roomsUsersData) => {
				setRooms(roomsUsersData.rooms);
				setUsers(roomsUsersData.users);
			})
			.catch((err) => console.log(err));

		socket = io(`localhost:3000`, {
			// auth: {
			// 	access_token: userInfo.access_token,
			// },
		})

		socket.on("connect", () => {
			// console.log("connected");
			socket.emit("AddConnectedUser", { username: Users[0].login });
		});

		socket.on("joinedDm", ({ messages: privateMessages, receiverId }) => {
			setMessages((prevMessages) => ({
				...prevMessages,
				[receiverId]: privateMessages,
			}));
		});
    });


    // const [userData, setUserData] = useLocalStorage("user");
    return (<></>);

}

export default ChatSide;



