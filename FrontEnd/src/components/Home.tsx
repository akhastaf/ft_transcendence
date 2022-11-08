// import {ChevronDownIcon, PlusIcon } from '@heroicons/react/outline';
import  {useCallback, useEffect, useRef, useState} from 'react';
// import ChannelIcon from './ChannelIcon';
// import {IoCompassOutline } from 'react-icons/io5';
// import  MemberCard  from './MemberCard';
// import AddChannel from './AddChannel';
import {getAllRooms } from './Services/room'
import axios from 'axios';
import {  RouteMatch, useNavigate, useSearchParams } from 'react-router-dom';
import SideBar from './SideBar/SideBar';
import ChannelList from './SideBar/ChannelList';
import { ChatType, MessageType, RoomType, UserType } from './Types/types';
import { io, Socket } from "socket.io-client";
import ChatHeader from './ChatSide/ChatHeader';
import {localService} from '../api/axios'
import MessagesSection from './ChatSide/MessagesSection';
import { getCurrentUser } from './Services/user';
import MessageInput from './ChatSide/MessageInput';
import GameHome from './Game/GameHome';
// import { toast } from "react-toastify";
// import {access} from "../api/access";
// import ChatPage from "./ChatSide/ChatPage";

let socket: Socket;

// impor
// const logo = require('../images/ponglogo.png');
// const channel1 = require('../images/wolf.png');
const channel2 = require('../images/yoko.png');
// const channel3 = require('../images/download.jpeg');
// const channel4 = require('../images/1337.jpeg');
// const channel5 = require('../images/tool.png');


// interface User { 
// 	fname : string;
// 	lname : string;
// 	login :string;
// 	channels:  Channels[];
// }

// interface Channels {
// 	name : string;
// 	icon : any;
// 	// Users: User;
// }

// const channels1 : Channels[] = [
// 	{
// 		name :"channel11",
// 		icon : channel5 ,
// 		// Users : Userss,
// 	}, 
// 	{
// 		name : "channel12",
// 		icon : channel4,
// 	},  
// 	{
// 		name :"channel13",
// 		icon : channel3,
// 	},  
// 	{
// 		name :"channel14",
// 		icon : channel2,
// 	}, 
// 	{
// 		name :"channel15",
// 		icon : channel1,
// 	}, 
// ];
// const channels2 : Channels [] = [
// 	{
// 		name :"channel21",
// 		icon : channel2,
// 	}, 
// 	{
// 		name : "channel22",
// 		icon : channel2,
// 	},  
// 	{
// 		name :"channel23",
// 		icon : channel3,
// 	},  
// 	{
// 		name :"channel24",
// 		icon : channel4,
// 	}, 
// 	{
// 		name :"channel25",
// 		icon : channel5,
// 	}, 
// ];

// const Users : User[] = [
// 	{
// 	fname : "med",
// 	lname : "kh",
// 	login : "mokhames",
// 	channels : channels1,

// 	},
// 	{
// 	fname : "ihssane",
// 	lname : "ouardi",
// 	login : "iouardi",
// 	channels : channels2,

// 	},

// ];


// let u = [{
// 	id: 1,
// 	username: 'mokhames',
// 	email: 'mokhames@student.1337.ma',
// 	provider: '42',
// 	twofa: false,
// 	secret_tmp: null,
// 	secret: null,
// 	recoveryCode: null,
// 	avatar: 'https://cdn.intra.42.fr/users/mokhames.jpg',
// 	status: 'offline',
// 	win: 0,
// 	loss: 0,
// 	level: 0,
// 	coalition: null,
// 	// createdAt: 2022-09-25T15:21:28.370Z,
// 	// updatedAt: 2022-09-25T15:21:28.370Z
//   },
//    {
// 	   id: 2,
// 	   username: 'iouardi',
// 	   email: 'iouardi@student.1337.ma',
// 	   provider: '42',
// 	   twofa: false,
// 	   secret_tmp: null,
// 	   secret: null,
// 	   recoveryCode: null,
// 	   avatar: 'https://cdn.intra.42.fr/users/iouardi.jpg',
// 	   status: 'offline',
// 	   win: 0,
// 	   loss: 0,
// 	   level: 0,
// 	   coalition: null,
// 	//    createdAt: 2022-09-26T14:23:39.314Z,
// 	//    updatedAt: 2022-09-26T14:23:39.314Z
// 	 }
// ]


// const userInfo : UserType = {
//         _id: "1",
//         username: 'med trevor',
// 		createdAt: 	new Date(),
// 		updatedAt	: new Date(),
// 		notifications: 0,
// 		isOnline: false,
// 	// {
//     //     _id: "2",
//     //     username: 'trevor',
// 	// 	createdAt: 	new Date(),
// 	// 	updatedAt	: new Date(),
// 	// 	notifications: 1,
// 	// 	isOnline: true,
// 	// },
// }


// const isAdmin = false // TODO to be feteched from localdata
// const show = isAdmin ? null : "invisible";

// const addUsers = () => {
// 	const username = prompt("Enter username");
// 	if (username)
// 	{
	// 		// TODO add user to room 
	// 	}
	// }
	
	const users1 : UserType[] = [
	
		{
			_id: "1",
			username: 'John Smith',
			createdAt: 	new Date(),
			updatedAt	: new Date(),
			notifications: 0,
			isOnline: false,
			avatar: channel2,
			email: "hello@gmail.com",
			phoneNumber: ""
		},
		{
			_id: "2",
			username: 'med trevor',
			createdAt: 	new Date(),
			updatedAt	: new Date(),
			notifications: 1,
			isOnline: true,
			avatar: channel2,
			email: "hello@gmail.com",
			phoneNumber: ""
		},
		{
			_id: "2",
			username: 'John www',
			createdAt: 	new Date(),
			updatedAt	: new Date(),
			notifications: 6,
			isOnline: true,
			avatar: channel2,
			email: "hello@gmail.com",
			phoneNumber: ""
		}
	
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

	const randomMessages : string[] = [
		"hello",
		"hello 2",
		"rip",
		"rip 1",
	]

const randomRoom : RoomType = {
	_id : "1",
	name: "random room",
	private: false,
	password: "123",
	createdBy: users1[1],
	members: users1,
	createdAt: new Date(),
	updatedAt: new Date(),
	messages: randomMessages,
	notifications: 1,

}




// const usersonline : string [] = [
// 	"med trevor",
// 	"John www",
// ]




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


function Home() {
	
	const navigate = useNavigate();


	const [messages, setMessages] = useState<{ [key: string]: MessageType[] }>(
		DUMMY_MESSAGES
	);
	
	// const [showModal, setShowModal] = useState(false);
	 // eslint-disable-next-line
	const [searchParams, setSearchParams] = useSearchParams();
	
	// const [userInfo, setUserInfo] = useLocalStorage("user");
			
			// const openModal = () => {
			// 	console.log("hello world!");
			// 	setShowModal(true);
			// }

			const [users, setUsers] = useState<any>([]);

			// const access  = searchParams.get("accessToken");
			const [rooms, setRooms] = useState<any>([]);
			const [userInfo, setUserInfo] = useState<UserType>({
				_id: "",
				username: "",
				createdAt: new Date(),
				updatedAt: new Date(),
				avatar: "",
				email:"",
				phoneNumber: null,
			});

			// socket = io(`localhost:3000`, {
			// 	auth: {
			// 		access_token: `Bearer ${access};`,
			// 	},
			// })
	
			// socket.on("connect", () => {
			// 	// console.log("connected");
			// 	socket.emit("AddConnectedUser", { username: users[0].username });
	
			// })
  

			 // eslint-disable-next-line
			const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

			// setOnlineUsers(usersonline);
			// setOnlineUsers("med trevor");

			const [choosenChat, setChoosenChat] = useState<ChatType>({
				name: "",
				_id: "",
			});
			// eslint-disable-next-line
			const [isMemberOfRoom, setIsMemberOfRoom] = useState<boolean>(true);
			const [selectedUserDM, setSelectedUserDM] = useState<ChatType>({
				_id: "",
				name: "",
			});
			
			
			

			const selectedUserDMHandler = (user: ChatType) => {
				console.log(`dm = ${user._id}`);
				setSelectedUserDM(user);
				setChoosenChat(() => ({ name: "Direct Messages", _id: user._id }));
			};



			const selectRoomHandler = (room : RoomType | string) =>
			{
				if (typeof room === "string") {
					setChoosenChat(() => ({ name: room, _id: "" }));
					setSelectedUserDM({ _id: "", name: "Direct Messages" });
					// getAllUsers()
					// 	.then((fetchedUsers) => {
					// 		users.map((user: UserType) => {
					// 			if (user.notifications && user.notifications > 0) {
					// 				const userIndexInFetchedUsers = fetchedUsers.findIndex(
					// 					(fetchedUser: UserType) => fetchedUser._id === user._id
					// 				);
					// 				if (userIndexInFetchedUsers !== -1) {
					// 					fetchedUsers[userIndexInFetchedUsers].notifications = user.notifications;
					// 				}
					// 			}
					// 			return null;
					// 		})
					// 		setUsers(fetchedUsers)
					// 	})
					// 	.catch((err) => console.log(err));
					// if (isMemberOfRoom === false) {
					// 	setIsMemberOfRoom(true);
					// }
				} else {
					setChoosenChat(() => ({ name: room.name, _id: room._id }));
					
					// getRoomData(room.name)
					// 	.then((roomData) => {
							setRooms((prevRooms: any) => {
								const rooms = prevRooms.map((room: RoomType) => {
									if (room._id === randomRoom._id) {
										room.notifications = 0;
									}
									return room;
								});
								return [...rooms];
							});
							addMessageInRoomOrPrivateDM(
								room._id,
								randomRoom.messages,
								true
							);
							setUsers(randomRoom.members);
					// 	})
					// 	.catch((err) => console.log(err));
		
					// socket.emit("showMyRoom", {
					// 	room: room,
					// 	userId: userInfo.userId,
					// });
				}	
			}

			 // eslint-disable-next-line 
			useEffect(() => {
				getCurrentUser() // !! to be changed becasue its mr93a (change to connected socket)
				.then((user) => {
					setUserInfo(user[0]);
					console.log(user);
				})
				.catch((err) => console.log(err));

				getAllRooms()
				.then((room) => {
					setRooms([...rooms,]);
					console.log("u son of bitch i am in");
					// setUsers(roomsUsersData.users);
				})
				.catch((err) => console.log(err));
				// setUsers(users[0])
				// selectedUserDMHandler(users[0]);
		// getAllUsers();
		 // eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);


	const getNumberOfDmNotifications = (): number => {
		let numberOfNotifications = 0;

		users.map((user: UserType) => {
			if (user.notifications && user.notifications > 0) {
				numberOfNotifications += user.notifications;
			}
			return null;
		});

		return numberOfNotifications;
	};

	const chatroomref = useRef(choosenChat);
	const createRoomHandler = (roomName: string, private1: string, password : string | null ) => {
		// console.log(`createRoomHandler: ${roomName}`);
		// console.log(`createRoomHandler: ${private1}`);
		// console.log(`createRoomHandler: ${password}`);
		// socket.emit("createRoom", {
		// 	roomName: roomName,
		// 	private: private1,
		// 	password: password,
		// 	userId: userInfo._id,
		// });
		localService.post("/room", {
			name: roomName,
			private: true,
			password: password,
			repeat_password: password,
		}).then((room) => {
			console.log(room.data);
			setRooms([...rooms, room.data])
		})
		.catch((err) => 
		console.log(`err  = ${err}`));
	}; 

	const logoutHandler = () => {
		console.log("rip i am dead");
		navigate("/");
		// ! probably need to contact socket with message 'logout' then forward to first page

	}

	const joinRoomHandler = () => {
		console.log(`joinRoomHandler: ${choosenChat.name}`);
		setIsMemberOfRoom(true);
		socket.emit("joinRoom", {
			roomName: choosenChat.name,
			userId: userInfo._id,
		});
	};

	//! ********* Message       Hnadling        */


	const addMessageInRoomOrPrivateDM = useCallback((
		roomId: string,
		newMessage: any,
		isRoomMesages: boolean = false,
		isPrivateDm: boolean = false
	) => {
		if (isRoomMesages === false) {
			if (roomId !== chatroomref.current._id) {
				if (isPrivateDm === true) addUserNotification(roomId);
				else addRoomNotification(roomId);
			}
			console.log("i am here\n");
			addPrivateDmMessage(roomId, newMessage);
		} else {
			addRoomMessage(roomId, newMessage);
		}
	}, []);


	const addUserNotification = (roomId: string) => {
		setUsers((prevUsers: any) => {
			const users = prevUsers.map((user: UserType) => {
				if (user._id === roomId) {
					user.notifications = user.notifications
						? user.notifications + 1
						: 1;
					return user;
				}
				return user;
			});

			return [...users];
		});
	};

	const addRoomNotification = (roomId: string) => {
		setRooms((prevRooms: any) => {
			const rooms = prevRooms.map((room: RoomType) => {
				if (room._id === roomId) {
					room.notifications = room.notifications
						? room.notifications + 1
						: 1;

					return room;
				}
				return room;
			});
			return [...rooms];
		});
	};

	const addPrivateDmMessage = (roomId: string, newMessage: any) => {
		setMessages((prevMessages) => {
			if (prevMessages[roomId]) {
				// console.log(prevMessages);
				return {
					...prevMessages,
					[roomId]: [...prevMessages[roomId], newMessage],
				};
			}
			return {
				...prevMessages,
				[roomId]: [newMessage],
			};
		});
	};

	const addRoomMessage = (roomId: string, newMessage: any) => {
		setMessages((prevMessages) => {
			if (prevMessages[roomId]) {
				return {
					...prevMessages,
					[roomId]: [...prevMessages[roomId], ...newMessage],
				};
			}
			return {
				...prevMessages,
				[roomId]: newMessage,
			};
		});
	};

	const sendMessageHandler = (content: string) => {
		if (choosenChat.name === "Direct Messages") {
			console.log(" i entered");
			// socket.emit("sendMessage", {
			// 	content: content,
			// 	room: { ...choosenChat, _id: selectedUserDM._id },
			// 	userId: userInfo._id,
			// 	isPrivateDm: choosenChat.name === "Direct Messages",
			// }
			// );
		} else {
			socket.emit("sendMessage", {
				content: content,
				room: choosenChat,
				userId: userInfo._id,
			});
		}

		const createdMsg = createNewMsg(
			content,
			choosenChat._id,
			userInfo._id,
			userInfo.username
		);

		addMessageInRoomOrPrivateDM(choosenChat._id, createdMsg);
	};


  return ( 
    <>
    <div className="flex h-screen">
		<ChannelList
		setChoosenChat={setChoosenChat}
		setSelectedUserDM={setSelectedUserDM}
		rooms ={rooms}
		selectRoomHandler={selectRoomHandler}
		dmNotifications={getNumberOfDmNotifications()}
		createRoomHandler={createRoomHandler}
		
		/>
		{/* //! setUsers to friend when defaulted */}
		<SideBar
		choosenChat={choosenChat}
		users={users}  
		currentUser={userInfo}
		onlineUsers={onlineUsers}
		selectedUserDM={selectedUserDMHandler}
		logoutHandler={logoutHandler}
		
		/>


				<div className=" bg-[#36393f] flex-grow col-span-2 p-0">
					<div className="flex flex-col h-[100vh]">
						<ChatHeader
							selectedUserDM={selectedUserDM}
							choosenChat={choosenChat}
						/>
						 {choosenChat.name === "Direct Messages" &&
							choosenChat._id === "" && (
								<MessagesSection messages={messages.botRoom} />
							)}

						{
							choosenChat.name == "" && selectedUserDM.name == ""
							&& (
								<GameHome />
							)
						}


						{
						choosenChat.name === "Direct Messages" &&
							choosenChat._id !== "" &&
							messages[choosenChat._id] && (
								<MessagesSection
									messages={messages[choosenChat._id]}
								/>
							)
						} 
							
						{/* {
						 choosenChat.name !== "Direct Messages" &&
							messages[choosenChat._id] && (
								<MessagesSection
									messages={messages[choosenChat._id]}
								/>
						)}
					 */}
						<MessageInput
							joinRoomHandler={joinRoomHandler}
							choosenChat={choosenChat}
							isMemberOfRoom={isMemberOfRoom}
							sendMessage={sendMessageHandler}
						/> 
					</div>
				{/* <div>
					<ChatPage/>*/}
				</div> 
    </div>
    </>
  )
}

export default Home