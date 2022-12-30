// import { ChevronDownIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
// import { IoCloseCircleSharp } from "react-icons/io5";
import { UserType } from "../Types/types";
// import SideBar from "../SideBar/SideBar";
import {IoIosLogOut} from "react-icons/io";
import Settings1 from "./Settings";
import { Box, Button, Flex } from "@chakra-ui/react";
// import Button from '@mui/material/Button';


// const logo = require('../../images/wolf.png');
const SideBarE: React.FC<{
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    currentUser: UserType;
    logoutHandler: () => void;
    usersState : boolean,
    setUsersState : React.Dispatch<React.SetStateAction<boolean>>;

}> = ({ usersState, setUsersState, setShowModal, currentUser, logoutHandler }) => {

    useEffect(() => {

    },[usersState])
    const closeModal = () => {

        setShowModal(false);

    };
    const [selected, setSelected] = useState<string>("My Account");
    return (<>

        <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => { closeModal(); }}
        >
            <div className="flex w-full h-full items-center" onClick={e => { e.stopPropagation(); }} >
                <div className="grow invisible lg:visible">

                </div>
                <div className="w-full flex flex-row my-6 mx-auto h-full " >
                    <div className="bg-discord_secondSideBar  lg:w-[13rem] h-full border-0"></div>
                    {/*
                            side bar hidden
                    */}
                    <Box className=" invisible md:visible h-full shadow-lg  flex flex-col bg-discord_secondSideBar  focus:outline-none" onClick={e => { e.stopPropagation(); }}>
                        <div className="flex flex-col ml-10 mt-8 gap-20">
                            <h1> USER SETTINGS </h1>
                            <Flex flexDir={"column"} justifyContent={"space-between"} alignItems={"center"} gap={20}>
                                 <SettingCard setSelected={setSelected} selected={selected} text="My Account"/>
                                 <SettingCard setSelected={setSelected} selected={selected} text="My Profile"/>
                                 <SettingCard setSelected={setSelected} selected={selected} text="Friend List"/>
                                 <SettingCard setSelected={setSelected} selected={selected}  text="Block List"/>
                                 {/* <SettingCard setSelected={setSelected} selected={selected}  text="Friend Request"/> */}
                                 <div className="bg-rose-600 border-2 border-rose-600 hover:bg-rose-800">
                                 <SettingCard setSelected={setSelected} selected={selected} logout={logoutHandler} text="Disconnect"/>
                                </div>
                            </Flex>
                        </div>

                    </Box>
                    <Flex className="h-full shadow-lg w-3/5 overflow-y-auto flex-grow flex flex-col  bg-discord_serverBg  outline-none focus:outline-none" onClick={e => { e.stopPropagation(); }}>
                        <Settings1 usersState={usersState} setUsersState={setUsersState}  closeModal={closeModal} currentUser={currentUser} logoutHandler={logoutHandler} selected={selected}/> 
                    </Flex>
                </div>
            </div>
        </div>

    </>)
};

const SettingCard : React.FC <{
    setSelected: React.Dispatch<React.SetStateAction<string>>
    selected:string
    text:string
    logout? : () => void;
}> = ({selected,text, setSelected, logout}) => {
    
    let modif : string | null;

    modif = (text === selected && text !== "Disconnect") ? "bg-emerald-600" : (text !== "Disconnect") ?  " hover:bg-[#5c5e62]" : null;
    useEffect (() => {
        // console.log(modif);
    });
    return (<>

        <div onClick={ () => { if ( text !== "Disconnect") setSelected(text) ; else if (logout) logout()} } className={`flex items-center p-2 mb-2 ${modif}`}  >
            <div className="flex justify-center items-center p-2 gap-[7rem]">
            <h1 className="arcade text-white whitespace-nowrap">{text}</h1>

            <div className="inset-y-0 right-0">
            {
                
               text === "Disconnect" && <IoIosLogOut />
            }
            </div>
            </div>
        </div>
    </>)
};



// const Disconnect : React.FC <{
//     setSelected: React.Dispatch<React.SetStateAction<string>>
//     selected:string
//     text:string
// }> = ({selected,text, setSelected}) => {
//     return (<>
    
//     <div onClick={ () => setSelected(text) } className={`flex items-center p-2 mb-2 ${modif}`}  >
//             <div className="flex justify-center items-center p-2 gap-[7rem]">
//             <h1>{text}</h1>

//             <div className="inset-y-0 right-0">
//             {
                
//                text === "Disconnect" && <IoIosLogOut />
//             }
//             </div>
//             </div>
//         </div>
//     </>)
// }

export const  BasicButtons: React.FC < {
    text: string
    onClick: () => void
}> = ({text, onClick}) => {
    return (

        <Button onClick={onClick} colorScheme={"whatsapp"} type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"> {text}</Button>

    );
  }


export const  BasicButtons1: React.FC < {
    text: string
    classNam: string
    onClick: () => void
}> = ({text, onClick , classNam}) => {
    return (
        <button onClick={onClick} type="button" className={`text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}> {text}</button>

    );
  }

export const  BasicButtons2: React.FC < {
    text: string
    classNam: string
    onClick: () => void
}> = ({text, onClick , classNam}) => {
    return (
        <button onClick={onClick} type="button" className={`text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm text-center  
        mb-2`}> {text}</button>
    );
  }

export default SideBarE;