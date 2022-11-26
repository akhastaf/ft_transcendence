import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { AddFriend, BlockFriend, GetBlockedFriends, getBlockedList, GetFriends, getMyRole, setADmin, setStatus, unsetADmin, unsetStatus } from './Services/user';
import { ChatType, Role, Status, userModel, Userstatus, UserType } from './Types/types';




const MemberCard: React.FC<{

	user: userModel,

	coll: string
	onClick: (user: string) => void;
	role : Role,
	state : string,
	isShown : boolean
	setIsShown : React.Dispatch<React.SetStateAction<boolean>>
	choosenChat : ChatType

}> = ({isShown, user, onClick, coll, role, state, setIsShown, choosenChat }) => {



	useEffect(() => {

	}, [])

	const setadminAction = (id: number, status : string , time : string) => {
		let formData = new FormData();
		var currentDate = new Date();
		var time_in_minut = 1;
		currentDate.setTime(currentDate.getTime() + time_in_minut *60*1000);
		formData.append("id_user", id.toString());
		formData.append("id_group", choosenChat._id);
		formData.append("status", Status.MUTED)
		formData.append("until", time)
		console.log("i am in the muted fucntion")

		setStatus(id, parseInt(choosenChat._id), Status.MUTED, currentDate).then((res) => {
			console.log("he is banned/muted")
		})

	}
	const unsetadminAction = (id: number) => {
		let formData = new FormData();
		formData.append("id_user", id.toString());
		formData.append("id_group", choosenChat._id);
		unsetStatus(formData).then((res) => {
			console.log("he is unbanned/unmuted")
		})
	}

	const setAdmin = (id: number) => {
		let formData = new FormData();
		formData.append("id_user", id.toString());
		formData.append("id_group", choosenChat._id);

		setADmin(formData).then(() => console.log("new admin is set"))
	}
	const unsetAdmin = (id: number) => {
		let formData = new FormData();
		formData.append("id_user", id.toString());
		formData.append("id_group", choosenChat._id);
		unsetADmin(formData).then(() => console.log("admin is unset"))
	}
	



	const Memberstat = user.status === "online" ? "online text-green-400" : user.status === "offline" ? "offline text-red-500" : "in-game text-blue-500";
	const MemberColl = coll === "bios" ? "text-[#02cdd1]" : coll === "freax" ? "text-[#f5bc39]" : coll === "comodore" ? "text-[#235a16]" : coll === "Pandora" ? "text-[#b61282]" : "None";
	return (<App1 setAdmin ={setAdmin} unsetAdmin={unsetAdmin} setAdminAction={setadminAction} unsetAdminAction={unsetadminAction} isShown={isShown} role={role} user={user} coll={coll} onClick={onClick} setIsShown={setIsShown} state={state} />);
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
	unsetAdminAction : (id: number, status: string, time: string) => void
	setAdmin : (id : number) => void
	unsetAdmin : (id : number) => void

}> = ({ setAdmin, unsetAdmin, isShown, user, onClick, coll , role, setIsShown, state, setAdminAction, unsetAdminAction}) => {
	// Show or hide the custom context menu
	const [isShow, setIsShow] = useState(false);

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
	
	const [blocked, setBlocked] = useState<UserType[]>();
	const [friends, setFriends] = useState<UserType[]>();


	const checkIfFriend = (id : number) => {
		
		GetFriends().then((res)=> {
			setFriends(res)
		}).catch(err => console.log(err))

		const check = (friends && friends.filter(friend => parseInt(friend._id) === id) ? true : false)
		return check;
	}
	const checkIfBlocked = (id : number) => {
		getBlockedList().then((res)=> {
			setBlocked(res)
		}).catch(err => console.log(err))

		const check = (blocked && blocked.filter(blocked => parseInt(blocked._id) === id) ? true : false)
		return check;
	}
	// Do what you want when an option in the context menu is selected
	const [selectedValue, setSelectedValue] = useState<String>();
	const [isblocked, setIsBlocked] = useState<boolean>();
	const [isFriend, setIsFriend] = useState<boolean>();
	const [FBUpdate, setFBUpdate] = useState<boolean>(false);
	const doSomething = (selectedValue: String) => {
		setSelectedValue(selectedValue);
	};

	// const contextClass = {
	// 	success: "bg-blue-600",
	// 	error: "bg-red-600",
	// 	info: "bg-gray-600",
	// 	warning: "bg-orange-400",
	// 	default: "bg-indigo-600",
	// 	dark: "bg-white-600 font-gray-300",
	//   };

	const AddFriendf = (id : number) => {
		AddFriend(id).then((res) =>
		{
			console.log("res ====== ", res);
			<ToastContainer
			toastClassName={
			  " absolute flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
			}
			bodyClassName={() => "text-sm font-white font-med block p-3"}
			position="bottom-left"
			autoClose={3000}
		  />
			toast("Wow so easy!");
		}).catch(err => console.log(err))
		setIsShown(false)
		setFBUpdate(!FBUpdate)
	}


	const BlockFriend1 = (id :  number) => {
			BlockFriend(id).then((res) =>{
				toast.success("User Blocked", {
					position: toast.POSITION.TOP_CENTER,
				  });
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

	



	useEffect (() => {
		setIsFriend(checkIfFriend(user.id));
		setIsBlocked(checkIfBlocked(user.id));
	// checkIfBlocked();
	// checkIfFriend();
	}, [FBUpdate])

	const Memberstat = user.status === "online" ? "online text-green-400" : user.status === "offline" ? "offline text-red-500" : "in-game text-blue-500";
	const MemberColl = coll === "bios" ? "text-[#02cdd1]" : coll === "freax" ? "text-[#f5bc39]" : coll === "comodore" ? "text-[#235a16]" : coll === "Pandora" ? "text-[#b61282]" : "None";
	return (


		<>
			<div id="element" className={`flex items-center p-2 mb-2  hover:bg-[#5c5e62]`}
				onContextMenu={showContextMenu}
				onClick={hideContextMenu}>
				<div id="target" className="flex items-center p-2 gap-3"
					onClick={() => {
						onClick(user.name);
					}}>
					<div className="position-relative">
						{user.notifications && user.notifications > 0 ? (
							<div className="notification-bubble">
								{user.notifications}
							</div>
						) : null}
						<img
							width={32}
							height={32}
							className="rounded-circle"
							src={user.avatar}
							alt=""
						/>
					</div>
					<h4 className={` ${MemberColl} + font-semibold text-white important `} >{user.name}</h4>
				</div>

				<div className="ml-auto">
					<h6 className={`${Memberstat} +  text-xs `}>
						{user.status === "online" ? "Online" : user.status === "offline" ? "Offline" : "in-game"}
					</h6>
				</div>


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
						<MemberWork nameService={"Mute"} id={user.id}  AdminAction={setAdminAction}/>
						<MemberWork nameService={"Ban"} id={user.id} AdminAction={setAdminAction}/>
						<MemberWork nameService={"Kick"} id={user.id} function1={AddFriend}/>
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
	id : number
	function1? : (id : number) => void,
	function2? : (id : number) => boolean,
	AdminAction? : (id: number, status: string, time: string) => void

}> = ({nameService, function1, id, function2, AdminAction}) =>
{
	// var currentDate = new Date();
	// var time_in_minut = 20;
	// currentDate.setTime(currentDate.getTime() + time_in_minut *60*1000);
	const f = () => {
		console.log(id)
		if (function1)
			function1(id)
		if (function2)
			function2(id)
		if (AdminAction)
			AdminAction(id,nameService,"aaa")
	}

	return (<>
		<li>
			<button onClick={f} className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-[#5c5e62] hover:text-white focus:text-white focus:bg-gray-700"
			>{nameService}
			</button>
		</li>
	</>)
}

export default MemberCard