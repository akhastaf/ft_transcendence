import { useCallback, useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { io, Socket } from "socket.io-client";
// import { getAllRomsAndUsersApi } from "../Services/room";
import {  User, Channels , ChatType, UserType } from "../Types/types";
import {ChevronDownIcon, PlusIcon } from '@heroicons/react/outline';
// import ChannelIcon from '../ChannelIcon';
import {IoCompassOutline } from 'react-icons/io5';
import  MemberCard  from '../MemberCard';
import AddChannel from '../AddChannel';

// export {} 
import axios from 'axios';
import {  useSearchParams } from 'react-router-dom';
import ChannelList from "./ChannelList";


// let socket : Socket;


const logo = require('../../images/ponglogo.png');
const channel1 = require('../../images/wolf.png');
const channel2 = require('../../images/yoko.png');
const channel3 = require('../../images/download.jpeg');
const channel4 = require('../../images/1337.jpeg');
const channel5 = require('../../images/tool.png');


// interface User {
// 	fname : string;
// 	lname : string;
// 	login :string;
// 	// channels:  Channels[];
// }
const isAdmin = false // TODO to be feteched from localdata
const show = isAdmin ? null : "invisible";

const addUsers = () => {
	const username = prompt("Enter username");
	if (username)
	{
		// TODO add user to room 
	}
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



const channels1 : Channels[] = [
	{
		name :"channel11",
		icon : channel5 ,
		// Users : Userss,
	}, 
	{
		name : "channel12",
		icon : channel4,
	},  
	{
		name :"channel13",
		icon : channel3,
	},  
	{
		name :"channel14",
		icon : channel2,
	}, 
	{
		name :"channel15",
		icon : channel1,
	}, 
];
const channels2 : Channels [] = [
	{
		name :"channel21",
		icon : channel2,
	}, 
	{
		name : "channel22",
		icon : channel2,
	},  
	{
		name :"channel23",
		icon : channel3,
	},  
	{
		name :"channel24",
		icon : channel4,
	}, 
	{
		name :"channel25",
		icon : channel5,
	}, 
];


const SideBar: React.FC <{

    choosenChat: ChatType;
	users: UserType[];
	currentUser: {
		username: string;
		id: string;
	};
	selectedUserDM: (user: ChatType) => void;
	onlineUsers: string[];
	logoutHandler: () => void;

}> =  ({ users, currentUser, choosenChat, selectedUserDM, onlineUsers, logoutHandler }) => {



    // const [messages, setMessages] = useState<{ [key: string]: MessageType[] }>(
	// 	DUMMY_MESSAGES
	// );
    const [showModal, setShowModal] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();

    const openModal = () => {
        console.log("hello world!");
        setShowModal(true);
    };

	// // const [users, setUsers] = useState<any>([]);
	// const [rooms, setRooms] = useState<any>([]);
	// const [selectedUserDM, setSelectedUserDM] = useState<ChatType>({
	// 	_id: "",
	// 	name: "",
	// });
	// const [isMemberOfRoom, setIsMemberOfRoom] = useState<boolean>(true);
	// const [choosenChat, setChoosenChat] = useState<ChatType>({
	// 	name: "Direect Messages",
	// 	_id: "",
	// });
	// const chatroomref = useRef(choosenChat);
	// const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

    // useEffect(() => {





    //     const fetchData = async () => {
    //         // const data = searchParams.
    //         const access  = searchParams.get("accessToken");
    //         // const {data} =  await axios.get(`${url}auth/register`);
    //         if (access)
    //         // console.log(access);
    //         axios.defaults.headers.common['Authorization'] = `Bearer ${access};`;
    //         else
    //             alert('access token error');
    //     }
    //     fetchData()
    //     .catch(console.error);





    //     // getAllRomsAndUsersApi()
    //     // .then((roomsUsersData) => {
    //     //     setRooms(roomsUsersData.rooms);
    //     //     setUsers(roomsUsersData.users);
    //     // })
    //     // .catch((err) => console.log(err));
    // });

		// socket = io(`localhost:3000`, {
		// 	// auth: {
		// 	// 	access_token: userInfo.access_token,
		// 	// },
		// })

		// socket.on("connect", () => {
		// 	// console.log("connected");
		// 	socket.emit("AddConnectedUser", { username: Users[0].login });

        // })
        
        // socket.on("connectedUsers", (onlineUsers) => {
        //     setOnlineUsers(onlineUsers);
		// });

    return (<>
    
	


			<div className = "bg-discord_secondSideBar flex flex-col min-win-max">
				<h2 className="flex text-white font-bold text-sm items-center justify-between border-b border-gray-800 p-4 hover:bg-emerald-400 cursor-pointer">Room Name  <ChevronDownIcon className="h-4 ml-2"/> </h2>
					<div className="text-[#8e9297] flex-grow overflow-y-scroll scrollbar-hide ">
						{/* <div className="flex items-center p-2 mb-2"> */}
                        {
                                users.map((user: UserType) => {
                                if (user.username === currentUser.username)

                                    return (
                                        <MemberCard
                                        onClick={() =>
                                            selectedUserDM({
                                                name: user.username,
                                                _id: user._id,
                                            })
                                        }
                                        coll = "BIOS"
                                        key={user._id}
                                        name={user.username}
                                        notifications={user.notifications}
                                        img={`${process.env.REACT_APP_AVATARS_URL}/api/avatar?name=${user.username}`}
                                        onlineUsers={onlineUsers}
                                    />
                                    );


                                    })
                            }
						{/* </div> */}
					<div className={`${show} server-default group`}>
						<PlusIcon className="text-emerald-400 h-7 w-12 group-hover:text-white" onClick={addUsers}/>
					</div>
					</div>
				</div>
    </>)

}

export default SideBar;