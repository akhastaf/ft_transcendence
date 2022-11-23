import React, { useEffect } from 'react';
import { ChatType, userModel, Userstatus, UserType } from './Types/types';
// import Context from './SideBar/context';
import { ContextMenuComponent, MenuEventArgs, MenuItemModel } from '@syncfusion/ej2-react-navigations';





// const Menu = [

//  {
//         // iconCss: 'e-cart-icon e-link',
//         text: 'Flipkart',
//         // url: 'https://www.google.co.in/search?q=flipkart'
//     },
//     {
//         // iconCss: 'e-cart-icon e-link',
//         text: 'Amazon',
//         // url: 'https://www.google.co.in/search?q=amazon'
//     },
//     {
//         // iconCss: 'e-cart-icon e-link',
//         text: 'Snapdeal',
//         // url: 'https://www.google.co.in/search?q=snapdeal'
//     }
// ];

const MemberCard : React.FC<{
    //choosenChat: ChatType,
   
	
	
    user : userModel,
    // key: string
    coll : string
	onClick: (user: string) => void;
	// onlineUsers: string[];
}> =  ({ user, onClick, coll  }) => {


    // const displayList = (args: MenuEventArgs) => {
    //   args.element.getElementsByTagName('a')[0].setAttribute('target', '_blank');
    // }
    // const isOnline =  onlineUsers.includes(name) ? "online" : "offline";
    useEffect(() => {
        // displayList
    },[])

    
    const Memberstat = user.status === "online" ? "online text-green-400" : user.status === "offline" ? "offline text-red-500" :  "in-game text-blue-500" ;
    const MemberColl = coll === "bios" ? "text-[#02cdd1]" : coll === "freax" ? "text-[#f5bc39]" : coll === "comodore" ? "text-[#235a16]" :  coll === "Pandora" ? "text-[#b61282]" : "None";
    return (
      <div  id="element" className={ `flex items-center p-2 mb-2  hover:bg-[#5c5e62]`}>
                            
          {/* <Context> */}
                            

                        
                            <div  id="target" className="flex items-center p-2 gap-3" 
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
            
            {/* </Context> */}
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



// import { Button } from '@material-tailwind/react';
// import React from 'react';
// import { ChatType, userModel, UserType } from './Types/types';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import Menu, { MenuProps } from '@mui/material/Menu';
// import { alpha, styled } from '@mui/material/styles';
// import MenuItem from '@mui/material/MenuItem';
// import Context from './SideBar/context'





// const MemberCard : React.FC<{
//     //choosenChat: ChatType,
   
	
	
//     user : userModel,
//     // key: string
//     coll : string
// 	onClick: (user: string) => void;
// 	// onlineUsers: string[];
// }> =  ({ user, onClick, coll  }) => {

//     // const isOnline =  onlineUsers.includes(name) ? "online" : "offline";
//     const Memberstat = user.status === "online" ? "online text-green-400" : user.status === "offline" ? "offline text-red-500" :  "in-game text-blue-500" ;
//     const MemberColl = coll === "bios" ? "text-[#02cdd1]" : coll === "freax" ? "text-[#f5bc39]" : coll === "comodore" ? "text-[#235a16]" :  coll === "Pandora" ? "text-[#b61282]" : "None";
    
//     const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//     const open = Boolean(anchorEl);
//     const handleClick = (event: React.MouseEvent<HTMLElement>) => {

//       console.log("i am here");
//       setAnchorEl(event.currentTarget);
//     };
//     const handleClose = () => {
//       setAnchorEl(null);
//     };
    
//     return (

//         <div  className={ `flex items-center p-2 mb-2  hover:bg-[#5c5e62]`}>
                            
                            

//                             <Button
//                                 id="demo-customized-button"
//                                 aria-controls={open ? 'demo-customized-menu' : undefined}
//                                 aria-haspopup="true"
//                                 aria-expanded={open ? 'true' : undefined}
//                                 onClick={handleClick}
                                
//                             >
//                             <MenuItem onClick={handleClose} disableRipple>
//                             <div className="flex items-center p-2 gap-3" 
//                             // onClick={() => {
//                             //     onClick(user.name);
//                             // }}
//                             >
//                                 {/* to work on css bellow */}
                            
//                             <div className="position-relative">
//                                  {user.notifications && user.notifications > 0 ? (
// 						             <div className="notification-bubble"> 
                                    
// 						             	{user.notifications}
// 						             </div>
// 					             ) : null}
// 					            <img
// 					            	width={32}
// 					            	height={32}
// 					            	className="rounded-circle"
// 					            	src={user.avatar}
// 					            	alt=""
// 					            />
//                             </div>
//                             <h4 className={` ${MemberColl} + font-semibold text-white important `} >{user.name}</h4>
//                             </div>
                            
//                             <div className="ml-auto">
//                             <h6 className={`${ Memberstat} +  text-xs `}>
//                                 {user.status === "online" ? "Online" :  user.status === "offline" ? "Offline" : "in-game"}
//                             </h6>
// 						    </div>
//                         </MenuItem>
//                         </Button>
//                 </div>

//     );
// }


// const StyledMenu = styled((props: MenuProps) => (
//     <Menu
//       elevation={0}
//       anchorOrigin={{
//         vertical: 'bottom',
//         horizontal: 'right',
//       }}
//       transformOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//       {...props}
//     />
//   ))(({ theme }) => ({
//     '& .MuiPaper-root': {
//       borderRadius: 6,
//       marginTop: theme.spacing(1),
//       minWidth: 180,
//       color:
//         theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
//       boxShadow:
//         'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
//       '& .MuiMenu-list': {
//         padding: '4px 0',
//       },
//       '& .MuiMenuItem-root': {
//         '& .MuiSvgIcon-root': {
//           fontSize: 18,
//           color: theme.palette.text.secondary,
//           marginRight: theme.spacing(1.5),
//         },
//         '&:active': {
//           backgroundColor: alpha(
//             theme.palette.primary.main,
//             theme.palette.action.selectedOpacity,
//           ),
//         },
//       },
//     },
//   }));
  

// // function MemberCard(props: any) {
// //     const Memberstat = props.isMemberOnline === "online" ? "online text-green-400" : props.isMemberOnline === "offline" ? "offline text-red-500" : props.isMemberOnline === "in-game" ? "in-game text-blue-500" : "None";
// //     const MemberColl = props.coll === "bios" ? "text-[#02cdd1]" : props.coll === "freax" ? "text-[#f5bc39]" : props.coll === "comodore" ? "text-[#235a16]" :  props.coll === "Pandora" ? "text-[#b61282]" : "None";
// //   return (
// // 						<div className="flex items-center p-2 mb-2 w-60 hover:bg-[#5c5e62]">
// //                             <div className="flex items-center p-2 gap-3">
// //                             <img
// //                                 width={32}
// //                                 height={32}
// //                                 className="rounded-circle"
// //                                 src={props.img}
// //                                 alt=""
// //                             />
// //                             <h4 className={` ${MemberColl} + font-semibold text-white important `} >{props.name}</h4>
// //                             </div>
// //                             <div className="ml-auto">
// //                             <h6 className={`${ Memberstat} +  text-xs `}>
// //                                 {props.isMemberOnline === "online" ? "Online" :  props.isMemberOnline === "offline" ? "Offline" : "in-game"}
// //                             </h6>
// // 						</div>
// //                         </div>
				
// //   )
// // }


// export default MemberCard