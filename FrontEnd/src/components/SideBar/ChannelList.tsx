import React, {  useState } from "react";
import {  ChatType, Privacy, RoomType } from "../Types/types";
import AddChannel, { AddChannel1 } from '../AddChannel';
import {IoCompassOutline } from 'react-icons/io5';
import ChannelIcon from '../ChannelIcon';
import {PlusIcon } from '@heroicons/react/outline';
import { GiSecurityGate } from "react-icons/gi";



const logo = require('../../images/ponglogo.png');

const ChannelList: React.FC <{
	setChoosenChat : React.Dispatch<React.SetStateAction<ChatType>>,
	setSelectedUserDM: React.Dispatch<React.SetStateAction<ChatType>>,
    rooms: RoomType[];
	selectRoomHandler: (room: RoomType | string) => void;
	// dmNotifications: number;
	createRoomHandler: (roomName: string, private1: Privacy, password? : string ) => void;
	joinRoomHandler: () => void;

}> =  ({rooms, selectRoomHandler, createRoomHandler, setChoosenChat, setSelectedUserDM, joinRoomHandler }) => {
    
	
	const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        // console.log("hello world!");
        setShowModal(true);
    };
	const HomeSweetHome = () => {
		setChoosenChat({ username: "", _id: ""})
		setSelectedUserDM({username :"", _id: ""});
	}

	return(<>
	
	<div className="flex flex-col space-y-3 bg-discord_serverSideBar p-3 min-w-max">
        	<div className="server-default hover:bg-emerald-400">
				<img className="w-16" src={logo} alt="" 
				
				onClick={HomeSweetHome}
				/>
        	</div>
			<hr className="bg-angol_main border w-8 mx-auto" />
			<div className="flex flex-col items-center space-y-3">
			 {
				rooms.map((room: RoomType, index: number) => (
					// console.log(room.name);
					<ChannelIcon 
						room={room}
						onClick={selectRoomHandler}
						key={index}
					/>
				))
			 	// Users[0].channels.map(d => (<ChannelIcon image={d.icon} channelName={d.name} />))
			 
			 } 
			<div className="server-default hover:bg-discord_green group">
				<button onClick={openModal} ><PlusIcon className="text-emerald-400 h-7 w-12 group-hover:text-white"/></button>
				{showModal ? <AddChannel1 setShowModal={setShowModal} createRoomHandler={createRoomHandler} joinRoomHandler={joinRoomHandler} /> : null}
			</div>
			<div className="server-default hover:bg-discord_green group">
				<button><IoCompassOutline className="text-emerald-400 h-7 w-12 group-hover:text-white"/></button>
			</div>
			</div> 
        </div>
	
	</>) ;
}


export default ChannelList;