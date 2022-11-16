// import {ChevronDownIcon, PlusIcon } from '@heroicons/react/outline';
import { useCallback, useEffect, useRef, useState } from 'react';
// import ChannelIcon from './ChannelIcon';
// import {IoCompassOutline } from 'react-icons/io5';
// import  MemberCard  from './MemberCard';
// import AddChannel from './AddChannel';
import { AllRooms, getAllRooms, getRoomUsers } from './Services/room'
import axios from 'axios';
import { RouteMatch, useNavigate, useSearchParams } from 'react-router-dom';
import SideBar from './SideBar/SideBar';
import ChannelList from './SideBar/ChannelList';
import { ChatType, MessageType, Privacy, roomModal, RoomType, userModel, Userstatus, UserType } from './Types/types';
import { io, Socket } from "socket.io-client";
import ChatHeader from './ChatSide/ChatHeader';
import { localService } from '../api/axios'
import MessagesSection from './ChatSide/MessagesSection';
import { getCurrentUser } from './Services/user';
import MessageInput from './ChatSide/MessageInput';
import GameHome from './Game/GameHome';
import { socket } from './Services/sockets'
import { SiEmirates } from 'react-icons/si';
import ChannelsDisplay from './pages/ChannelsDisplay';
// import { toast } from "react-toastify";
// import {access} from "../api/access";
// import ChatPage from "./ChatSide/ChatPage";

// let socket: Socket;


// let token = null;
// if (typeof window !== 'undefined') {
//   token = localStorage.getItem('access_token');

// }

// let backendHost = process.env.NEXT_PUBLIC_API_BASE_URL;


// // let socket = io('http://localhost:8080', { transports: ['websocket'], auth: {
// //   token: token
// // }});
// const URL = "http://localhost:3080/";
// let socket = io(URL, {
//   withCredentials: true,
//   forceNew: true,
//   timeout: 10000, //before connect_error and connect_timeout are emitted.
//   transports: ['websocket'],
//   auth: {
//     token: token,
//   },
// });



const channel2 = require('../images/yoko.png');

const users1: UserType[] = [

	{
		_id: "1",
		username: 'John Smith',
		createdAt: new Date(),
		updatedAt: new Date(),
		notifications: 0,
		isOnline: false,
		avatar: channel2,
		email: "hello@gmail.com",
		phoneNumber: "",
		friends: [],
		bloked: [],
		status: Userstatus.OFFLINE,
	},
	{
		_id: "2",
		username: 'med trevor',
		createdAt: new Date(),
		updatedAt: new Date(),
		notifications: 1,
		isOnline: true,
		avatar: channel2,
		email: "hello@gmail.com",
		phoneNumber: "",
		friends: [],
		bloked: [],
		status: Userstatus.OFFLINE,
	},
	{
		_id: "2",
		username: 'John www',
		createdAt: new Date(),
		updatedAt: new Date(),
		notifications: 6,
		isOnline: true,
		avatar: channel2,
		email: "hello@gmail.com",
		phoneNumber: "",
		friends: [],
		bloked: [],
		status: Userstatus.OFFLINE,
	}

];

const DUMMY_MESSAGES: { [key: string]: MessageType[] } = {
	botRoom: [
		{
			_id: "1",
			roomId: "1",
			sendBy: users1[0],
			content: "We are so happy to see you here",
			updatedAt: new Date(),
		},
		{
			_id: "2",
			roomId: "1",
			sendBy: users1[1],
			content: "you can contact your friends using dm",
			updatedAt: new Date(),
		},
		{
			_id: "3",
			roomId: "1",
			sendBy: users1[2],
			content:
				"And also you can create your own room and chat with your friends",
			updatedAt: new Date(),
		},
	],
};

const randomMessages: string[] = [
	"hello",
	"hello 2",
	"rip",
	"rip 1",
]

const randomRoom: RoomType = {
	id: "1",
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
	user : UserType
): MessageType => {
	console.log("user ==== ");
	console.log(user);
	console.log("==== ");
	return {
		_id: Math.random().toString(),
		roomId: roomId,
		sendBy: user,
		content: content,
		updatedAt: new Date(),
	};
};


const Home : React.FC <{
	state : string
}> = ({state}) => 
{

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
	const [allRooms, setAllRooms] = useState<any>([]);

	// const access  = searchParams.get("accessToken");
	const [rooms, setRooms] = useState<any>([]);
	const [userInfo, setUserInfo] = useState<UserType>({
		_id: "",
		username: "",
		createdAt: new Date(),
		updatedAt: new Date(),
		avatar: "",
		email: "",
		phoneNumber: null,
		friends: [],
		bloked: [],
		status: Userstatus.OFFLINE,
	});




	useEffect(() => {
		// console.log(`wevsute = ${process.env.WEBSITE_URL}`);
		// socket = io(`http://localhost:3000/`, {
		// 	auth: {
		// 		access_token: `Bearer ${localStorage.getItem("accessToken")};`,
		// 	},
		// }) 
		// socket.emit("HI");
		socket.on("connection", (data) => {
	
	
			console.log(data);
	
			getCurrentUser(data)
				.then((user) => {
					setUserInfo(user);
				})
				.catch((err) => console.log(err));
			// console.log("socket is connected");
	
			// console.log("connected");
			// socket.emit("AddConnectedUser", { username: users[0].username });
	
		})
	});




	// eslint-disable-next-line
	const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

	// setOnlineUsers(usersonline);
	// setOnlineUsers("med trevor");

	const [choosenChat, setChoosenChat] = useState<ChatType>({
		username: "",
		_id: "",
	});
	// eslint-disable-next-line
	const [isMemberOfRoom, setIsMemberOfRoom] = useState<boolean>(true);
	const [selectedUserDM, setSelectedUserDM] = useState<ChatType>({
		_id: "",
		username: "",
	});




	const selectedUserDMHandler = (user: ChatType) => {
		console.log(`dm = ${user._id}`);
		setSelectedUserDM(user);
		setChoosenChat(() => ({ username: "Direct Messages", _id: user._id }));
	};



	const selectRoomHandler = (room: RoomType | string) => {
		if (typeof room === "string") {
			setChoosenChat(() => ({ username: room, _id: "" }));
			setSelectedUserDM({ _id: "", username: "Direct Messages" });
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
			setChoosenChat(() => ({ username: room.name, _id: room.id }));

			// getRoomData(room.name)
			// 	.then((roomData) => {
			console.log(room.id);
			// setRooms((prevRooms: any) => {
			// 	const rooms = prevRooms.map((room: RoomType) => {
			// 		if (room.id === rooms.id) {
			// 			room.notifications = 0;
			// 		}
			// 		return room;
			// 	});
			// 	return [...rooms];
			// });
			// addMessageInRoomOrPrivateDM(
			// 	room.id,
			// 	room.messages,
			// 	true
			// );
			getRoomUsers(room.id)
				.then((res) => {

					setUsers(res);
				}
				).catch(err => console.log(err))
				;
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
		// getCurrentUser() // !! to be changed becasue its mr93a (change to connected socket)
		// .then((user) => {
		// 	setUserInfo(user[0]);
		// 	console.log(user);
		// })
		// .catch((err) => console.log(err));
		// console.log("seletected roomm = ");
		// console.log(selectedUserDM);
		// console.log("-----------------");
		// console.log('====================================');
		// console.log(choosenChat);
		// console.log('====================================');



		getAllRooms()
			.then((room) => {
				setRooms(room);
				// console.log("dasdasd");

				// console.log(room);
				// console.log("u son of bitch i am in");
				// setUsers(roomsUsersData.users);
			})
			.catch((err) => console.log(err));
		// setUsers(users[0])
		// selectedUserDMHandler(users[0]);
		// getAllUsers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


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
	const createRoomHandler = (roomName: string, private1: Privacy,  avatar: any, password?: string) => {
		console.log(`createRoomHandler name: ${roomName}`);
		console.log(`createRoomHandler privacy : ${private1}`);
		console.log(`createRoomHandler password: ${password}`);
		console.log(`createRoomHandler avatar: ${avatar}`);
		// console.log(`createRoomHandler: ${password}`);
		// socket.emit("createRoom", {
		// 	roomName: roomName,
		// 	private: private1,
		// 	password: password,
		// 	userId: userInfo._id,
		// });
		console.log(avatar);
		localService.post("/channels", {
			name: roomName,
			avatar : avatar,
			password: password,
			desciption: "hello World",
			privacy: private1,
		}).then((room) => {
			// console.log(room.data);
			setRooms([...rooms, room.data])
		})
			.catch((err) =>
				console.log(err.response.data.message));
	};

	const logoutHandler = () => {
		console.log("rip i am dead");
		navigate("/");
		// ! probably need to contact socket with message 'logout' then forward to first page

	}

	const joinRoomHandler = (room : roomModal, password?: string) => {
		// console.log(`joinRoomHandler: ${choosenChat.username}`);
		// setIsMemberOfRoom(true);
		// let Rroom : roomModal[]; 
		// AllRooms().then((rooms) => {
		// 	rooms.map((room: roomModal) =>
		// 	{
		// 		if (room.name == channelName)
		// 			Rroom.push(room);
		// 	})
		// });
		socket.emit("joinGroup_client", {
			id_group: room.id,
			password: password,
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
			// console.log("i am here\n");
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
				if (room.id === roomId) {
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

	const sendMessageHandler = async (content: string) => {
		if (choosenChat.username === "Direct Messages") {
			let a : roomModal;
			var b : number = +selectedUserDM._id;
			// let aa = await new Promise((r)=>{
			socket.emit("createDm_client", b);
			socket.on("createDm_server", (data) =>
			{
				// a = data;
				socket.emit("sendMessage_client", {
					content: content,
					// room: { ...choosenChat, _id: selectedUserDM._id },
					receiver_id: data.id ,
					// isPrivateDm: choosenChat.username === "Direct Messages",
				}
				);
			})

			//  });
			// console.log("check if dm exist");
			
			// console.log(aa);
			// if (aa === false)
			// 	socket.emit("createDm", b);
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
			userInfo,
		);

		addMessageInRoomOrPrivateDM(choosenChat._id, createdMsg);
	};


	return (
		<>
			<div className="flex h-screen">
				<ChannelList
					setChoosenChat={setChoosenChat}
					setSelectedUserDM={setSelectedUserDM}
					rooms={rooms}
					selectRoomHandler={selectRoomHandler}
					// dmNotifications={getNumberOfDmNotifications()}
					createRoomHandler={createRoomHandler}
					// joinRoomHandler={joinRoomHandler}

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
						{choosenChat.username === "Direct Messages" &&
							choosenChat._id === "" && (
								<MessagesSection messages={messages.botRoom} />
							)}

						{
							state=== "HomeGAME" && choosenChat.username == "" && selectedUserDM.username == ""
							&& (
								<GameHome currentUser={userInfo} />
							)
						}


						{
							choosenChat.username === "Direct Messages" &&
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
					 {
						state === "allChannels" && <ChannelsDisplay joinRoomHandler={joinRoomHandler}/>

					 }
						<MessageInput
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

export default Home/////////////////////////////////////////////////////////////////////////////////////////////