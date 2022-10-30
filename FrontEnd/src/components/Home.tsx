// import {ChevronDownIcon, PlusIcon } from '@heroicons/react/outline';
import  {useEffect, useState} from 'react';
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


const users : UserType[] = [

	{
		_id: "1",
        username: 'John Smith',
		createdAt: 	new Date(),
		updatedAt	: new Date(),
		notifications: 0,
		isOnline: false,
		avatar: channel2,
	},
	{
		_id: "2",
        username: 'med trevor',
		createdAt: 	new Date(),
		updatedAt	: new Date(),
		notifications: 1,
		isOnline: true,
		avatar: channel2,
	},
	{
		_id: "2",
        username: 'John www',
		createdAt: 	new Date(),
		updatedAt	: new Date(),
		notifications: 6,
		isOnline: true,
		avatar: channel2,
	}

];



// const usersonline : string [] = [
// 	"med trevor",
// 	"John www",
// ]
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

			// const [users, setUsers] = useState<any>([]);
			// const access  = searchParams.get("accessToken");
			const [rooms, setRooms] = useState<any>([]);
			const [userInfo, setUserInfo] = useState<UserType>({
				_id: "",
				username: "",
				createdAt: new Date(),
				updatedAt: new Date(),
				avatar: "",
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
				name: "Direect Messages",
				_id: "",
			});
			 // eslint-disable-next-line
			const [selectedUserDM, setSelectedUserDM] = useState<ChatType>({
				_id: "",
				name: "",
			});
			

			

			const selectedUserDMHandler = (user: ChatType) => {
				setSelectedUserDM(user);
				setChoosenChat(() => ({ name: "Direct Messages", _id: user._id }));
			};



			const selectRoomHandler = (room : RoomType | string) =>
			{

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

  return ( 
    <>
    <div className="flex h-screen">
		<ChannelList 
		rooms ={rooms}
		choosenChat={choosenChat}
		selectRoomHandler={selectRoomHandler}
		dmNotifications={getNumberOfDmNotifications()}
		createRoomHandler={createRoomHandler}
		
		/>

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
						 {choosenChat.name === "Direect Messages" &&
							choosenChat._id === "" && (
								<MessagesSection messages={messages.botRoom} />
							)}
						{/* {choosenChat.name === "Direect Messages" &&
							choosenChat._id !== "" &&
							messages[choosenChat._id] && (
								<MessagesSection
									messages={messages[choosenChat._id]}
								/>
							)} */}
							
						{/*{choosenChat.name !== DM_LABEL &&
							messages[choosenChat._id] && (
								<MessagesSection
									messages={messages[choosenChat._id]}
								/>
							)}
						<MessageInput
							joinRoomHandler={joinRoomHandler}
							choosenChat={choosenChat}
							isMemberOfRoom={isMemberOfRoom}
							sendMessage={sendMessageHandler}
						/> */}
					</div>
				{/* <div>
					<ChatPage/>*/}
				</div> 
    </div>
    </>
  )
}

export default Home