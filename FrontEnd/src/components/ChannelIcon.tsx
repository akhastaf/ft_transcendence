import React, { useEffect } from 'react';
import { Tooltip } from "@material-tailwind/react";
import { Avatar } from "@material-tailwind/react";

import { useDispatch } from 'react-redux';
import { setChannelInfo } from '../features/channelSlice';
import {  RoomType } from './Types/types';



const ChannelIcon: React.FC<{
	room: RoomType;
	onClick: (room: RoomType) => void;
}> = ({ room, onClick }) => {


  return (
    <>
     <div onClick={onClick.bind(null, room)}>
    <Tooltip interactive className="inline-block absolute z-10 py-2 px-3 text-sm font-medium text-white bg-emerald-400 rounded-lg shadow-sm opacity-0 tooltip dark:bg-emerald-400"  content={room.name} placement="right" >
      {/* {dmNotifications > 0 && (
		  				<div className="notification-bubble">
		  					{dmNotifications}
		  				</div> 
		  			)} */}
      <Avatar size="md"
        onClick={onClick.bind(null, room)} 
        variant="circular"
      	src={room.avatar}
      	alt=""
		className=" bg-white bg-opacity-25 cursor-pointer rounded-3xl hover:rounded-md transition-all duration-100 ease-out  "
		/>
    </Tooltip>
  </div>
    </>
  )
}

export default ChannelIcon
