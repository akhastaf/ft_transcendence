import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { io, Socket } from "socket.io-client";
// import { getAllRomsAndUsersApi } from "../Services/room";
import {    ChatType, IFormInput, Privacy, Role, userModel, UserType } from "../Types/types";
import {ChevronDownIcon, CogIcon, MicrophoneIcon, PhoneIcon, PlusIcon } from '@heroicons/react/outline';
// import ChannelIcon from '../ChannelIcon';
// import {IoCompassOutline } from 'react-icons/io5';
import  MemberCard  from '../MemberCard';
// import AddChannel from '../AddChannel';

// export {} 
// import axios from 'axios';
// import {  Navigate, useNavigate, useSearchParams } from 'react-router-dom';
// import ChannelList from "./ChannelList";
import SideBarE, { BasicButtons } from "../EditProfil/SideBarE";
import { useNavigate } from "react-router-dom";
import { IoCloseCircleSharp } from "react-icons/io5";
import { SubmitHandler, useForm } from "react-hook-form";
import { socket } from "../Services/sockets";
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

const addUsers = () => {
	const username = prompt("Enter username");
	if (username)
	{
		// TODO add user to room 
	}
}


const SideBar: React.FC <{

    choosenChat: ChatType;
	users: userModel[];
	currentUser: UserType;
	selectedUserDM: (user: ChatType) => void;
	onlineUsers: string[];
	logoutHandler: () => void;
  role : Role;
  isShown : boolean
  setIsShown : React.Dispatch<React.SetStateAction<boolean>>,
  state : string,

}> =  ({ isShown, state, setIsShown , users, currentUser, choosenChat, selectedUserDM, onlineUsers, logoutHandler, role }) => {

	const Navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [showSettingModal, setSettingModal] = useState(false);
    

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
    useEffect(() =>
    {
      console.log("users = .    ", users);
    }
    
    ,[])
		// const redirect  = (e:any) => 
		// {
		// 		// Navigate('/EditInfo');
				// 
		// }
    const leaveGroup = () => {
      socket.emit("leaveGroup_client", parseInt(choosenChat._id),  (data : any) => {
        console.log("aaaaa = ", data)
      })
    }
    return (<>
    
	


			<div className = "bg-discord_secondSideBar flex flex-col min-win-max">
				<h2 onClick={openModal1} className="flex text-white font-bold text-sm items-center justify-between border-b border-gray-800 p-4 hover:bg-emerald-400 cursor-pointer">{choosenChat.username } {choosenChat.username === "" && "FRIENDS"} <CogIcon className="h-4 ml-2"/> 
        
        {
          showSettingModal && <ChannelSetting setShowModal={setSettingModal} />
        }
        </h2>
          <div className="text-[#8e9297] flex-grow overflow-y-scroll scrollbar-hide  ">
						{/* <div className="flex items-center p-2 mb-2"> */}
                        {
                          
                              users.length > 0 &&  users.map((user: userModel) => {
                                if (user.name !== currentUser.username)

                                    return (
                                        <MemberCard
                                        onClick={() =>
                                            selectedUserDM({
                                                username: user.name,
                                                _id: user.id.toString(),
                                            })
                                        }
                                        coll = "BIOS"
                                        key={user.id.toString()}
                                        user = {user}
                                        role={role}
                                        state = {state}
                                        setIsShown={setIsShown}
                                        isShown= {isShown}
                                        choosenChat={choosenChat}
                                        // onlineUsers={onlineUsers}
                                    />
                                    );


                                      })
                            }
						
					{
            (role === Role.ADMIN || role === Role.OWNER ) && <div className={`server-default group`}>
						<PlusIcon className="text-emerald-400 h-7 w-12 group-hover:text-white" onClick={addUsers}/>
					</div>
          }
					
					</div>
            <div className="flex flex-col flex-grow justify-end">
              <div className="mb-5 mx-auto">
              <BasicButtons text={"Leave Group"} onClick={() => {console.log(" i left"); leaveGroup()}} /> 
              </div>
            </div>
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
				{ showModal ?  <SideBarE setShowModal={setShowModal} currentUser={currentUser} logoutHandler={logoutHandler}/> : null }
              </div>
            </div>
          </div>
        </div>
    </>)

}

export default SideBar;



const ChannelSetting : React.FC <{

  setShowModal : React.Dispatch<React.SetStateAction<boolean>>
}> =  ({ setShowModal}) => {

  const submitForm = () => {

  }
  const { register, handleSubmit, setError, formState: { errors } } = useForm<IFormInput>();
  const [privacy, setPrivacy] = useState("Public");

  const onSubmit: SubmitHandler<IFormInput> = (data) =>
  {
     let p : Privacy = (privacy === "Public") ? Privacy.PUBLIC : (privacy === "Protected") ? Privacy.PROTECTED : Privacy.PRIVATE;

    
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
                                onClick={() => {setShowModal(false)}}
                            >
                                <IoCloseCircleSharp className="text-emerald-400" />
                            </button>
                            <h2 className="mt-6 text-center text-xl font-bold text-white">Modify Your Channel Setting </h2>
                        </div>
                        <div className="h-auto w-full overflow-y-scroll scrollbar-hide">
                            <form className="space-y-2 gap-y-3" onSubmit={submitForm}>
                                <div className="flex flex-col gap-3 ml-3 w-5/6">
                                     <label htmlFor="Privacy">Change Privacy</label>
                                      <input className="ml-3" id="username" name="username" type="text" required />
                                      <label htmlFor="Privacy">Change Privacy</label>
                                      <input className="ml-3" id="Phone" name="Phone" type="text" required placeholder="Enter your Phone" />
                                  
                                      {
                      privacy === "Protected"  ?
                        <div>
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                          <div className="mt-1">
                            {/* <input ref={passwordRef} id="password" name="password" type="password" required className="" /> */}
                            <input className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700" {...register("password", { required: {value : true, message: "Field must not be empty"}, minLength: {value : 3, message: "password must be more than 3 characters"}, maxLength: {value : 20, message: "password must be less than 20 characters"}})} />
                            {!errors.name && errors.password && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 " role="alert">
                                  <p className="font-bold">Error</p>
                                  <p>{errors.password.message}</p>
                              </div>}
                          </div>
                        </div> : null
                    }
                                      {/* <label htmlFor="Privacy">Change Privacy</label> */}
                                      {/* <input className="ml-3" id="Cemail" name="email" type="email" required placeholder={"Enter Your new Email"} />
                              <input className="ml-3" id="Cemail" name="Cemail" type="email" required placeholder={"Re-Enter Your new Email"} /> */}
                                  
                                    <label htmlFor="Password">Current Password</label>
                                    <input className="mb-3 ml-3" id="password" name="password" type="text" required />
                                </div>
                            </form>
                        </div>
                        <div className="h-1/6 w-full bg-discord_secondSideBar">
                            <div className="flex flex-row justify-end items-center mt-3">
                                <BasicButtons onClick={() => {setShowModal(false)}} text={"Cancel"} />
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
