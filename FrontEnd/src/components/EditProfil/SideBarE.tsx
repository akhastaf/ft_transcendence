import { ChevronDownIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { UserType } from "../Types/types";
// import SideBar from "../SideBar/SideBar";
import {IoIosLogOut} from "react-icons/io";
import Settings1 from "./Settings";


const logo = require('../../images/wolf.png');
const SideBarE: React.FC<{
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    currentUser: UserType;
    logoutHandler: () => void;

}> = ({ setShowModal, currentUser, logoutHandler }) => {

    const closeModal = () => {

        setShowModal(false);

    };
    const [selected, setSelected] = useState<string>("My Account");
    return (<>

        <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => { closeModal(); }}
        >
            <div className="flex w-full h-full items-center" onClick={e => { e.stopPropagation(); }} >
                <div className="grow invisible lg:visible">

                </div>
                <div className="w-full flex flex-row my-6 mx-auto h-full " >
          
                    <div className=" border-0  h-full shadow-lg  w-[20rem] flex flex-col  bg-discord_serverBg outline-none focus:outline-none" onClick={e => { e.stopPropagation(); }}>
                        <div className="flex flex-col ml-10 mt-8 gap-20">
                            <h1> USER SETTINGS </h1>
                            <div className="flex flex-col mt-20 gap-20 ">
                                 <SettingCard setSelected={setSelected} selected={selected} text="My Account"/>
                                 <SettingCard setSelected={setSelected} selected={selected} text="My Profile"/>
                                 <SettingCard setSelected={setSelected} selected={selected} text="Friend List"/>
                                 <SettingCard setSelected={setSelected} selected={selected}  text="Block List "/>
                                 <SettingCard setSelected={setSelected} selected={selected}  text="Friend Request"/>
                                 <div className="bg-rose-600 border-2 border-rose-600 hover:bg-rose-800">
                                 <SettingCard setSelected={setSelected} selected={selected}  text="Disconnect"/>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="h-full shadow-lg flex-grow flex flex-col  bg-discord_serverBg outline-none focus:outline-none" onClick={e => { e.stopPropagation(); }}>
                        <div className="sm:mx-auto sm:w-full sm:max-w-md">
                            <button
                                className="p-1 mt-10 ml-80 bg-transparant  text-black  float-right text-3xl leading-none font-semibold"
                                onClick={closeModal}
                            >
                                <IoCloseCircleSharp className="text-emerald-400" />
                            </button>
                            <div className="flex flex-col ml-10 mt-40">
                                <Settings1 currentUser={currentUser} logoutHandler={logoutHandler} selected={selected}/>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>)
};

const SettingCard : React.FC <{
    setSelected: React.Dispatch<React.SetStateAction<string>>
    selected:string
    text:string
}> = ({selected,text, setSelected}) => {
    
    let modif : string | null;

    modif = (text === selected && text !== "Disconnect") ? "bg-emerald-600" : (text !== "Disconnect") ?  " hover:bg-[#5c5e62]" : null;
    useEffect (() => {
        console.log(modif);
    });
    return (<>

        <div onClick={ () => { if ( text !== "Disconnect") setSelected(text) } } className={`flex items-center p-2 mb-2 ${modif}`}  >
            <div className="flex justify-center items-center p-2 gap-[7rem]">
            <h1>{text}</h1>

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

export default SideBarE;