import { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { io, Socket } from "socket.io-client";
// import { getAllRomsAndUsersApi } from "../Services/room";
import { ChatType, IFormInput, Privacy, Role, userModel, UserType } from "../Types/types";
import { ChevronDownIcon, CogIcon, MicrophoneIcon, PhoneIcon, PlusIcon } from '@heroicons/react/outline';
// import ChannelIcon from '../ChannelIcon';
// import {IoCompassOutline } from 'react-icons/io5';
import MemberCard from './MemberCard';
// import AddChannel from '../AddChannel';

// export {} 
// import axios from 'axios';
// import {  Navigate, useNavigate, useSearchParams } from 'react-router-dom';
// import ChannelList from "./ChannelList";
import SideBarE, { BasicButtons } from "../EditProfil/SideBarE";
import { useNavigate } from "react-router-dom";
import { IoCloseCircleSharp } from "react-icons/io5";
import { SubmitHandler, useForm } from "react-hook-form";
import { socket, SocketContext } from "../Services/sockets";
import { Avatar, Badge, Box, Button, ButtonGroup, Flex, FormControl, FormLabel, Heading, Input, Select, Text, Toast, useToast } from "@chakra-ui/react";
import { changePassword, ChangePrivacy, deletePassword, GetFriends } from "../Services/user";
import { getPrivacy } from "../Services/room";

// import Context from './context'


// let socket : Socket;


// const logo = require('../../images/ponglogo.png');
// const channel1 = require('../../images/wolf.png');
// const channel2 = require('../../images/yoko.png');
// const channel3 = require('../../images/download.jpeg');
// const channel4 = require('../../images/1337.jpeg');
// const channel5 = require('../../images/tool.png');


// interface User {
// 	fname : string;
// 	lname : string;
// 	login :string;
// 	// channels:  Channels[];
// }
// const isAdmin = false // TODO to be feteched from localdata
// const show = isAdmin ? null : "invisible";

// const addUsers = () => {
//   const username = prompt("Enter username");
//   if (username) {
//     // TODO add user to room 
//   }
// }


const SideBar: React.FC<{

  choosenChat: ChatType;
  users: userModel[];
  currentUser: UserType;
  selectedUserDM: (user: ChatType) => void;
  onlineUsers: string[];
  logoutHandler: () => void;
  role: Role;
  isShown: boolean;
  usersState: boolean;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>,
  state: string,
  setUsersState : React.Dispatch<React.SetStateAction<boolean>>;

}> = ({ isShown, state, setIsShown, users, currentUser, usersState, setUsersState, choosenChat, selectedUserDM, onlineUsers, logoutHandler, role }) => {

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showSettingModal, setSettingModal] = useState(false);
  const [showSettingModal1, setSettingModal1] = useState(false);


  const openModal = () => {
    // console.log("hello world!");
    setShowModal(true);
    // Navigate("/EditInfo");

  };
  const openModal1 = () => {
    // console.log("hello world!");
    if (state === "ROOM")
    setSettingModal(true);
    // Navigate("/EditInfo");

  };
  const openModal2 = () => {
    // console.log("hello world!");
    setSettingModal1(true);
    // Navigate("/EditInfo");

  };
  useEffect(() => {
    console.log("users = .    ", users);
  }

    , [])
  const toast = useToast();
  const leaveGroup = () => {
    socket.emit("leaveGroup_client", { id_group : parseInt(choosenChat._id)} , (data: any) => {
      toast({
        title: `Channels update`,
        description: `You Left the Channel`,
        status: 'info',
        duration: 9000,
        isClosable: true,
      })
      console.log("aaaaa = ", data);
    })
    navigate("/channels");
  }
  return (<>




    <div className="bg-discord_secondSideBar flex flex-col min-win-max">
      <h2 onClick={openModal1} className="flex text-white font-bold text-sm items-center justify-between border-b border-gray-800 p-4 hover:bg-emerald-400 cursor-pointer">{choosenChat.username} {choosenChat.username === "" && "FRIENDS"} <CogIcon className="h-4 ml-2" />

        {
          (showSettingModal && state === "ROOM") && <ChannelSetting id={choosenChat._id} setShowModal={setSettingModal} />
        }
      </h2>
      <div className="text-[#8e9297] flex-grow overflow-y-scroll scrollbar-hide  ">
        {/* <div className="flex items-center p-2 mb-2"> */}
        {

          users.length > 0 && users?.map((user: userModel) => {
            if (user.name !== currentUser.username)

              return (
                <MemberCard
                  onClick={() =>
                    selectedUserDM({
                      username: user.name,
                      _id: user.id.toString(),
                    })
                  }
                  coll="BIOS"
                  key={user.id.toString()}
                  user={user}
                  role={role}
                  state={state}
                  setIsShown={setIsShown}
                  isShown={isShown}
                  choosenChat={choosenChat}
                  setUsersState={setUsersState}
                  usersState={usersState}
                // onlineUsers={onlineUsers}
                />
              );


          })
        }

        {
          (role === Role.ADMIN || role === Role.OWNER) && <div className={`server-default group`}>
            <PlusIcon className="text-emerald-400 h-7 w-12 group-hover:text-white" onClick={openModal2} />
            {
              showSettingModal1 && <AddUsers choosenChat={choosenChat} currentUser={currentUser} users={users} setShowModal={setSettingModal1} />
            }
          </div>
        }

      </div>
      { state === "ROOM" && <div className="flex flex-col flex-grow justify-end">
        <div className="mb-5 mx-auto">
          <BasicButtons text={"Leave Group"} onClick={() => { console.log(" i left"); leaveGroup() }} />
        </div>
      </div>}
      <div className="bg-[#292b2f] p-2 flex justify-between items-center space-x-8">
        <div className="flex items-center space-x-1">
          <img
            // src={user?.photoURL}
            src={currentUser.avatar}
            alt=""
            className="h-10 rounded-full"
            onClick={logoutHandler}
          />
          <h4 className="text-white text-xs font-medium">
            {currentUser.username}{" "}
            {/* <span className="text-[#b9bbbe] block">
                  #{currentUser.id.substring(0, 4)}
                </span> */}
          </h4>
        </div>

        <div className="text-gray-400 flex items-center">
          <div className="hover:bg-[#3A3C43] p-2 rounded-md">
            <MicrophoneIcon className="h-5 icon " />
          </div>
          <div className="hover:bg-[#3A3C43] p-2 rounded-md">
            <PhoneIcon className="h-5 icon" />
          </div>
          <div onClick={openModal} className="hover:bg-[#3A3C43] p-2 rounded-md">
            <CogIcon className="h-5 icon" />
            {showModal ? <SideBarE setShowModal={setShowModal} currentUser={currentUser} logoutHandler={logoutHandler} /> : null}
          </div>
        </div>
      </div>
    </div>
  </>)

}

export default SideBar;



export const ChannelSetting: React.FC<{
  id : string,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setShowModal, id }) => {

  
  const { register, handleSubmit, setError, formState: { errors } } = useForm<{oldPassword : string, newPassword : string} >();
  const [privacy, setPrivacy] = useState(Privacy.PROTECTED);
  
  const closeModal = () => {

    setShowModal(false);

};


      const toast = useToast();
  const submitForm1 : SubmitHandler<{oldPassword : string}> = (data) => {
    
    
    deletePassword(parseInt(id), data.oldPassword).then((res) => {
      toast({
        title: `Channel update`,
        description: `Password deleted`,
        status: 'info',
        duration: 9000,
        isClosable: true,
        })
    })
    closeModal();

  }

  useEffect(() => {
  getPrivacy(parseInt(id)).then((res) => {
    setPrivacy(res);
    console.log("res = ", res, " same", privacy)
  }
  )},[])
  const submitForm : SubmitHandler<{oldPassword : string, newPassword : string}> = (data) => {
    // let p : Privacy = (privacy === "Public") ? Privacy.PUBLIC : (privacy === "Protected") ? Privacy.PROTECTED : Privacy.PRIVATE;
    if (privacy === Privacy.PUBLIC || privacy === Privacy.PRIVATE)
    {
      ChangePrivacy(parseInt(id), data.newPassword ).then( (res) => {
        toast({
          title: `Channel update`,
          description: `Password set For the Channel`,
          status: 'info',
          duration: 9000,
          isClosable: true,
          })
          // closeModal();
        })
    // createRoomHandler(data.name,p , imageFile, data.password, data.description);
  }
  else
  {
    changePassword(parseInt(id), data.oldPassword, data.newPassword).then ((res)=> {
      toast({
        title: `Channel update`,
        description: `Password Updated `,
        status: 'info',
        duration: 9000,
        isClosable: true,
        })
        // closeModal();
      }).catch(err => {
        toast({
          title: `Channel update`,
          description: `Password failed to be updated`,
          status: 'error',
          duration: 9000,
          isClosable: true,
          })
      })
    }
  
  setShowModal(false);
  };
  
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
                            <h2 className="text-center text-xl font-bold text-white">Add Password </h2>
                            
                        </Flex>
                        {  ( privacy === Privacy.PUBLIC || privacy === Privacy.PRIVATE )?<>
                                <Flex flexDir={"column"} justifyContent={"space-between"} alignItems={"flex-start"} gap={5}>
                                    <label htmlFor="newUserName">New Password</label>
                                         <input className="text-black" {...register("newPassword")}  type="password"  />
                                </Flex>
                                <Flex px={"30px"}  alignItems={"center"} justifyItems={"center"} >
                                <Heading color={"red"} as='h5' size='sm' >Ps : Setting A Password will change the Privacy to Protected</Heading>
                                </Flex></> : <>
                                <Flex flexDir={"column"} justifyContent={"space-between"} alignItems={"flex-start"} gap={5}>
                                    <label htmlFor="newUserName">Old Password</label>
                                         <input className="text-black" {...register("oldPassword")}  type="password"  />
                                    <label htmlFor="newUserName">New Password</label>
                                    <Flex gap={"20px"} flexDir={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                         <input  className="w-[10rem] text-black" {...register("newPassword")}  type="password"  />
                                         <Text>Or </Text>
                                    <Button colorScheme={'red'}   onClick={handleSubmit(submitForm1)} > Delete Passoword </Button>
                                    </Flex>
                                </Flex>
                                <Flex px={"30px"}  alignItems={"center"} justifyItems={"center"} >
                                <Heading color={"red"} as='h5' size='sm' >Ps : Setting A Password will change the Privacy to Protected</Heading>
                                </Flex>
                                </>
                        }    
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
}


const a = (id : number, users : userModel[]) => {
    for (const user of users )
    {
      if (user.id === id)
        return false;
    }
    return true;
}
export const AddUsers: React.FC<{
  users: userModel[];
  choosenChat : ChatType;
  currentUser: UserType;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setShowModal, users, currentUser,  choosenChat}) => {


  const [notJoined, setNotJoined] = useState<any>();
  // const [s,setS] = useState(:)
  var boo : boolean = false;
  var test : UserType[] = [];

  useEffect(() => {
    GetFriends().then((res) => {
        res?.map((user : UserType) => {
          if (a(parseInt(user._id), users) === true)
            test.push(user);
        })
      } )

      console.log("res = ", test);
  },[])
  //   GetFriends().then((res) => {
  //     console.log("res = ", res);
  //     setNotJoined(res)
  //   })
  // },[]);
  const toast = useToast();
  
  const socket = useContext(SocketContext);

  const addUser =  (id : number) => {
    socket.emit("addUser_client",{id_user : id, id_groupe: parseInt(choosenChat._id)}, (data : any) => {
      toast({
				title: `New User added Succesfully`,
				description: `You added a New User`,
				status: 'success',
				duration: 9000,
				isClosable: true,
			  })
    })
  }

  return <>

    <div
      className=" absolute justify-center items-center  flex overflow-x-hidden  inset-0 z-50 outline-none focus:outline-none"
      onClick={() => { setShowModal(false); }}
    >
      <div className="flex items-center " onClick={e => { e.stopPropagation(); }} >
        <div className="w-[30rem] my-6 mx-auto h-[25rem]   " >
          <div className="border-0 rounded-lg lg:rounded-r-lg justify-between h-[30rem] shadow-lg  flex flex-col w-full bg-discord_serverBg outline-none focus:outline-none" onClick={e => { e.stopPropagation(); }}>
            <div className="sm:mx-auto w-full h-2/6 ">
              <button
                className="p-1 ml-auto bg-transparant  text-black  float-right text-3xl leading-none font-semibold"
                onClick={() => { setShowModal(false) }}
              >
                <IoCloseCircleSharp className="text-emerald-400" />
              </button>
              <h2 className="mt-6 text-center text-xl font-bold text-white">Modify Your Channel Setting </h2>
            </div>
            <Flex flexDir={"column"} justifyContent={"space-between"} alignItems={"center"}>
              {
               notJoined  && notJoined?.map((user : userModel) => (
                  <>
                    <Flex>
                      <Avatar src='https://bit.ly/sage-adebayo' />
                      <Box ml='3'>
                        <Text fontWeight='bold'>
                          {user.name}
                          <Badge ml='1' colorScheme='green'>
                            New
                          </Badge>
                        </Text>
                        <Text fontSize='sm'>{user.status} </Text>
                      </Box>
                      <Box> <Button onClick={() => addUser(user.id)}> Invite</Button></Box>
                    </Flex>
                  </>

               )
                ) 
              }
              {
                  
                  !notJoined && <><Text>All Your Friend Are with You </Text></>
                }
            </Flex>
          </div>
        </div>
      </div>
    </div>
    <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
  </>
}
