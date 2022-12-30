import {  useContext, useEffect, useRef, useState } from 'react';
import React from "react";
import { Dms, getAllRooms, getRoomUsers } from './Services/room'

import {  useNavigate, useParams, useSearchParams } from 'react-router-dom';
import SideBar from './SideBar/SideBar';
import ChannelList from './SideBar/ChannelList';
import { ChatType, MessageModal, Privacy, profileUpdate, Role, roomModal, RoomType , Userstatus, UserType } from './Types/types';
import ChatHeader from './ChatSide/ChatHeader';
import { localService } from '../api/axios'
import MessagesSection from './ChatSide/MessagesSection';
import { getAUser, getCurrentUser, getMyRole, updateInfo } from './Services/user';
import MessageInput from './ChatSide/MessageInput';
import GameHome from './Game/GameHome';
import { SocketContext } from './Services/sockets'
import ChannelsDisplay from './pages/ChannelsDisplay';
import { getDmMessages, getRoomMessages } from './Services/messages';


import { Flex, Box, ButtonGroup, Button, useToast } from '@chakra-ui/react';
import Game from './Game/Game';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { SubmitHandler, useForm } from 'react-hook-form';




	
const SettingModal: React.FC<{
    setState: React.Dispatch<React.SetStateAction<boolean>>;
    username: string 
    avatar : string
    tfa : boolean
    Subject: string
    usersState : boolean,
    setUsersState : React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ usersState,setUsersState,setState, tfa,username, Subject, avatar }) => {

    const toast = useToast();
	const navigate = useNavigate();
    // let up = useContext(updates);
    const { register, handleSubmit } = useForm<profileUpdate>();
    const closeModal = () => {

        setState(false);

    };
    const avatarRef = useRef<HTMLInputElement>(null);
    const [imageFile, setImageFile] = useState<any>(avatar);


   
    const upload = (event : any) =>
   {
        let image_as_files = event.target.files[0];
        setImageFile(image_as_files)
  	}
    const submitForm : SubmitHandler<profileUpdate> = (data) => {

        let formData = new FormData();
        const name = data?.name ? data.name : username;
        console.log("name from profile = ", name, "printi all data =", data);
    	formData.append('nickname', name);
    	formData.append('avatar', imageFile);
        
    	formData.append('twofa', tfa ? "true" : "false");
        console.log("formdata" , data?.name, "avatar ", imageFile);
        console.log("form data = ", formData);
        updateInfo(formData).then((data) => {
            toast({
				title: `Info update`,
				description: `Your Profile Info have been updated`,
				status: 'success',
				duration: 9000,
				isClosable: true,
			  })
              setUsersState(!usersState);
            })
			navigate("/channels");
            closeModal();
    }
    const m: string = (username) ? username : "";

    return <>
        <div
            className="justify-center items-center  flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => { closeModal(); }}
        >
            <div className="flex items-center " onClick={e => { e.stopPropagation(); }} >
                {/* <div className="w-[30rem] my-6 mx-auto h-[25rem]   " > */}
                    <Flex gap={12} onClick={e => { e.stopPropagation(); }} bg={"#36393f"} flexDir={"column"} justifyContent={"space-between"} w={"30rem"} alignItems={"center"} h={"25rem"}>
                    <form className="w-full h-full" onSubmit={handleSubmit(submitForm)}>
                        <Flex  h={"100%"} flexDir={"column"} justifyContent={"space-between"} alignItems={"center"} gap={8}>
                        <Flex flexDir={"column"} justifyContent={"space-between"} alignItems={"center"}>
                            <button
                                className="p-1 ml-auto bg-transparant  text-black  float-right text-3xl leading-none font-semibold"
                                onClick={closeModal}
                            >
                                <IoCloseCircleSharp className="text-emerald-400" />
                            </button>
                            <h2 className="text-center text-xl font-bold text-white">Modify Your {Subject} </h2>
                            <h4 className="text-center text-white">Enter Your New {Subject} and Password </h4>
                        </Flex>
                                <Flex flexDir={"column"} justifyContent={"space-between"} alignItems={"flex-start"} gap={5}>
                                    <label htmlFor="newUserName">{Subject}</label>
                                         <input {...register("name")}  type="text" placeholder={m} />
                                    <label htmlFor="Password">Change Avatar</label>
                                    <input onChange={upload} ref={avatarRef} type="file" id="img" name="img" accept="image/*" />
               

                                
                                </Flex>
                        <Flex w={"100%"} h={"15%"} flexDir={"row"} justifyContent={"flex-end"} alignItems={"center"} bg={"#2f3136"}>
                        <ButtonGroup pr={"3%"}>
                                    <Button colorScheme={'whatsapp'}   onClick={closeModal} > Cancel </Button>
                                    <Button  colorScheme={'whatsapp'} type="submit" > Sumbit </Button>
                                </ButtonGroup>
                        </Flex>
                        </Flex>
                        </form>
                    </Flex>

                {/* </div> */}
            </div>
        </div>
        <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
    </>
    // </>
}
				
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
	const newU = searchParams.get("new");
	const [showModal, setShowModal] = useState<boolean>(false);

	useEffect(()=> {
		if (newU && newU === "true")
			setShowModal(true);
	},[newU])

	
	const [rooms, setRooms] = useState<any>([
		{
			id: "1",
	name: "room1",
	private: false,
	password: "1234567",
	createdBy: null,
	members: null,
	createdAt: new Date(),
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
		nickname : "",
		phoneNumber: null,
		friends: [],
		bloked: [],
		status: Userstatus.OFFLINE,
		twofa : false,
		win : 0, 
		loss : 0,
		level : 0,
		achievments : [],

	});



	useEffect(() => {
				
			getCurrentUser()
				.then((user) => {
					setUserInfo(user);

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

		}, [rooms, usersState,socket]);

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
			// socket.off();
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
				socket.off("createDm_client");
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
						return 0;
					})
				}
				return 0 ;
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
				let sorted = res?.sort((d1 : MessageModal, d2 : MessageModal) => (d1.date > d2.date ? 1 : d1.date < d2.date ? - 1 : 0));
				setMessages1(sorted);
			})
			.catch((err) => console.log(err));

		}


	},[ id2, state ,messageRef, users?.friends, usersState, socket, wrongId])




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
		setUsersState(!usersState);
	})
	socket.on("connection", (data) => {

		setUsersState(!usersState);
	})
	socket.on("addUser_server", (data) => {
		setUsersState(!usersState);
	})
	socket.on("unsetAdmin_server", (data) => {
		setUsersState(!usersState);
	})
	socket.on("addAdmin_server", (data) => {
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
	const toast = useToast();
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
			.catch((err) => {
				toast({
					title: `Channels Update`,
					description: `Room Creation Error`,
					status: 'error',
					duration: 9000,
					isClosable: true,
				  })
				
				console.log(err.response);
				})
	};

	const logoutHandler = () => {
		socket.emit("disconnect_client");
	
		localStorage.removeItem("currentUser")
		localStorage.removeItem("accessToken")
		toast({
			title: `User Status`,
			description: `Disconnect . See you soon`,
			status: 'success',
			duration: 9000,
			isClosable: true,
		  })
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
			</div>
			</div>
			{showModal ? <SettingModal usersState={usersState} tfa={userInfo?.twofa} setUsersState={setUsersState} avatar={userInfo?.avatar} Subject="Username" username={userInfo?.username} setState={setShowModal} /> : null}
		</>
	)
}

export default Home