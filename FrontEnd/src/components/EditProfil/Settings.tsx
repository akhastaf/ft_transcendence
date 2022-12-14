import { Button, ButtonGroup, Flex, Progress, useToast } from "@chakra-ui/react";
import { avatar } from "@material-tailwind/react";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoCloseCircleSharp } from "react-icons/io5";
import { getCurrentUser, updateInfo } from "../Services/user";
// import { SiWappalyzer } from "react-icons/si";
import { profileUpdate, UserType } from "../Types/types";
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


    const [tfa, setTfa] = useState(false);
    const [tfaModal, setTfaModal] = useState(false);
    const [state, setState] = useState("Enable");

    const changeImage = () => {

    }
    const Enable2fa = () => {
        console.log("22222222")
            setTfaModal(true);
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


                                {/* <div className="flex flex-row pt-5 pb-5"> 
                                    <BasicButtons  onClick={changeImage} text="Modify Your Profil" />
                                </div> */}
                            </div>
                            <div id="mail setting" className="border-5 rounded-lg h-[15rem] m-auto w-2/3 border-discord_secondSideBar bg-discord_serverBg flex flex-col justify-around ">
                                <SettingInfo type="mail" CurrentUser={currentUser} />
                                <SettingInfo1 type="mail" CurrentUser={currentUser} />
                                {/* <Progress colorScheme='green' height='32px' value={20} > Level 1</Progress> */}
                                {/* <SettingInfo2 type="mail" CurrentUser={currentUser} /> */}
                            

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
                                <BasicButtons1 classNam="" text={`${state} Two Factor Authentification`} onClick={Enable2fa} />
                                {tfaModal ? <TfaModal setState={setTfaModal} /> : null}
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
                                <BasicButtons1 classNam="bg-red" text="Delete Accout" onClick={Enable2fa} />
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
                {state ? <SettingModal avatar={CurrentUser.avatar} Subject="Username" username={CurrentUser.username} setState={setState} /> : null}
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
                </div>
            </div>

        </div>

    </>)
}



const SettingModal: React.FC<{
    setState: React.Dispatch<React.SetStateAction<boolean>>;
    username: string 
    avatar : string
    Subject: string
}> = ({ setState, username, Subject }) => {

    const toast = useToast();
    const { register, handleSubmit, setError, formState: { errors } } = useForm<profileUpdate>();
    const closeModal = () => {

        setState(false);

    };
    const [image, setImage] = useState(false);
    const avatarRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<any>();
    const [imageFile, setImageFile] = useState<any>(avatar);


   
    const upload = (event : any) =>
   {
        setImage(true);
    let image_as_base64 = URL.createObjectURL(event.target.files[0])
      let image_as_files = event.target.files[0];

        setImagePreview(image_as_base64)
        setImageFile(image_as_files)
  }
    const submitForm : SubmitHandler<profileUpdate> = (data) => {

        let formData = new FormData();
        const name = data.name ? data.name : username;
    	formData.append('username', name);
    	formData.append('avatar', imageFile);
        console.log("formdata" , data.name, "avatar ", imageFile);
        updateInfo(formData).then((data) => {
            console.log(data);
            toast({
				title: `Info update`,
				description: `Your Profile Info have been updated`,
				status: 'success',
				duration: 9000,
				isClosable: true,
			  })
            })
            closeModal();
    }
    const m: string = (username) ? username : "";

    return <>
        <div
            className="justify-center items-center  flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => { closeModal(); }}
        >
            <div className="flex items-center " onClick={e => { e.stopPropagation(); }} >
                {/* <div className="w-[30rem] my-6 mx-auto h-[25rem]   " > */}
                    <Flex gap={12} onClick={e => { e.stopPropagation(); }} bg={"#36393f"} flexDir={"column"} justifyContent={"space-between"} w={"30rem"} alignItems={"center"} h={"25rem"}>
                    <form className="w-full h-full" onSubmit={handleSubmit(submitForm)}>
                        <Flex  h={"100%"} flexDir={"column"} justifyContent={"space-between"} alignItems={"center"} gap={8}>
                        <Flex flexDir={"column"} justifyContent={"space-between"} alignItems={"center"}>
                            <button
                                className="p-1 ml-auto bg-transparant  text-black  float-right text-3xl leading-none font-semibold"
                                onClick={closeModal}
                            >
                                <IoCloseCircleSharp className="text-emerald-400" />
                            </button>
                            <h2 className="text-center text-xl font-bold text-white">Modify Your {Subject} </h2>
                            <h4 className="text-center text-white">Enter Your New {Subject} and Password </h4>
                        </Flex>
                                <Flex flexDir={"column"} justifyContent={"space-between"} alignItems={"flex-start"} gap={5}>
                                    <label htmlFor="newUserName">{Subject}</label>
                                         <input {...register("name")}  type="text" placeholder={m} />
                                    <label htmlFor="Password">Change Avatar</label>
                                    <input onChange={upload} ref={avatarRef} type="file" id="img" name="img" accept="image/*" />
               

                                
                                </Flex>
                        <Flex w={"100%"} h={"15%"} flexDir={"row"} justifyContent={"flex-end"} alignItems={"center"} bg={"#2f3136"}>
                        <ButtonGroup pr={"3%"}>
                                    <Button colorScheme={'whatsapp'}   onClick={closeModal} > Cancel </Button>
                                    <Button  colorScheme={'whatsapp'} type="submit" > Sumbit </Button>
                                </ButtonGroup>
                        </Flex>
                        </Flex>
                        </form>
                    </Flex>

                {/* </div> */}
            </div>
        </div>
        <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
    </>
    // </>
}
const TfaModal: React.FC<{
    setState: React.Dispatch<React.SetStateAction<boolean>>

}> = ({ setState }) => {

    const toast = useToast();
    const { register, handleSubmit, setError, formState: { errors } } = useForm<profileUpdate>();
    const closeModal = () => {

        setState(false);

    };

    const submitForm : SubmitHandler<profileUpdate> = (data) => {

        let formData = new FormData();
        const name = data.name ? data.name : "";
    	// formData.append('username', name);
    	// formData.append('avatar', imageFile);
        // updateInfo(formData).then((data) => {
        //     console.log(data);
        //     toast({
		// 		title: `Info update`,
		// 		description: `Your Profile Info have been updated`,
		// 		status: 'success',
		// 		duration: 9000,
		// 		isClosable: true,
		// 	  })
        //     })
        //     closeModal();
    }

    // const m: string = (username) ? username : "";

    return <>
        <div
            className="justify-center items-center  flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => { closeModal(); }}
        >
            <div className="flex items-center " onClick={e => { e.stopPropagation(); }} >
                {/* <div className="w-[30rem] my-6 mx-auto h-[25rem]   " > */}
                    <Flex gap={12} onClick={e => { e.stopPropagation(); }} bg={"#36393f"} flexDir={"column"} justifyContent={"space-between"} w={"30rem"} alignItems={"center"} h={"25rem"}>
                    <form className="w-full h-full" onSubmit={handleSubmit(submitForm)}>
                        <Flex  h={"100%"} flexDir={"column"} justifyContent={"space-between"} alignItems={"center"} gap={8}>
                        <Flex flexDir={"column"} justifyContent={"space-between"} alignItems={"center"}>
                            <button
                                className="p-1 ml-auto bg-transparant  text-black  float-right text-3xl leading-none font-semibold"
                                onClick={closeModal}
                            >
                                <IoCloseCircleSharp className="text-emerald-400" />
                            </button>
                            <h2 className="text-center text-xl font-bold text-white">Enable Tfa </h2>
                            {/* <h4 className="text-center text-white">Enter Your New {Subject} and Password </h4> */}
                        </Flex>
                                <Flex flexDir={"column"} justifyContent={"space-between"} alignItems={"flex-start"} gap={5}>
        

                                
                                </Flex>
                        <Flex w={"100%"} h={"15%"} flexDir={"row"} justifyContent={"flex-end"} alignItems={"center"} bg={"#2f3136"}>
                        <ButtonGroup pr={"3%"}>
                                    <Button colorScheme={'whatsapp'}   onClick={closeModal} > Cancel </Button>
                                    <Button  colorScheme={'whatsapp'} type="submit" > Sumbit </Button>
                                </ButtonGroup>
                        </Flex>
                        </Flex>
                        </form>
                    </Flex>

                {/* </div> */}
            </div>
        </div>
        <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
    </>
    // </>
}