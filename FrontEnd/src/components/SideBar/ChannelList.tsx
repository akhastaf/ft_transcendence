import React, { useRef, useState } from "react";
import { ChatType, RoomType } from "../Types/types";
import AddChannel from '../AddChannel';
import {IoCompassOutline } from 'react-icons/io5';
import ChannelIcon from '../ChannelIcon';
import {ChevronDownIcon, PlusIcon } from '@heroicons/react/outline';



const logo = require('../../images/ponglogo.png');

const ChannelList: React.FC <{
    rooms: RoomType[];
	selectRoomHandler: (room: RoomType | string) => void;
	choosenChat: ChatType;
	dmNotifications: number;
	createRoomHandler: (roomName: string, private1: boolean, password : string | null ) => void;

}> =  ({rooms, selectRoomHandler, choosenChat, dmNotifications, createRoomHandler }) => {
    
	
	
	const roomInputRef = useRef<HTMLInputElement>(null);

	// const [showCreateRoomForm, setShowCreateRoomForm] = useState(false);

	const submitCreateRoomForm = (e: any) => {
		e.preventDefault();
		createRoomHandler(roomNameRef.current!.value, privateRef.current!.value, passwordRef.current!.value);
		// setShowCreateRoomForm(false);
	};

	// const showCreateRoomFormHandler = () => {
	// 	setShowCreateRoomForm(!showCreateRoomForm);
	// };
	
	const [showModal, setShowModal] = useState(false);
	// const [searchParams, setSearchParams] = useSearchParams();

    const openModal = () => {
        console.log("hello world!");
        setShowModal(true);
    };

	return(<>
	
	<div className="flex flex-col space-y-3 bg-discord_serverSideBar p-3 min-w-max">
        	<div className="server-default hover:bg-emerald-400">
				<img className="w-16" src={logo} alt="" />
        	</div>
			<hr className="bg-angol_main border w-8 mx-auto" />
			<div className="flex flex-col items-center space-y-3">
			 {

			 	// Users[0].channels.map(d => (<ChannelIcon image={d.icon} channelName={d.name} />))
			 
			 } 
			<div className="server-default hover:bg-discord_green group">
				<button onClick={openModal} ><PlusIcon className="text-emerald-400 h-7 w-12 group-hover:text-white"/></button>
				{showModal ? <AddChannel setShowModal={setShowModal} formSubmit={submitCreateRoomForm}  /> : null}
			</div>
			<div className="server-default hover:bg-discord_green group">
				<button><IoCompassOutline className="text-emerald-400 h-7 w-12 group-hover:text-white"/></button>
			</div>
			</div> 
        </div>
	
	</>) ;
}


export default ChannelList;