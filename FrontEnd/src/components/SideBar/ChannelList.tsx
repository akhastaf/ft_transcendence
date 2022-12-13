import React, {  useState } from "react";
import {  ChatType, Privacy, RoomType } from "../Types/types";
import AddChannel from '../AddChannel';
import {IoCompassOutline } from 'react-icons/io5';
import ChannelIcon from '../ChannelIcon';
import {PlusIcon } from '@heroicons/react/outline';
import { GiSecurityGate } from "react-icons/gi";
import { useNavigate } from "react-router-dom";



const logo = require('../../images/ponglogo.png');

const ChannelList: React.FC <{
	setChoosenChat : React.Dispatch<React.SetStateAction<ChatType>>,
	setSelectedUserDM: React.Dispatch<React.SetStateAction<ChatType>>,
    rooms: RoomType[];
	selectRoomHandler: (room: RoomType | string) => void;
	// dmNotifications: number;
	createRoomHandler: (roomName: string, private1: Privacy,currentImage: any , password? : string  ) => void;
	// joinRoomHandler: () => void;

}> =  ({rooms, selectRoomHandler, createRoomHandler, setChoosenChat, setSelectedUserDM }) => {
    
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        // console.log("hello world!");
        setShowModal(true);
    };
	const HomeSweetHome = () => {
		navigate("/channels");
	}
	const redirect = () => {
		navigate("/channels/allChannels");
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
				
				rooms && rooms.map((room: RoomType, index: number) => (
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
				{showModal ? <AddChannel setShowModal={setShowModal} createRoomHandler={createRoomHandler}  /> : null}
			</div>
			<div className="server-default hover:bg-discord_green group">
				<button onClick={redirect} ><IoCompassOutline className="text-emerald-400 h-7 w-12 group-hover:text-white"/></button>
			</div>
			</div> 
        </div>
	
	</>) ;
}


export default ChannelList;