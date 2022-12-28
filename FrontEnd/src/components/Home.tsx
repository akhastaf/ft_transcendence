import {  useContext, useEffect, useState } from 'react';
import React from "react";
import { Dms, getAllRooms, getRoomUsers } from './Services/room'

import {  useNavigate, useParams, useSearchParams } from 'react-router-dom';
import SideBar from './SideBar/SideBar';
import ChannelList from './SideBar/ChannelList';
import { ChatType, MessageModal, Privacy, Role, roomModal, RoomType , Userstatus, UserType } from './Types/types';
import ChatHeader from './ChatSide/ChatHeader';
import { localService } from '../api/axios'
import MessagesSection from './ChatSide/MessagesSection';
import { getAUser, getCurrentUser, getMyRole } from './Services/user';
import MessageInput from './ChatSide/MessageInput';
import GameHome from './Game/GameHome';
import { SocketContext } from './Services/sockets'
import ChannelsDisplay from './pages/ChannelsDisplay';
import { getDmMessages, getRoomMessages } from './Services/messages';
import { toast } from 'react-toastify';

import { Flex, Box } from '@chakra-ui/react';
import Game from './Game/Game';




	

				
const Home: React.FC<{
	state: string
}> = ({ state }) => {
	
	const navigate = useNavigate();
	
	
	const [isShown, setIsShown] = useState(false);
	const socket = useContext(SocketContext);
	const [NewChannel, setNewChannel] = useState(false);

	
	const [messages1, setMessages1] = useState<MessageModal[]> (
	);
		const [myRole, setMyRole] = useState<Role>(Role.MEMBER);
		const [usersState, setUsersState] = useState<boolean>(false);
		// eslint-disable-next-line
						const [searchParams] = useSearchParams();



	const [users, setUsers] = useState<any>([]);
	// eslint-disable-next-line


	const [rooms, setRooms] = useState<any>([
		{
			id: "1",
	name: "room1",
	private: false,
	password: "1234567",
	createdBy: null,
	members: null,
	createdAt: new Date,
	// avatar: "aaaa",
	updatedAt: Date,
	messages: ["aaaaa"],
	notifications: 1,
		}
	]);
	const [userInfo, setUserInfo] = useState<UserType>({
		id: "",
		username: "wqqewqeq",
		createdAt: new Date(),
		updatedAt: new Date(),
		avatar: "",
		email: "",
		phoneNumber: null,
		friends: [],
		bloked: [],
		status: Userstatus.OFFLINE,
		twofa : false,
		win : 0, 
		loss : 0,
		level : 0,
		achievements : [],

	});



	useEffect(() => {
				
			getCurrentUser()
				.then((user) => {
					setUserInfo(user);
					// console.log("hello = ", userInfo);

				})
				.catch((err) => console.log(err));



		


		socket.on("joinGroup_sever", (data) => {
			console.log(data);
			getAllRooms()
				.then((res) => {
					// console.log("her spam");
					setRooms(res);
				})
				.catch(err => console.log(""));

		})

		}, [rooms, usersState]);

		// eslint-disable-next-line
		const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
		// eslint-disable-next-line
		const [wrongId, setWrongId] = useState<any>("");
	
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
		if (state === "HomeGAME" || state === "allChannels" || state === "GAME")
		{
			Dms().then((res) => {
				console.log("users =       ", res);

				setUsers(res)
				
			}).catch(err => console.log(err))
			// console.log("aaaaaaaaaaaaaa");
			setChoosenChat(() => ({username: "", _id: ""}))
			setSelectedUserDM(() => ({_id: "",
			username: "" }))
			setMyRole(Role.MEMBER);
		}
		if (state === "DM") {




			socket.emit("createDm_client", parseInt(id2), (data : any) => {
				console.log("aaaa");
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
					getRoomUsers(data.id)
						.then((res) => {
		
							setUsers(res);
						}
						).catch(err => console.log(err))
						;
			});
			setMyRole(Role.MEMBER)
		}

		if (state === "ROOM")
		{
			// eslint-disable-next-line
			getAllRooms().then((data) =>
			{
				data?.map((room : roomModal) => {
					if (room.id === parseInt(id2))
					{
						setChoosenChat(() => ({username : room.name, _id: id2}));
						getMyRole(parseInt(id2)).then((res) => {
						setMyRole(res)
						setWrongId("in");
						console.log("i am in");
						return ;
					})
					// .catch(err => console.log(err))
					console.log("ha qq", wrongId);
				}
			})
			console.log("ha ", wrongId);
			// if (wrongId !== "in")
			// 	navigate("/");
		})
		getRoomUsers(id2)
				.then((res) => {

					setUsers(res);
				}
				).catch(err => console.log(err))
				;
			getRoomMessages(parseInt(id2))
			.then ((res) => {
				let sorted = res?.sort((d1 : MessageModal, d2 : MessageModal) => (d1.date > d2.date ? 1 : d1.date < d2.date ? - 1 : 0));
				setMessages1(sorted);
			})
			.catch((err) => console.log(err));

		}


	},[ id2, state ,messageRef, users?.friends, usersState, ])




	// eslint-disable-next-line
	useEffect(() => {
	socket.on("joinGroup_server", (data) => {
			// console.log("server joined");
			setUsersState(!usersState);
	})
	socket.on("leaveGroup_server", (data) => {
			// console.log("server joined");
			setUsersState(!usersState);
	})
	socket.on("removeUser_server", (data) => {
			// console.log("server joined");
			setUsersState(!usersState);
	})
	socket.on("disconnect_server", (data) => {
		console.log("i am disco")
		setUsersState(!usersState);
	})
	socket.on("connection", (data) => {
		console.log("i am co")
		setUsersState(!usersState);
	})
	})



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
	},[state, NewChannel]);


	const createRoomHandler = (roomName: string, private1: Privacy, avatar: any, password?: string, description?: string) => {
		console.log("avatar =" ,avatar);

		let formData = new FormData();
    	formData.append('name', roomName);
    	formData.append('avatar', avatar);
    	formData.append('password', password? password : "");
    	formData.append('description', description ? description : "");
    	formData.append('privacy', private1);
		

		localService.post("/channels", 
		formData).then((room) => {
			// setRooms([...rooms, room.data])
			setNewChannel(!NewChannel);
		})
			.catch((err) =>
				console.log(err.response.data.message));
	};

	const logoutHandler = () => {
		socket.emit("disconnect_client");
	
		localStorage.removeItem("currentUser")
		localStorage.removeItem("accessToken")
		toast.success("You are Disconnected", {
			position: toast.POSITION.TOP_CENTER,
		  });
		navigate("/");

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
		if (choosenChat.username === "Direct Messages") {

				socket.emit("sendMessage_client", {
					content: content,
					receiver_id: dmId,
				});
		} else {
			socket.emit("sendMessage_client", {
				content: content,
				receiver_id : parseInt(choosenChat._id),
			});
		}
		setMessageRef({name : "name",message: "message"});

	};


	return (
		<>
		<div className='h-full w-full min-h-screen'>
			<div className="flex flex-row items-center h-full" onClick={() => {setIsShown(false)}}>
				<Box minH={"100vh"}>
				 <ChannelList
					setChoosenChat={setChoosenChat}
					setSelectedUserDM={setSelectedUserDM}
					rooms={rooms}
					selectRoomHandler={selectRoomHandler}
					// dmNotifications={getNumberOfDmNotifications()}
					createRoomHandler={createRoomHandler}
				// joinRoomHandler={joinRoomHandler}

				/>
				</Box>
				<Box minH={"100vh"}>
				 <SideBar
					choosenChat={choosenChat}
					users={users}
					currentUser={userInfo}
					onlineUsers={onlineUsers}
					selectedUserDM={selectedUserDMHandler}
					logoutHandler={logoutHandler}
					role={myRole}
					state={state}
					isShown = {isShown}
					setIsShown={setIsShown}
					usersState={usersState}
					setUsersState={setUsersState}
				/>
				</Box>
	

			{/* <div className="bg-[#36393f] flex-grow col-span-2 p-0 max-h-screen"> */}
					{/* <div className="flex flex-col h-screen min-h-fit full flex-grow"> */}
						<Flex  className="overflow-hidden bg-[#36393f] flex-grow h-screen p-0 max-h-screen" w={"100%"} flexDir={"column"} justifyContent={"center"}>
							
					
							<ChatHeader
							selectedUserDM={selectedUserDM}
							choosenChat={choosenChat}
							/>

							{state === "HomeGAME"  && <Flex mt={"60px"} h={"100vh"}>
							
								 
									<GameHome currentUser={userInfo} />
							
							</Flex>
							}
							{state === "GAME"  && <Flex mt={"60px"} h={"100vh"}>
							
								 
									<Game id={id2}/>
							
							</Flex>
							}
	
	
							{
								state === "DM" && 
								messages1 && (
									<MessagesSection
										messages={messages1}
										choosenChat={choosenChat}
								isMemberOfRoom={isMemberOfRoom}
								sendMessage={sendMessageHandler}
									/>
								)
							}
	
							{
								state === "ROOM" && 
								messages1 && (
									<MessagesSection
										messages={messages1}
										choosenChat={choosenChat}
								isMemberOfRoom={isMemberOfRoom}
								sendMessage={sendMessageHandler}
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
					</Flex>
					{/* </Flex> */}
					{/* </div>  */}
	
					{/* </div>  */}
			</div>
			</div>
		</>
	)
}

export default Home