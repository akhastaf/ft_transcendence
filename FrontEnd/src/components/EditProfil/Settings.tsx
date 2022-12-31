import { Button, ButtonGroup, Flex, useToast } from "@chakra-ui/react";
// import { avatar } from "@material-tailwind/react";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoCloseCircleSharp } from "react-icons/io5";
import { updateInfo } from "../Services/user";
// import { SiWappalyzer } from "react-icons/si";
import { profileUpdate, UserType } from "../Types/types";
import BlockList from "./BlockList";
import FriendList from "./FriendList";
import FriendListRequest from "./FriendRequest";
import Profil from "./Profile";
import { BasicButtons, BasicButtons1 } from "./SideBarE";
// import QRCode from "react-qr-code";
// import QRCode from "qrcode.react";
import { QRCodeSVG } from 'qrcode.react'
import { localService } from "../../api/axios";
// import { current } from "@reduxjs/toolkit";
// import { updates } from "../Home";


// import logo1 from "../../images/cardBack.webp"

const styles = {
    heading3: `text-xl font-semibold text-gray-900 p-4 border-b`,
    heading4: `text-base text-ct-blue-600 font-medium border-b mb-2`,
    modalOverlay: `overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full`,
    orderedList: `space-y-1 text-sm list-decimal`,
    buttonGroup: `flex items-center py-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600`,
    buttonBlue: `text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`,
    buttonGrey: `text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600`,
    inputField: `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/5 p-2.5`,
};

const maskEmailsPhones = require('mask-email-phone');
const logo = require('../../images/cardBack.webp');

const Settings: React.FC<{
    currentUser: UserType
    selected: string
    logoutHandler: () => void
    closeModal: () => void;
    usersState: boolean,
    setUsersState: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ usersState, setUsersState, selected, closeModal, currentUser, logoutHandler }) => {




    return (<>
        {
            selected === "My Account" && <UserCard usersState={usersState} setUsersState={setUsersState} closeModal={closeModal} currentUser={currentUser} />
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
        {/* {
            selected === "Friend Request" && <FriendListRequest closeModal={closeModal} currentUser={currentUser} />
        } */}
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
    usersState: boolean,
    setUsersState: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ usersState, setUsersState, closeModal, currentUser }) => {


    const [tfaModal, setTfaModal] = useState(false);
    let twofa = currentUser?.twofa;
    const state = twofa === true ? "Diseable" : "Enable";
    const [qrCode, setQrCode] = useState("");
    const [secret, setSecret] = useState("");




    const Enable2fa = () => {
        let formData = new FormData();
        const tfa: string = (twofa === true) ? "false" : "true";
        formData.append("twofa", tfa);
        updateInfo(formData).then((data) => {
            if (twofa === false) {
                setQrCode(data.secret.otpauthURL);
                setSecret(data.secret.base32);
            }
            setUsersState(!usersState);
        })
        if (twofa === false)
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
                                        src={currentUser?.avatar}
                                        alt=""
                                        className="h-24 rounded-full"
                                    />
                                    <h1 className="arcade  text-white pt-12 "> {currentUser?.username}</h1>
                                    <h1 className="arcade  text-gray-400  pt-12 "> # {" " + (parseInt(currentUser?.id) * 1420 + 300)}</h1>
                                </div>
                            </div>
                            <div id="mail setting" className="border-5 rounded-lg h-[15rem] m-auto w-2/3 border-discord_secondSideBar bg-discord_serverBg flex flex-col justify-around ">
                                <SettingInfo usersState={usersState} setUsersState={setUsersState} type="mail" CurrentUser={currentUser} />
                                <SettingInfo1 type="mail" CurrentUser={currentUser} />

                            </div>
                        </div>
                        {/* <CardSection1 currentUser={currentUser}  /> */}
                        <div className="my-10 inset-0 flex items-center">
                            <div className="w-full border-b border-gray-500"></div>
                        </div>
                        <div className="flex flex-col">
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
                            </div>
                        </div>

                    </div>
                    <div className="lg:w-1/6"></div>
                </div>
            </div>
        </Flex>
            {tfaModal ? <TfaModal setUsersState={setUsersState} usersState={usersState} qrcodeUrl={qrCode} base32={secret} setState={setTfaModal} /> : null}
    </>
};



const SettingInfo: React.FC<{
    type: string
    CurrentUser: UserType
    usersState: boolean,
    setUsersState: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ usersState, setUsersState, type, CurrentUser }) => {

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
                    <h2 className="arcade text-white">{CurrentUser?.username} </h2>
                    <h2 className="arcade text-gray-400"> {"#" + (parseInt(CurrentUser?.id) * 1420 + 300)} </h2>
                </div>
            </div>
            <div className="m-auto">
                <BasicButtons onClick={changeUserName} text="Modify" />
                {state ? <SettingModal usersState={usersState} tfa={CurrentUser?.twofa} setUsersState={setUsersState} avatar={CurrentUser?.avatar} Subject="Nickname" username={CurrentUser?.nickname} setState={setState} /> : null}
            </div>
        </div>

    </>)
}

const SettingInfo1: React.FC<{
    type: string
    CurrentUser: UserType
}> = ({ type, CurrentUser }) => {

    const [shown, setShown] = useState(true);


    const swap = () => {
        setShown(!shown);
    }
    const a: string = maskEmailsPhones(CurrentUser?.email);

    return (<>
        <div className="w-full flex flex-row ml-3">
            <div className="w-2/3 flex flex-col ">

                <h1> Email</h1>
                <div className="flex flex-row ml-5 gap-1">
                    <h2 className="arcade text-white">{(shown) ? a : CurrentUser?.email} </h2>
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
    avatar: string
    tfa: boolean
    Subject: string
    usersState: boolean,
    setUsersState: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ usersState, setUsersState, setState, tfa, username, Subject, avatar }) => {

    const toast = useToast();
    // let up = useContext(updates);
    const { register, handleSubmit } = useForm<profileUpdate>();
    const closeModal = () => {

        setState(false);

    };
    const avatarRef = useRef<HTMLInputElement>(null);

    const [imageFile, setImageFile] = useState<any>(avatar);



    const upload = (event: any) => {
        let image_as_files = event.target.files[0];

        setImageFile(image_as_files)
    }
    const submitForm: SubmitHandler<profileUpdate> = (data) => {

        let formData = new FormData();
        const name = data?.name ? data.name : username;
        formData.append('nickname', name);
        formData.append('avatar', imageFile);

        formData.append('twofa', tfa ? "true" : "false");
        updateInfo(formData).then((data) => {
            // updates = !updates;
            toast({
                title: `Info update`,
                description: `Your Profile Info have been updated`,
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            setUsersState(!usersState);
        }).catch(err => {
            toast({
                title: `Error`,
                description: err.response.data!.message,
                status: 'error',
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
                        <Flex h={"100%"} flexDir={"column"} justifyContent={"space-between"} alignItems={"center"} gap={8}>
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
                                <input {...register("name")} type="text" placeholder={m} />
                                <label htmlFor="Password">Change Avatar</label>
                                <input onChange={upload} ref={avatarRef} type="file" id="img" name="img" accept="image/*" />



                            </Flex>
                            <Flex w={"100%"} h={"15%"} flexDir={"row"} justifyContent={"flex-end"} alignItems={"center"} bg={"#2f3136"}>
                                <ButtonGroup pr={"3%"}>
                                    <Button colorScheme={'whatsapp'} onClick={closeModal} > Cancel </Button>
                                    <Button colorScheme={'whatsapp'} type="submit" > Sumbit </Button>
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
    qrcodeUrl: string,
    base32: string
    usersState: boolean,
    setUsersState: React.Dispatch<React.SetStateAction<boolean>>;

}> = ({ setState, qrcodeUrl, base32, usersState, setUsersState }) => {

    const { register, handleSubmit, formState: { errors } } = useForm<{ token: string }>();
    const closeModal = () => {

        setState(false);

    };
    const [tok, setTok] = useState<string>("");
    const toast = useToast({
        position: 'top',

        containerStyle: {
            width: '800px',
            maxWidth: '100%',
        },
    })
    const toast2 = useToast();

    const submitForm: SubmitHandler<{ token: string }> = (data) => {

        const name = data.token ? data.token : "9999";
        localService.post("user/2fa/verify", { token: name }).then((res) => {
            setTok(res.data.recoveryCode);
            toast({
                title: `Important : Save this Number to reset 2fa : ${res.data.recoveryCode} `,
                containerStyle: {
                    border: '20px solid red',
                },

            })
            toast2({
                title: `user update`,
                description: `two fa is activated Now`,
                status: 'info',
                duration: 9000,
                isClosable: true,
            })
            setState(false);
            setUsersState(!usersState);
            
        })

    }

    // const m: string = (username) ? username : "";

    return <>
        <div
            aria-hidden={true}
            className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full bg-[#222] bg-opacity-50"
        // onClick={closeModal}
        >
            <div className="relative p-4 w-full max-w-xl h-full md:h-auto left-1/2 -translate-x-1/2">
                <div className="relative bg-white rounded-lg shadow">
                    <h3 className={styles.heading3}>Two-Factor Authentication (2FA)</h3>
                    {/* Modal body */}
                    <div className="p-6 space-y-4">
                        <h4 className={styles.heading4}>
                            Configuring Google Authenticator or Authy
                        </h4>
                        <div className={styles.orderedList}>
                            <li>
                                Install Google Authenticator (IOS - Android) or Authy (IOS -
                                Android).
                            </li>
                            <li>In the authenticator app, select "+" icon.</li>
                            <li>
                                Select "Scan a barcode (or QR code)" and use the phone's camera
                                to scan this barcode.
                            </li>
                        </div>
                        <div>
                            <h4 className={styles.heading4}>Scan QR Code</h4>
                            <div className="flex justify-center">
                                {/* <img
                  className="block w-64 h-64 object-contain"
                  src={qrcodeUrl}
                  alt="qrcode url"
                />
                 */}
                                <QRCodeSVG value={qrcodeUrl} />
                            </div>
                        </div>
                        <div>
                            <h4 className={styles.heading4}>Or Enter Code Into Your App</h4>
                            <p className="text-sm">SecretKey: {base32} (Base32 encoded)</p>
                        </div>
                        <div>
                            <h4 className={styles.heading4}>Verify Code</h4>
                            <p className="text-sm">
                                For changing the setting, please verify the authentication code:
                            </p>
                        </div>
                        <form onSubmit={handleSubmit(submitForm)}>
                            <input
                                {...register("token")}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5"
                                placeholder="Authentication Code"
                            />
                            <p className="mt-2 text-xs text-red-600">
                                {errors.token ? errors.token.message : null}
                            </p>

                            <div className={styles.buttonGroup}>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className={styles.buttonGrey}
                                >
                                    Close
                                </button>
                                <button type="submit" className={styles.buttonBlue}>
                                    Verify & Activate
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
    // </>
}