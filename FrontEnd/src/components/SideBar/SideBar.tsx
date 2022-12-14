import { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { io, Socket } from "socket.io-client";
// import { getAllRomsAndUsersApi } from "../Services/room";
import { ChatType, IFormInput, Privacy, Role, userModel, UserType } from "../Types/types";
import { ChevronDownIcon, CogIcon, MicrophoneIcon, PhoneIcon, PlusIcon } from '@heroicons/react/outline';
// import ChannelIcon from '../ChannelIcon';
// import {IoCompassOutline } from 'react-icons/io5';
import MemberCard from '../MemberCard';
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
import { Avatar, Badge, Box, Button, Flex, FormControl, FormLabel, Select, Text, Toast, useToast } from "@chakra-ui/react";
import { GetFriends } from "../Services/user";

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
  isShown: boolean
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>,
  state: string,

}> = ({ isShown, state, setIsShown, users, currentUser, choosenChat, selectedUserDM, onlineUsers, logoutHandler, role }) => {

  const Navigate = useNavigate();

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
  // const redirect  = (e:any) => 
  // {
  // 		// Navigate('/EditInfo');
  // 
  // }
  const leaveGroup = () => {
    socket.emit("leaveGroup_client", parseInt(choosenChat._id), (data: any) => {
      console.log("aaaaa = ", data);
    })
  }
  return (<>




    <div className="bg-discord_secondSideBar flex flex-col min-win-max">
      <h2 onClick={openModal1} className="flex text-white font-bold text-sm items-center justify-between border-b border-gray-800 p-4 hover:bg-emerald-400 cursor-pointer">{choosenChat.username} {choosenChat.username === "" && "FRIENDS"} <CogIcon className="h-4 ml-2" />

        {
          showSettingModal && <ChannelSetting setShowModal={setSettingModal} />
        }
      </h2>
      <div className="text-[#8e9297] flex-grow overflow-y-scroll scrollbar-hide  ">
        {/* <div className="flex items-center p-2 mb-2"> */}
        {

          users.length > 0 && users.map((user: userModel) => {
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

  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setShowModal }) => {

  const submitForm = () => {

  }
  const { register, handleSubmit, setError, formState: { errors } } = useForm<IFormInput>();
  const [privacy, setPrivacy] = useState("Public");

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    let p: Privacy = (privacy === "Public") ? Privacy.PUBLIC : (privacy === "Protected") ? Privacy.PROTECTED : Privacy.PRIVATE;


    // createRoomHandler(data.name,p , imageFile, data.password, data.description);
    setShowModal(false);

  };
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
            <div className="h-auto w-full overflow-y-scroll scrollbar-hide">
              <Flex p={"2%"} flexDir={"column"} justifyContent={"space-between"} alignItems={"center"}>
                <FormControl>
                  <FormLabel>Pravicy</FormLabel>
                  <Select placeholder='Select Pravicy'>
                    <option>Public</option>
                    <option>Protected</option>
                    <option>Private</option>
                  </Select>
                </FormControl>
              </Flex>
            </div>
            <div className="h-1/6 w-full bg-discord_secondSideBar">
              <div className="flex flex-row justify-end items-center mt-3">
                <BasicButtons onClick={() => { setShowModal(false) }} text={"Cancel"} />
                <BasicButtons onClick={submitForm} text={"Submit"} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
  </>
}
export const AddUsers: React.FC<{
  users: userModel[];
  choosenChat : ChatType;
  currentUser: UserType;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setShowModal, users, currentUser,  choosenChat}) => {


  const [notJoined, setNotJoined] = useState<any>();

  useEffect(() => {
    GetFriends().then((res) => {
      setNotJoined(res.filter((user: userModel) => {
        users.map((user1) => {
          if (user.id === user1.id)
            return false;
        })
      }))
    })
  });
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
               notJoined && notJoined.map((user : userModel) => {
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

                })
              }
            </Flex>
          </div>
        </div>
      </div>
    </div>
    <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
  </>
}
