import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { io, Socket } from "socket.io-client";
// import { getAllRomsAndUsersApi } from "../Services/room";
import {    ChatType, userModel, UserType } from "../Types/types";
import {ChevronDownIcon, CogIcon, MicrophoneIcon, PhoneIcon, PlusIcon } from '@heroicons/react/outline';
// import ChannelIcon from '../ChannelIcon';
// import {IoCompassOutline } from 'react-icons/io5';
import  MemberCard  from '../MemberCard';
// import AddChannel from '../AddChannel';

// export {} 
// import axios from 'axios';
// import {  Navigate, useNavigate, useSearchParams } from 'react-router-dom';
// import ChannelList from "./ChannelList";
import SideBarE from "../EditProfil/SideBarE";


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
const isAdmin = false // TODO to be feteched from localdata
const show = isAdmin ? null : "invisible";

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

}> =  ({ users, currentUser, choosenChat, selectedUserDM, onlineUsers, logoutHandler }) => {

	// const Navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        // console.log("hello world!");
        setShowModal(true);
    };
    useEffect(() =>
    {
      // console.log(`users    = ${users}`);
    }
    
    ,[])
		// const redirect  = (e:any) => 
		// {
		// 		// Navigate('/EditInfo');
				// 
		// }
    return (<>
    
	


			<div className = "bg-discord_secondSideBar flex flex-col min-win-max">
				<h2 className="flex text-white font-bold text-sm items-center justify-between border-b border-gray-800 p-4 hover:bg-emerald-400 cursor-pointer">{choosenChat.name } {choosenChat.name === "" && "FRIENDS"} <ChevronDownIcon className="h-4 ml-2"/> </h2>
					<div className="text-[#8e9297] flex-grow overflow-y-scroll scrollbar-hide  ">
						{/* <div className="flex items-center p-2 mb-2"> */}
                        {
                                users.map((user: userModel) => {
                                if (user.name !== currentUser.username)

                                    return (
                                        <MemberCard
                                        onClick={() =>
                                            selectedUserDM({
                                                name: user.name,
                                                _id: user.id.toString(),
                                            })
                                        }
                                        coll = "BIOS"
                                        key={user.id.toString()}
                                        name={user.name}
                                        notifications={user.notifications}
                                        img={user.avatar}
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