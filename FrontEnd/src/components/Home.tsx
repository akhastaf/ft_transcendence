// import {ChevronDownIcon, PlusIcon } from '@heroicons/react/outline';
import { useCallback, useEffect, useRef, useState } from 'react';
// import ChannelIcon from './ChannelIcon';
// import {IoCompassOutline } from 'react-icons/io5';
// import  MemberCard  from './MemberCard';
// import AddChannel from './AddChannel';
import { AllRooms, getAllRooms, getRoomUsers } from './Services/room'
import axios from 'axios';
import { RouteMatch, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import SideBar from './SideBar/SideBar';
import ChannelList from './SideBar/ChannelList';
import { ChatType, MessageModal, MessageType, Privacy, Role, roomModal, RoomType, userModel, Userstatus, UserType } from './Types/types';
import { io, Socket } from "socket.io-client";
import ChatHeader from './ChatSide/ChatHeader';
import { localService } from '../api/axios'
import MessagesSection from './ChatSide/MessagesSection';
import { getAUser, getCurrentUser, getMyRole } from './Services/user';
import MessageInput from './ChatSide/MessageInput';
import GameHome from './Game/GameHome';
import { socket } from './Services/sockets'
import { SiEmirates } from 'react-icons/si';
import ChannelsDisplay from './pages/ChannelsDisplay';
import { getDmMessages, getRoomMessages } from './Services/messages';


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

const DUMMY_MESSAGES:  MessageModal[]  = [
	// botRoom: [
		{
			userId: 1,
			userName: "Med",
			currentUser: true,
			message: "We are so happy to see you here",
			date: new Date(),
			avatar: "nvm",
			roomId : "1",
		},
		{
			userId: 1,
			userName: "Med",
			currentUser: true,
			message: "We are so happy to see you here",
			date: new Date(),
			avatar: "nvm",
			roomId : "1",
		},
		{
			userId: 1,
			userName: "Med",
			currentUser: true,
			message: "We are so happy to see you here",
			date: new Date(),
			avatar: "nvm",
			roomId : "1",
		},
	// ],
	]

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



const createNewMsg = (
	content: string,
	roomId: string,
	user: UserType
): MessageModal => {

	return {
		roomId: roomId,
		avatar: user.avatar,
		userName : user.username,
		message: content,
		date : new Date(),
		currentUser : true,
		userId : parseInt(user._id),
	};
};


const Home: React.FC<{
	state: string
}> = ({ state }) => {

	const navigate = useNavigate();


	

	const [messages1, setMessages1] = useState<MessageModal[]> (
		DUMMY_MESSAGES
	);
	const [myRole, setMyRole] = useState<Role>(Role.MEMBER);
	// eslint-disable-next-line
	const [searchParams] = useSearchParams();



	const [users, setUsers] = useState<any>([]);
	// eslint-disable-next-line
	const [allRooms, setAllRooms] = useState<any>([]);

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
		socket.on("connection", (data) => {

			getCurrentUser(data)
				.then((user) => {
					setUserInfo(user);
					console.log(user);
				})
				.catch((err) => console.log(err));

		})


		socket.on("joinGroup_sever", (data) => {

			getAllRooms()
				.then((res) => {
					setRooms(res);
				})
				.catch(err => console.log(err));

		})

		}, []);

		// eslint-disable-next-line
		const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
		// eslint-disable-next-line
		const [friends, setFriends] = useState<string[]>([]);
	
	
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
	const {id} = useParams<{id: string}>();
	const id2 : string = id ? id : "";
	const [dmId, setDmId] = useState<number>(-1);
	const [messageRef, setMessageRef] = useState<{name : string, message : string}>({ name: "", message: ""});

	useEffect(() => {

		socket.on("sendMessage_server", (data) =>{
			setMessageRef(data);
			socket.off();
		})
		if (state === "")
		{
			setUsers(userInfo.friends);
		}
		if (state === "DM") {
			console.log(`user id = ${id2}`)
			socket.emit("createDm_client", parseInt(id2), (data : any) => {
				setDmId(data.id);
				setChoosenChat(() => ({ username: "Direct Messages", _id: id2}));
				
				getAUser(parseInt(id2)).then((data) =>
				{
					setSelectedUserDM(data);
				})
				getDmMessages(data.id)
					.then((res : MessageModal[]) => {
						let sorted = res.sort((d1 : MessageModal, d2 : MessageModal) => (d1.date > d2.date ? 1 : d1.date < d2.date ? - 1 : 0));
						setMessages1(sorted);
					})
					.catch((err) => console.log(err));
			});
		}

		if (state == "ROOM")
		{
			
			getAllRooms().then((data) =>
			{
				data.map((room : roomModal) => {
					if (room.id === parseInt(id2))
					{
						setChoosenChat(() => ({username : room.name, _id: id2}));
						getMyRole(parseInt(id2)).then((res) => {
						setMyRole(res)
						})
						.catch(err => console.log(err))
					}
				})
			})
			getRoomUsers(id2)
				.then((res) => {

					setUsers(res);
				}
				).catch(err => console.log(err))
				;
			getRoomMessages(parseInt(id2))
			.then ((res) => {
				let sorted = res.sort((d1 : MessageModal, d2 : MessageModal) => (d1.date > d2.date ? 1 : d1.date < d2.date ? - 1 : 0));
				setMessages1(sorted);
			})
			.catch((err) => console.log(err));
		}


	},[ id2, state ,messageRef])




	// eslint-disable-next-line




	const selectedUserDMHandler = (user: ChatType) => {

		setSelectedUserDM(user);
		navigate("/channels/DM/" + user._id);
	};



	const selectRoomHandler = (room: RoomType | string) => {
		if (typeof room === "string") {
			setChoosenChat(() => ({ username: room, _id: "" }));
			setSelectedUserDM({ _id: "", username: "Direct Messages" });
		} else {
			navigate("/channels/ROOM/" + room.id);
		}
	}

	// eslint-disable-next-line 
	useEffect(() => {
		getAllRooms()
			.then((room) => {
				setRooms(room);
			})
			.catch((err) => console.log(err));

		// ! getAllFriends aka users  (in bac)
	},[rooms]);


	const createRoomHandler = (roomName: string, private1: Privacy, avatar: any, password?: string, description?: string) => {
		console.log(avatar);
		localService.post("/channels", {
			name: roomName,
			avatar: avatar,
			password: password,
			description: description,
			privacy: private1,
		}).then((room) => {
			setRooms([...rooms, room.data])
		})
			.catch((err) =>
				console.log(err.response.data.message));
	};

	const logoutHandler = () => {
		navigate("/");
		socket.emit("disconnect_client");
		// ! probably need to contact socket with message 'logout' then forward to first page

	}

	const joinRoomHandler = (room: roomModal, password?: string) => {
		socket.emit("joinGroup_client", {
			id_group: room.id,
			password: password,
		});
	};

	//! ********* Message       Hnadling        */




	const sendMessageHandler = async (content: string) => {
		let a : boolean  = false;
		if (choosenChat.username === "Direct Messages") {

				socket.emit("sendMessage_client", {
					content: content,
					receiver_id: dmId,
				});
		} else {
			a = true;
			socket.emit("sendMessage_client", {
				content: content,
				receiver_id : parseInt(choosenChat._id),
			});
		}
		setMessageRef({name : "name",message: "message"});

	};


	return (
		<>
		<div className='h-full w-full'>
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
				 <SideBar
					choosenChat={choosenChat}
					users={users}
					currentUser={userInfo}
					onlineUsers={onlineUsers}
					selectedUserDM={selectedUserDMHandler}
					logoutHandler={logoutHandler}
					role={myRole}

				/>


				   <div className="bg-[#36393f] flex-grow col-span-2 p-0">
					<div className="flex flex-col h-screen">
						<ChatHeader
							selectedUserDM={selectedUserDM}
							choosenChat={choosenChat}
							/>

	
							{
								state === "HomeGAME"  && (
									<GameHome currentUser={userInfo} />
								)
							}
	
	
							{
								state === "DM" && 
								messages1 && (
									<MessagesSection
										messages={messages1}
									/>
								)
							}
	
							{
								state === "ROOM" && 
								messages1 && (
									<MessagesSection
										messages={messages1}
									/>
								)}

						{
							state === "allChannels" && <ChannelsDisplay joinRoomHandler={joinRoomHandler} />

						}
						{
							(state === "DM" || state === "ROOM") &&  <MessageInput
								choosenChat={choosenChat}
								isMemberOfRoom={isMemberOfRoom}
								sendMessage={sendMessageHandler}
							/>
						}
					</div> 
	
					</div> 
			</div>
			</div>
		</>
	)
}

export default Home/////////////////////////////////////////////////////////////////////////////////////////////