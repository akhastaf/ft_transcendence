import React from 'react';
import { ChatType, userModel, UserType } from './Types/types';





const MemberCard : React.FC<{
    //choosenChat: ChatType,
   
	
	
    user : userModel,
    // key: string
    coll : string
	onClick: (user: string) => void;
	// onlineUsers: string[];
}> =  ({ user, onClick, coll  }) => {

    // const isOnline =  onlineUsers.includes(name) ? "online" : "offline";
    const Memberstat = user.status === "online" ? "online text-green-400" : user.status === "offline" ? "offline text-red-500" :  "in-game text-blue-500" ;
    const MemberColl = coll === "bios" ? "text-[#02cdd1]" : coll === "freax" ? "text-[#f5bc39]" : coll === "comodore" ? "text-[#235a16]" :  coll === "Pandora" ? "text-[#b61282]" : "None";
    return (

        <div  className={ `flex items-center p-2 mb-2  hover:bg-[#5c5e62]`}>
                            
                            

                            
                            <div className="flex items-center p-2 gap-3" 
                            onClick={() => {
                                onClick(user.name);
                            }}
                            >
                                {/* to work on css bellow */}
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
                            <h6 className={`${ Memberstat} +  text-xs `}>
                                {user.status === "online" ? "Online" :  user.status === "offline" ? "Offline" : "in-game"}
                            </h6>
						</div>
                </div>

    );
}

// function MemberCard(props: any) {
//     const Memberstat = props.isMemberOnline === "online" ? "online text-green-400" : props.isMemberOnline === "offline" ? "offline text-red-500" : props.isMemberOnline === "in-game" ? "in-game text-blue-500" : "None";
//     const MemberColl = props.coll === "bios" ? "text-[#02cdd1]" : props.coll === "freax" ? "text-[#f5bc39]" : props.coll === "comodore" ? "text-[#235a16]" :  props.coll === "Pandora" ? "text-[#b61282]" : "None";
//   return (
// 						<div className="flex items-center p-2 mb-2 w-60 hover:bg-[#5c5e62]">
//                             <div className="flex items-center p-2 gap-3">
//                             <img
//                                 width={32}
//                                 height={32}
//                                 className="rounded-circle"
//                                 src={props.img}
//                                 alt=""
//                             />
//                             <h4 className={` ${MemberColl} + font-semibold text-white important `} >{props.name}</h4>
//                             </div>
//                             <div className="ml-auto">
//                             <h6 className={`${ Memberstat} +  text-xs `}>
//                                 {props.isMemberOnline === "online" ? "Online" :  props.isMemberOnline === "offline" ? "Offline" : "in-game"}
//                             </h6>
// 						</div>
//                         </div>
				
//   )
// }


export default MemberCard