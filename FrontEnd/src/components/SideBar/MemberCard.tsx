import React, { useContext, useEffect, useRef, useState } from 'react';
import { useToast, Menu, MenuItem, MenuButton, MenuList, Button, Avatar, RadioGroup, Radio, Box, ButtonGroup, MenuGroup, MenuDivider, Flex, Stack, Heading } from '@chakra-ui/react'
// import { toast, ToastContainer } from 'react-toastify';
import { AddFriend, BlockFriend, getBlockedList, GetFriends, setADmin, setStatus, unsetADmin, unsetStatus } from '../Services/user';
import { ChatType, Role, Status, userModel } from '../Types/types';
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverFooter,
	PopoverArrow,
	PopoverCloseButton,
  } from '@chakra-ui/react';
import Profile from './profile';
import { SocketContext } from '../Services/sockets';
import { useNavigate } from 'react-router-dom';


// export const [refreshVar, setRefreshVar] = useState(false);

export let refreshVar : boolean = false;

const MemberCard: React.FC<{

	user: userModel,

	coll: string
	onClick: (user: string) => void;
	role : Role,
	state : string,
	isShown : boolean
	setIsShown : React.Dispatch<React.SetStateAction<boolean>>
	setUsersState: React.Dispatch<React.SetStateAction<boolean>>
	choosenChat : ChatType;
	usersState : boolean;

}> = ({isShown, usersState, user, onClick, coll, role, state, setIsShown, choosenChat, setUsersState }) => {



	useEffect(() => {

	}, [])
	const toast = useToast();
	const setadminAction = (id: number, status : string , time : string) => {

		var currentDate = new Date();
		var time_in_minut = time;
		currentDate.setTime(currentDate.getTime() + parseInt(time_in_minut) *60*1000);
		// console.log("i am in the muted fucntion dasdasdasfasdkhhasb")
		// console.log(" i am here time = ddd", currentDate);
		const e : Status = (status === 'Ban') ? Status.BANNED : (status === 'Mute') ? Status.MUTED : Status.ACTIVE;
		setStatus(id, parseInt(choosenChat._id), e, currentDate).then((res) => {
			setUsersState(!usersState);
			toast({
				title: `user ${e}`,
				description: `You blocked user for ${time} min`,
				status: 'success',
				duration: 9000,
				isClosable: true,
			  })
		})

	}


	const unsetadminAction = (id: number) => {

		unsetStatus(id, parseInt(choosenChat._id)).then((res) => {
			setUsersState(!usersState);
			toast({
				title: `user active`,
				description: `User ${user.name} back to action`,
				status: 'success',
				duration: 9000,
				isClosable: true,
			  })
		})
	}
	
	const setAdmin = (id: number) => {
		setUsersState(!usersState);
	
		
		setADmin(id, parseInt(choosenChat._id)).then(() => console.log("new admin is set"))
		toast({
			title: `user update`,
			description: `User ${user.name} is an admin`,
			status: 'success',
			duration: 9000,
			isClosable: true,
		  })
	}
	const unsetAdmin = (id: number) => {
		setUsersState(!usersState);
		unsetADmin(id, parseInt(choosenChat._id)).then(() => console.log("admin is unset"))
		toast({
			title: `user update`,
			description: `User ${user.name} is no longer an admin`,
			status: 'success',
			duration: 9000,
			isClosable: true,
		  })
	}


	const socket = useContext(SocketContext);
	const kickMember = (id : number) => {
		socket.emit("removeUser_client", {id_user : id, id_group : parseInt(choosenChat._id)},
		(data : any) => {
			toast({
				title: `Member update`,
				description: `${data.name} ${data.message}`,
				status: 'success',
				duration: 9000,
				isClosable: true,
			  })
		})
	}
	const navigate = useNavigate()
	const inviteToGame = (id : number) => {
			socket.emit("inviteToGame_client", id, (date : any) => {
				toast({
					title: `invitation sent`,
					description: `user invited to game`,
					status: 'success',
					duration: 9000,
					isClosable: true,
				  })
			})
			navigate("/channels/Game/1");
	}
	



	const Memberstat = user.status === "online" ? "online text-green-400" : user.status === "offline" ? "offline text-red-500" : "in-game text-blue-500";
	const MemberColl = coll === "bios" ? "text-[#02cdd1]" : coll === "freax" ? "text-[#f5bc39]" : coll === "comodore" ? "text-[#235a16]" : coll === "Pandora" ? "text-[#b61282]" : "None";
	return (<App1 inviteToGame={inviteToGame} kickMember={kickMember} setAdmin ={setAdmin} unsetAdmin={unsetAdmin} setAdminAction={setadminAction} unsetAdminAction={unsetadminAction} isShown={isShown} role={role} user={user} coll={coll} onClick={onClick} setIsShown={setIsShown} state={state} />);
};



const App1: React.FC<{


	user: userModel,

	coll: string
	onClick: (user: string) => void;
	role : Role
	state : string,
	setIsShown : React.Dispatch<React.SetStateAction<boolean>>
	isShown : boolean
	setAdminAction : (id: number, status: string, time: string) => void
	unsetAdminAction : (id: number) => void
	setAdmin : (id : number) => void
	unsetAdmin : (id : number) => void
	kickMember : (id : number) => void,
	inviteToGame : (id : number) => void,

}> = ({ inviteToGame, setAdmin, unsetAdmin, isShown, user, onClick, coll , role, setIsShown, state, setAdminAction, unsetAdminAction, kickMember}) => {
	// Show or hide the custom context menu
	const [isShow, setIsShow] = useState(false);
	const toast = useToast();


	// The position of the custom context menu
	const [position, setPosition] = useState({ x: 0, y: 0 });

	// Show the custom context menu
	const showContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
		// Disable the default context menu
		event.preventDefault();

		setIsShown(false);
		const newPosition = {
			x: event.pageX,
			y: event.pageY,
		};

		setPosition(newPosition);
		setIsShown(true);

	};

	// Hide the custom context menu
	const hideContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
		setIsShown(false);
	};
	
	const [blocked, setBlocked] = useState<any[]>();
	const [friends, setFriends] = useState<any[]>();


	const checkIfFriend = (id : number) => {
		
		GetFriends().then((res)=> {
			setFriends(res)
		}).catch(err => console.log(err))
		// setIsFriend(checkIfFriend(user.id));
		// setIsBlocked(checkIfBlocked(user.id));
		// const check = ((friends && friends.filter(friend => parseInt(friend.id) === id)) ? true : false)
		friends?.map((friend) => {
			if (friend.id === id)
				setIsFriend(true);
		})
		// return check;
	}
	const checkIfBlocked = (id : number) => {
		getBlockedList().then((res)=> {
			setBlocked(res)
		}).catch(err => console.log(err))
		blocked?.map((block) => {
			if (block.id === id)
				setIsBlocked(true);
		})
	}

	// Do what you want when an option in the context menu is selected
	const [selectedValue, setSelectedValue] = useState<String>();
	const [isblocked, setIsBlocked] = useState<boolean>(false);
	const [isFriend, setIsFriend] = useState<boolean>(false);
	const [FBUpdate, setFBUpdate] = useState<boolean>(false);
	const [che, setChe] = useState<boolean>(false);
	
	const doSomething = (selectedValue: String) => {
		setSelectedValue(selectedValue);
	};

	const AddFriendf = (id : number) => {
		console.log("id of friend = ",id )
		AddFriend(id).then((res) =>
		{
			// console.log("res ====== ", res);
			toast({
				title: 'New Friend Unlocked',
				description: "You are Now Friends",
				status: 'success',
				duration: 9000,
				isClosable: true,
			  })
		
		}).catch(err => console.log(err))
		setIsShown(false)
		setFBUpdate(!FBUpdate)
	}


	const BlockFriend1 = (id :  number) => {
		console.log("id of blocked = ",id )
			BlockFriend(id).then((res) =>{

			})
			setIsShown(false)

			setFBUpdate(!FBUpdate)
	}

	
	// const mute = (id: number) => {
	// 	let formData = new FormData();
	// 	formData.append("id_user", id.toString());
	// 	formData.append("id_group", id)
	// }

	const ban = (id: number) => {
		
	}

	

	const [pro, setPro] = useState(false);

	useEffect (() => {
		checkIfFriend(user.id);
		checkIfBlocked(user.id);
	}, [FBUpdate])

	useEffect (() => {
		checkIfFriend(user.id);
		checkIfBlocked(user.id);
	})

	const Memberstat = user.status === "online" ? "text-green-400" : user.status === "offline" ? "text-red-500" : "text-blue-500";
	const MemberColl = coll === "bios" ? "text-[#02cdd1]" : coll === "freax" ? "text-[#f5bc39]" : coll === "comodore" ? "text-[#235a16]" : coll === "Pandora" ? "text-[#b61282]" : "None";
	return (


		<>
			<div id="element" className={`flex items-center p-2 mb-2  hover:bg-[#5c5e62]`} >
				<Menu>
				<MenuButton as={Button} bgColor={"transparent"} >
					<Flex flexDir={"row"} justifyContent={"space-between"}>
					<Avatar size={"sm"} src={user.avatar}  />
					<div id="target" className="flex items-center p-2 gap-3"
						onClick={() => {
							onClick(user.name);
						}}>
						<h4 className={` ${MemberColl} + font-semibold text-white important `} >{user.name}</h4>
					</div>

					<Heading as='h5' size={"xs"} className={`${Memberstat} +  text-xs `}>
						{user.status === "online" ? "Online" : user.status === "offline" ? "Offline" : "in-game"}
					</Heading>
					</Flex>
				</MenuButton>
				<MenuList>
					<MenuGroup title='Member'>
					{ !isFriend && <MenuItem><MemberWork nameService={"Send Friend Request"} id={user.id} function1={AddFriendf}/></MenuItem>}
					{ <MenuItem><MemberWork nameService={"Send Message"} id={user.id} user={user} message={onClick}/> </MenuItem>}
					<MenuItem ><MemberWork nameService={"Check Profil"} id={user.id} onClick={setPro} /> </MenuItem>
					<MenuItem><MemberWork nameService={"Invite to Game"} id={user.id} function1={inviteToGame}/> </MenuItem>
					{!isblocked && <MenuItem> <MemberWork nameService={"Block"} id={user.id} function1={BlockFriend1}/> </MenuItem>}
					</MenuGroup>
					{
						(user.role === Role.ADMIN) &&  <MenuItem> <MemberWork nameService={"i am fucking admin"} id={user.id} function1={kickMember}/></MenuItem>
					}
					{((role === Role.ADMIN && user.role === "member") || (role === Role.OWNER && user.role !== "owner")) && <>
					<MenuDivider />
					<MenuGroup title='Admin'>
					{
						(user.action === "active") ?  <MenuItem closeOnSelect={false}><MemberWork nameService={"Mute"} id={user.id} flag={1} AdminAction={setAdminAction}/></MenuItem>
						: (user.action === "muted")  ? <MenuItem><MemberWork nameService={"unMute"} id={user.id}  function1={unsetAdminAction}/></MenuItem> : null
					}
					{
						(user.action === "active") ?  <MenuItem closeOnSelect={false}><MemberWork nameService={"Ban"} id={user.id} flag={1} AdminAction={setAdminAction}/></MenuItem> 
						: (user.action === "banned") ?  <MenuItem><MemberWork nameService={"unBan"} id={user.id}  function1={unsetAdminAction}/></MenuItem> : null
					}
					<MenuItem ><MemberWork nameService={"Kick"} id={user.id} function1={kickMember}/></MenuItem>
					</MenuGroup></>
					}
					{(role === Role.OWNER && user.role !== "owner") && <>
					<MenuDivider />
					<MenuGroup title='Owner'>
					{user.role === "member" && <MenuItem><MemberWork nameService={"Set As Admin"} id={user.id} function1={setAdmin}/></MenuItem>}
					{user.role === "admin" && <MenuItem><MemberWork nameService={"unSet As Admin"} id={user.id} function1={unsetAdmin}/></MenuItem>}
					{/* <MenuItem><MemberWork nameService={"Set As Owner"} id={user.id} function1={AddFriend}/></MenuItem> */}
					</MenuGroup> </>
					}
				</MenuList>
				</Menu>
					{pro && <Profile user={user} closeModal={setPro} />} 
								


			</div>
			{isShown && (<>
				<div
					style={{ top: position.y, left: position.x }}
					className="custom-context-menu flex flex-col absolute bg-[#5c5e62] flex-end"
				>

					<ul
						className=" min-w-max absolute  text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1  m-0 bg-clip-padding border-none bg-black"
					>
						
						{!isFriend && <MemberWork nameService={"Send Friend Request"} id={user.id} function1={AddFriendf}/>}
						<MemberWork nameService={"Check Profil"} id={user.id} function1={AddFriend}/>
						<MemberWork nameService={"Invite to Game"} id={user.id} function1={AddFriend}/>
						
						<li><hr className="h-0 my-2 border border-solid border-t-0 border-gray-300 opacity-25" /></li>
						
						{!isblocked && <MemberWork nameService={"Block"} id={user.id} function1={BlockFriend1}/>}
						{(role === Role.ADMIN || role === Role.OWNER) &&
						<><li><hr className="h-0 my-2 border border-solid border-t-0 border-gray-300 opacity-25" />AdminPannel</li>
						<MemberWork nameService={"Mute"} id={user.id} flag={1} AdminAction={setAdminAction}/>
						<MemberWork nameService={"Ban"} id={user.id} flag={1} AdminAction={setAdminAction}/>
						<MemberWork nameService={"Kick"} id={user.id} flag={1} function1={unsetAdminAction}/>
						 {
							<MemberWork nameService={"Set As ADMIN"} id={user.id} function1={setAdmin}/>
						 }
						 </>
						}
						{(role === Role.OWNER) &&
						<>
						<li><hr className="h-0 my-2 border border-solid border-t-0 border-gray-300 opacity-25" />OwnerPannel</li>
						{<MemberWork nameService={"Set As Owner"} id={user.id} function1={AddFriend}/>}
						{<MemberWork nameService={"Unset Admin"} id={user.id} function1={unsetAdmin}/>}
						</>
						}
					</ul>
				</div>
			</>)}
		</>
	);
};


const MemberWork : React.FC <{
	nameService : string,
	id : number,
	message? : (user: string) => void;
	function1? : (id : number) => void,
	function2? : (id : number) => boolean,
	onClick? : React.Dispatch<React.SetStateAction<boolean>>
	flag? : number,
	user? : userModel,
	AdminAction? : (id: number, status: string, time: string) => void

}> = ({nameService, function1, id, function2, AdminAction, flag , user, message, onClick}) =>
{
	// var currentDate = new Date();
	// var time_in_minut = 20;
	// currentDate.setTime(currentDate.getTime() + time_in_minut *60*1000);
	const f = () => {
		console.log(id)
		if (message && user)
			message(user.name);
		if (function1)
			function1(id)
		if (function2)
			function2(id)
		if (onClick)
		{
			onClick(true)
			console.log("true")
		}
		
		// setRefreshVar(!refreshVar);
		refreshVar = !refreshVar;
	}


  const [showModal, setShowModal] = useState(false);
    const [showSettingModal, setSettingModal] = useState(false);
    


	return (<>
		{
			flag !== 1 ? <><li onClick={f}>
				{nameService}
				</li>  </>: <>
						<WalkthroughPopover id={id} AdminAction={AdminAction} nameService={nameService} />
				</> 
		}

	</>)
}



const WalkthroughPopover: React.FC <{
	
	nameService : any
	id : number,
	AdminAction? : (id: number, status: string, time: string) => void

}>  = ({nameService, AdminAction , id}) => {
	const initialFocusRef = useRef()
	const [value, setValue] = React.useState('5')

	const f = () => {


		if (AdminAction)
			AdminAction(id, nameService, value);
		refreshVar = !refreshVar;
	}
	return (
		<Popover
		
		placement='bottom'
		closeOnBlur={false}
		>
		<PopoverTrigger>
		<button className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-[#5c5e62] hover:text-white focus:text-white focus:bg-gray-700"
			>{nameService}
			</button>
		</PopoverTrigger>
		<PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
		  <PopoverHeader pt={4} fontWeight='bold' border='0'>
			{nameService} temporaly : 
 		  </PopoverHeader>
		  <PopoverArrow />
		  <PopoverCloseButton />
		  <PopoverBody>
		  <RadioGroup onChange={setValue} value={value}>
				<Stack direction='row'>
					<Radio value='5'>5min</Radio>
					<Radio value='15'>15min</Radio>
					<Radio value='60'>1h</Radio>
					<Radio value='1440'>1day</Radio>
				</Stack>
    </RadioGroup>
		  </PopoverBody>
		  <PopoverFooter
			border='0'
			display='flex'
			alignItems='center'
			justifyContent='space-between'
			pb={4}
			>
		
			<ButtonGroup size='sm'>
			  <Button onClick={f} colorScheme='blue'>
				{nameService}
			  </Button>
			</ButtonGroup>
		  </PopoverFooter>
		</PopoverContent>
	  </Popover>
	)
}

export default MemberCard