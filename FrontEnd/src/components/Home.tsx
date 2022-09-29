import {ChevronDownIcon, PlusIcon } from '@heroicons/react/outline';
import React , {useEffect, useState} from 'react';
import ChannelIcon from './ChannelIcon';
import {IoCompassOutline } from 'react-icons/io5';
import  MemberCard  from './MemberCard';
import AddChannel from './AddChannel';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
// import {access} from "../api/access"



// impor
const logo = require('../images/ponglogo.png');
const channel1 = require('../images/wolf.png');
const channel2 = require('../images/yoko.png');
const channel3 = require('../images/download.jpeg');
const channel4 = require('../images/1337.jpeg');
const channel5 = require('../images/tool.png');


interface User {
	fname : string;
	lname : string;
	login :string;
	channels:  Channels[];
}

interface Channels {
	name : string;
	icon : any;
	// Users: User;
}

const channels1 : Channels[] = [
	{
		name :"channel11",
		icon : channel5 ,
		// Users : Userss,
	}, 
	{
		name : "channel12",
		icon : channel4,
	},  
	{
		name :"channel13",
		icon : channel3,
	},  
	{
		name :"channel14",
		icon : channel2,
	}, 
	{
		name :"channel15",
		icon : channel1,
	}, 
];
const channels2 : Channels [] = [
	{
		name :"channel21",
		icon : channel2,
	}, 
	{
		name : "channel22",
		icon : channel2,
	},  
	{
		name :"channel23",
		icon : channel3,
	},  
	{
		name :"channel24",
		icon : channel4,
	}, 
	{
		name :"channel25",
		icon : channel5,
	}, 
];

const Users : User[] = [
	{
	fname : "med",
	lname : "kh",
	login : "mokhames",
	channels : channels1,

	},
	{
	fname : "ihssane",
	lname : "ouardi",
	login : "iouardi",
	channels : channels2,

	},

];



const isAdmin = false // TODO to be feteched from localdata
const show = isAdmin ? null : "invisible";

const addUsers = () => {
	const username = prompt("Enter username");
	if (username)
	{
		// TODO add user to room 
	}
}



function Home() {

	
	const [showModal, setShowModal] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	// const [flag, setFlag] = useState(false);
	// let i: number = 0;
	// console.log('====================================');
	const access  = searchParams.get("accessToken");
	// console.log("Name = " + access);
	// JSON.parse(name);
	// console.log('====================================');
	// const [users, getUsers] = useState("");
	const url = 'http://localhost:3000/';
	


	const getAllUsers = () => {
		axios.get(`${url}auth/login/42/return`)
		.then ((response) => {
			const AllUsers = response.data;
			console.log(AllUsers);
		}).catch (err => console.error(err));
	}
	
	const openModal = () => {
		console.log("hello world!");
		setShowModal(true);
	}


	useEffect(() => {
		// const config= { 

		// 	headers: {
		// 		Authorization: 
		// 	}
		// }
		// if (flag === false)
		// {
		// 	searchParams.delete("accessToken");
		// 	setSearchParams(searchParams);
		// 	setFlag(true);
		// }
		// console.log('====================================');
		// console.log(access);
		// console.log('====================================');
		getAllUsers();
	},[])

  return ( 
    <>
    <div className="flex h-screen">
    	<div className="flex flex-col space-y-3 bg-discord_serverSideBar p-3 min-w-max">
        	<div className="server-default hover:bg-emerald-400">
				<img className="w-16" src={logo} alt="" />
        	</div>
			<hr className="bg-angol_main border w-8 mx-auto" />
			<div className="flex flex-col items-center space-y-3">
			 {

			 	Users[0].channels.map(d => (<ChannelIcon image={d.icon} channelName={d.name}/>))
			 
			 } 
			{/* <ChannelIcon image={channel2} channelName="channel 1"/>
			<ChannelIcon image={channel1} channelName="channel 2"/>
			<ChannelIcon image={channel2} channelName="channel 3"/>
			<ChannelIcon image={channel1} channelName="channel 4"/>
			<ChannelIcon image={channel3} channelName="channel 5"/>
			<ChannelIcon image={channel4} channelName="channel 6"/>
			<ChannelIcon image={channel5} channelName="channel 7"/> */}
			<div className="server-default hover:bg-discord_green group">
				<button onClick={openModal} ><PlusIcon className="text-emerald-400 h-7 w-12 group-hover:text-white"/></button>
				{showModal ? <AddChannel  setShowModal={setShowModal} /> : null}
			</div>
			<div className="server-default hover:bg-discord_green group">
				<button><IoCompassOutline className="text-emerald-400 h-7 w-12 group-hover:text-white"/></button>
			</div>
			</div>
        </div>


			<div className = "bg-discord_secondSideBar flex flex-col min-win-max">
				<h2 className="flex text-white font-bold text-sm items-center justify-between border-b border-gray-800 p-4 hover:bg-emerald-400 cursor-pointer">Room Name  <ChevronDownIcon className="h-4 ml-2"/> </h2>
					<div className="text-[#8e9297] flex-grow overflow-y-scroll scrollbar-hide ">
						{/* <div className="flex items-center p-2 mb-2"> */}
							<MemberCard coll="bios" img={channel1} name={"Trevor"} isMemberOnline="in-game"/>
							<MemberCard coll="freax" img={channel1} name={"Boo"} isMemberOnline="online"/>
							<MemberCard coll="comodore" img={channel1} name={"User3"} isMemberOnline="offline"/>
							<MemberCard coll="Pandora" img={channel1} name={"User4"} isMemberOnline="offline"/>
						{/* </div> */}
					<div className={`${show} server-default group`}>
						<PlusIcon className="text-emerald-400 h-7 w-12 group-hover:text-white" onClick={addUsers}/>
					</div>
					</div>
				</div>
    </div>
    </>
  )
}

export default Home