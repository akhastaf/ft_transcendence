import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
// import { SiWappalyzer } from "react-icons/si";
import { UserType } from "../Types/types";
import BlockList from "./BlockList";
import FriendList from "./FriendList";
import FriendListRequest from "./FriendRequest";
import Profil from "./Profile";
import { BasicButtons, BasicButtons1 } from "./SideBarE";

// import logo1 from "../../images/cardBack.webp"

const maskEmailsPhones = require('mask-email-phone');
const logo = require('../../images/cardBack.webp');

const Settings: React.FC<{
    currentUser: UserType
    selected: string
    logoutHandler: () => void
    closeModal: () => void;
}> = ({ selected, closeModal, currentUser, logoutHandler }) => {




    return (<>
        {
            selected === "My Account" && <UserCard closeModal={closeModal} currentUser={currentUser} />
        }
        {
            selected === "My Profile" && <Profil currentUser={currentUser} closeModal={closeModal} />
        }
        {
            selected === "Friend List" && <FriendList closeModal={closeModal} currentUser={currentUser} />
        }
        { 
            selected === "Block List" && <BlockList closeModal={closeModal} currentUser={currentUser} />
        }
        {
            selected === "Friend Request" && <FriendListRequest closeModal={closeModal} currentUser={currentUser} />
        }
        {/*{
            selected === "Disconnect" && <FriendList currentUser={currentUser} />
        } */}
    </>)
}
export default Settings;

// https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fillustrations%2Fgame-background-sky-game-landscape-4956017%2F&psig=AOvVaw1JIMK3WtN7Uxi7BrbkDOKW&ust=1667515279419000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCLDVqujIkPsCFQAAAAAdAAAAABAI

const UserCard: React.FC<{
    currentUser: UserType
    closeModal: () => void
}> = ({ closeModal, currentUser }) => {


    const changeImage = () => {

    }
    const ChangePassword = () => {

    }

    return <>
        <Flex flexDir={"column"} p={"5%"} className="h-full gap-5">
            <div id="up div" className="flex flex-row  justify-around ">
                <h1 className="float-left font-bold left-0"> My Account </h1>
                <button
                    className=" bg-transparant  text-black  float-right text-3xl leading-none font-semibold"
                    onClick={closeModal}
                >
                    <IoCloseCircleSharp className="text-emerald-400" />
                </button>
            </div>
            <div className="flex h-screen ">
                <div id="down div" className="h-full flex w-full m-auto  flex-row ">
                    <div className="flex flex-col h-[40rem] w-full md:w-[80rem]">
                       <div className="flex flex-col rounded-lg h-[25rem] bg-gradient-to-r gap-5 from-sky-500 to-indigo-500 " style={{ backgroundImage: `url(${logo}) ` }}>

                             <div className="flex gap-x-1 w-full md:w-[50rem] m-auto flex-row justify-between flex-nowrap  lg:pl-12 ">
                                <div className="flex flex-row jusifty-start gap-x-1 w-auto ">
                                    <img
                                        src={currentUser.avatar}
                                        alt=""
                                        className="h-24 rounded-full"
                                    />
                                    <h1 className="arcade  text-white pt-12 "> {currentUser.username}</h1>
                                    <h1 className="arcade  text-gray-400  pt-12 "> # {" " + currentUser._id}</h1>
                             </div>


                                <div className="flex flex-row pt-5 pb-5"> 
                                    <BasicButtons  onClick={changeImage} text="Modify Your Profil" />
                                </div>
                            </div>
                            <div id="mail setting" className="border-5 rounded-lg h-[15rem] m-auto w-2/3 border-discord_secondSideBar bg-discord_serverBg flex flex-col justify-around ">
                                <SettingInfo type="mail" CurrentUser={currentUser} />
                                <SettingInfo1 type="mail" CurrentUser={currentUser} />
                                <SettingInfo2 type="mail" CurrentUser={currentUser} />
                            

                            </div>
                        </div> 
                        {/* <CardSection1 currentUser={currentUser}  /> */}
                        <div className="my-10 inset-0 flex items-center">
                            <div className="w-full border-b border-gray-500"></div>
                        </div>
                        <div className="flex flex-col">
                            {/* <span className="float-left font-bold left-0 text-md text-white">Password and Authentification</span>
                            <div className="ml-0 mt-5 w-[20rem]">
                                <BasicButtons1 classNam="" text="Change Password" onClick={ChangePassword} />
                            </div> */}
                            <div className="mt-5">
                           <h2> Two Factor Authentification </h2>
                            </div>
                            <div className="w-1/4 box-border my-5">
                                <h3 className="text-hsl(216,calc(var(--saturation-factor, 1)*3.7%),73.5%)">
                                        Protect your Discord account with an extra layer of security. Once set up,
                                        you will need to enter both your password and an authentication code from your phone to log in.
                                </h3>
                            </div>
                            <div className="ml-0 mt-5 w-[20rem]">
                                <BasicButtons1 classNam="" text="Enable Two Factor Authentification" onClick={ChangePassword} />
                            </div>
                        </div>
                        <div className="my-10 inset-0 flex items-center">
                            <div className="w-full border-b border-gray-500"></div>
                        </div>
                        <div className="flex flex-col">
                            <div className="mt-1">
                           <h2> Account Deletion </h2>
                            </div>
                            <div className="w-1/4 box-border my-5">
                                <h3 className="text-hsl(216,calc(var(--saturation-factor, 1)*3.7%),73.5%)">
                                        Protect your Discord account with an extra layer of security. Once set up,
                                        you will need to enter both your password and an authentication code from your phone to log in.
                                </h3>
                            </div>
                            <div className="ml-0 mt-5 w-[20rem]">
                                <BasicButtons1 classNam="bg-red" text="Delete Accout" onClick={ChangePassword} />
                                {/* <BasicButtons1 classNam="" text="Enable Two Factor Authentification" onClick={ChangePassword} /> */}
                            </div>
                        </div>

                    </div>
                    <div className="lg:w-1/6"></div>
                </div>
            </div>
        </Flex>
    </>
};



const SettingInfo: React.FC<{
    type: string
    CurrentUser: UserType
}> = ({ type, CurrentUser }) => {

    const [state, setState] = useState(false);
    const changeUserName = () => {
        // ! request to change username
        setState(true);
    }

    return (<>
        <div className="w-full flex flex-row ml-3">
            <div className="w-2/3 flex flex-col ">

                <h1> Username</h1>
                <div className="flex flex-row ml-5 gap-1">
                    <h2 className="arcade text-white">{CurrentUser.username} </h2>
                    <h2 className="arcade text-gray-400"> {"#" + CurrentUser._id} </h2>
                </div>
            </div>
            <div className="m-auto">
                <BasicButtons onClick={changeUserName} text="Modify" />
                {state ? <SettingModal Subject="Username" username={CurrentUser.username} setState={setState} /> : null}
            </div>
        </div>

    </>)
}

const SettingInfo1: React.FC<{
    type: string
    CurrentUser: UserType
}> = ({ type, CurrentUser }) => {

    const [state, setState] = useState(false);
    const [shown, setShown] = useState(true);

    const changeEmail = () => {
        setState(true);
    }

    const swap = () => {
        setShown(!shown);
    }
    const a: string = maskEmailsPhones(CurrentUser.email);
    // const b : string = 
    return (<>
        <div className="w-full flex flex-row ml-3">
            <div className="w-2/3 flex flex-col ">

                <h1> Email</h1>
                <div className="flex flex-row ml-5 gap-1">
                    <h2 className="arcade text-white">{(shown) ? a : CurrentUser.email} </h2>
                    <div className="ml-5">
                        <BasicButtons1 classNam="" onClick={swap} text={"Show"} />
                    </div>
                    {/* <h2 className="arcade text-gray-400"> {"#" +CurrentUser._id} </h2> */}
                </div>
            </div>
            <div className="m-auto">
                <BasicButtons onClick={changeEmail} text="Modify" />
                {state ? <SettingModal Subject="Email" username={CurrentUser.email} setState={setState} /> : null}
            </div>
        </div>

    </>)
}

const SettingInfo2: React.FC<{
    type: string
    CurrentUser: UserType
}> = ({ type, CurrentUser }) => {

    const [state, setState] = useState(false);


    const changePhone = () => {
        setState(true);
    }

    const a: any = (CurrentUser.phoneNumber != null) ? <h2 className='arcade text-white'> {CurrentUser.phoneNumber} </h2>
        : <h2 className='arcade  text-white'> You didn't add a Number Yet </h2>;;
    const b: string | null = (CurrentUser.phoneNumber != null) ? " Modify" : "Add";
    return (<>
        <div className="w-full flex flex-row ml-3">
            <div className="w-2/3 flex flex-col ">

                <h1> Phone Number</h1>
                <div className="flex flex-row ml-5 gap-1">

                    {
                        a
                    }
                </div>
            </div>
            <div className="m-auto">
                <BasicButtons onClick={changePhone} text={b} />
                {state ? <SettingModal Subject="Phone" username={CurrentUser.phoneNumber} setState={setState} /> : null}

            </div>
        </div>

    </>)
}




const SettingModal: React.FC<{
    setState: React.Dispatch<React.SetStateAction<boolean>>;
    username: string | null
    Subject: string
}> = ({ setState, username, Subject }) => {

    const closeModal = () => {

        setState(false);

    };
    const submitForm = () => {

    }
    const m: string = (username) ? username : "";

    return <>
        <div
            className="justify-center items-center  flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => { closeModal(); }}
        >
            <div className="flex items-center " onClick={e => { e.stopPropagation(); }} >
                <div className="w-[30rem] my-6 mx-auto h-[25rem]   " >
                    <div className="border-0 rounded-lg lg:rounded-r-lg justify-between h-[30rem] shadow-lg  flex flex-col w-full bg-discord_serverBg outline-none focus:outline-none" onClick={e => { e.stopPropagation(); }}>
                        <div className="sm:mx-auto w-full h-2/6 ">
                            <button
                                className="p-1 ml-auto bg-transparant  text-black  float-right text-3xl leading-none font-semibold"
                                onClick={closeModal}
                            >
                                <IoCloseCircleSharp className="text-emerald-400" />
                            </button>
                            <h2 className="mt-6 text-center text-xl font-bold text-white">Modify Your {Subject} </h2>
                            <h4 className="mt-6 text-center text-white">Enter Your New {Subject} and Password </h4>
                        </div>
                        <div className="h-auto w-full overflow-y-scroll scrollbar-hide">
                            <form className="space-y-2 gap-y-3" onSubmit={submitForm}>
                                <div className="flex flex-col gap-3 ml-3 w-5/6">
                                    <label htmlFor="newUserName">{Subject}</label>
                                    {
                                        Subject === "Username" && <input className="ml-3" id="username" name="username" type="text" required placeholder={m} />
                                    }
                                    {
                                        Subject === "Phone" && <input className="ml-3" id="Phone" name="Phone" type="text" required placeholder="Enter your Phone" />
                                    }
                                    {
                                        Subject === "Email" && <>
                                            <input className="ml-3" id="Cemail" name="email" type="email" required placeholder={"Enter Your new Email"} />
                                            <input className="ml-3" id="Cemail" name="Cemail" type="email" required placeholder={"Re-Enter Your new Email"} />
                                        </>
                                    }
                                    <label htmlFor="Password">Current Password</label>
                                    <input className="mb-3 ml-3" id="password" name="password" type="text" required />
                                </div>
                            </form>
                        </div>
                        <div className="h-1/6 w-full bg-discord_secondSideBar">
                            <div className="flex flex-row justify-end items-center mt-3">
                                <BasicButtons onClick={closeModal} text={"Cancel"} />
                                <BasicButtons onClick={submitForm} text={"Submit"} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
    </>
    // </>
}


// const CardSection1 : React.FC <{
//     currentUser : UserType



// }> = ({currentUser}) => {


//     return <>
    
// <a href="#" className="flex flex-col items-center w-[80rem] bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
//     <img className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={currentUser.username} alt=""/>
//     <div className="flex flex-col justify-between p-4 leading-normal">
//     {/* <div className="flex flex-col rounded-lg h-[25rem] bg-gradient-to-r gap-5 from-sky-500 to-indigo-500 " style={{ backgroundImage: `url(${logo}) ` }}> */}

// <div className="flex gap-x-1 w-[50rem] m-auto flex-row justify-between flex-nowrap  lg:pl-12 ">
//     <div className="flex flex-row jusifty-start gap-x-1 w-auto ">
//         <h1 className="arcade  text-white pt-12 "> {currentUser.username}</h1>
//         <h1 className="arcade  text-gray-400  pt-12 "> # {" " + currentUser._id}</h1>
//  </div>


//     {/* <div className="flex flex-row pt-5 pb-5"> 
//         <BasicButtons  onClick={changeImage} text="Modify Your Profil" />
//     </div> */}
// </div>
// <div id="mail setting" className="border-5 rounded-lg  m-auto p-4 border-discord_secondSideBar bg-discord_serverBg flex flex-col justify-around ">
//     <SettingInfo type="mail" CurrentUser={currentUser} />
//     <SettingInfo1 type="mail" CurrentUser={currentUser} />
//     <SettingInfo2 type="mail" CurrentUser={currentUser} />
//     {/* <div id="username"></div>
// <div id="email"></div>
// <div id="phoneNumber"></div> */}

// </div>
// </div>

// </a> 

//     </>
// }