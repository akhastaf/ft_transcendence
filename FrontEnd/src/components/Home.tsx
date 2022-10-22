import {ChevronDownIcon, PlusIcon } from '@heroicons/react/outline';
import  {useEffect, useState} from 'react';
import ChannelIcon from './ChannelIcon';
import {IoCompassOutline } from 'react-icons/io5';
import  MemberCard  from './MemberCard';
import AddChannel from './AddChannel';
import axios from 'axios';
import {  useSearchParams } from 'react-router-dom';
import SideBar from './SideBar/SideBar';
import { ChatType, UserType } from './Types/types';
import { io, Socket } from "socket.io-client";
import { toast } from "react-toastify";
// import {access} from "../api/access";
// import ChatPage from "./ChatSide/ChatPage";

let socket: Socket;

// impor
// const logo = require('../images/ponglogo.png');
// const channel1 = require('../images/wolf.png');
// const channel2 = require('../images/yoko.png');
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


const userInfo : UserType = {
        _id: "1",
        username: 'med trevor',
		createdAt: 	new Date(),
		updatedAt	: new Date(),
		notifications: 0,
		isOnline: false,
	// {
    //     _id: "2",
    //     username: 'trevor',
	// 	createdAt: 	new Date(),
	// 	updatedAt	: new Date(),
	// 	notifications: 1,
	// 	isOnline: true,
	// },
}


const isAdmin = false // TODO to be feteched from localdata
const show = isAdmin ? null : "invisible";

const addUsers = () => {
	const username = prompt("Enter username");
	if (username)
	{
		// TODO add user to room 
	}
}


const users : UserType[] = [

	{
		_id: "1",
        username: 'John Smith',
		createdAt: 	new Date(),
		updatedAt	: new Date(),
		notifications: 0,
		isOnline: false,
	},
	{
		_id: "2",
        username: 'med trevor',
		createdAt: 	new Date(),
		updatedAt	: new Date(),
		notifications: 1,
		isOnline: true,
	},
	{
		_id: "2",
        username: 'John www',
		createdAt: 	new Date(),
		updatedAt	: new Date(),
		notifications: 6,
		isOnline: true,
	}

];


function Home() {

	
	const [showModal, setShowModal] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	
	// const [userInfo, setUserInfo] = useLocalStorage("user");
			
			const openModal = () => {
				console.log("hello world!");
				setShowModal(true);
			}

			// const [users, setUsers] = useState<any>([]);
			




			const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

			const [choosenChat, setChoosenChat] = useState<ChatType>({
				name: "Direect Messages",
				_id: "",
			});

			const [selectedUserDM, setSelectedUserDM] = useState<ChatType>({
				_id: "",
				name: "",
			});
			

			

			const selectedUserDMHandler = (user: ChatType) => {
				setSelectedUserDM(user);
				setChoosenChat(() => ({ name: "Direct Messages", _id: user._id }));
		
				// setUsers((prevUsers: any) => {
				// 	const users = prevUsers.map((currUser: UserType) => {
				// 		if (currUser._id === user._id) {
				// 			currUser.notifications = 0;
				// 			return currUser;
				// 		}
				// 		return currUser;
				// 	});
		
				// 	return [...users];
				// });
		
				socket.emit("showPrivateMessages", {
					receiverId: user._id,
					userId: userInfo._id,
				});
			};






			useEffect(() => {
				const fetchData = async () => {
					// const data = searchParams.
					const access  = searchParams.get("accessToken");
					// const {data} =  await axios.get(`${url}auth/register`);
					if (access)
					// console.log(access);
					axios.defaults.headers.common['Authorization'] = `Bearer ${access};`;
					else
						alert('access token error');
		  }
		// console.log("data = " + ${data.token});
		fetchData()
		.catch(console.error);
		// getAllUsers();
	},[])

	

	const logoutHandler = () => {
		socket.emit("logout", {
			username: userInfo.username,
			userId: userInfo._id,
		});

		toast.success("Logout success !!", {
			position: toast.POSITION.TOP_CENTER,
		});
		
		// removeLocalItem("user");
		// setUserInfo("");
	}

  return ( 
    <>
    <div className="flex h-screen">
		<SideBar
		choosenChat={choosenChat}
		users={users}
		currentUser={{
			username: userInfo.username,
			id: userInfo._id,
		}}
		onlineUsers={onlineUsers}
		selectedUserDM={selectedUserDMHandler}
		logoutHandler={logoutHandler}
		
		/>
				{/* <div>
					<ChatPage/>
				</div> */}
    </div>
    </>
  )
}

export default Home