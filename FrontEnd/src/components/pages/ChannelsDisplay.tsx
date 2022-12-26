import { Box, Flex, Grid, useToast } from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoCloseCircleSharp } from "react-icons/io5";
import { Navigate, useNavigate } from "react-router-dom";
import { BasicButtons, BasicButtons1 } from "../EditProfil/SideBarE";
import { AllRooms, joinRoom } from "../Services/room";
import { socket, SocketContext } from "../Services/sockets";
import { Privacy, roomModal } from "../Types/types";

const logo = require("../../images/searchImage.jpeg");
const ChannelsDisplay: React.FC<{
    joinRoomHandler: (room: roomModal, password?: string) => void;
}> = ({ joinRoomHandler }) => {

    const [rooms, Setrooms] = useState<roomModal[]>([]);

    useEffect(() => {
        AllRooms().then((res) => Setrooms(res)).catch(err => console.log(err));
    }, [])


    return <>

            <div className="flex h-full flex-col gap-7">
                <div className=" sm:h-[30rem] scale-100 w-full rounded-lg" >
                  
                    <img className="max-h-[30rem] w-full rounded-lg" src={logo} />
                    <div className="absolute w-1/2 m-auto bottom-1/2 inset-x-0 text-white text-lg text-center leading-16">
                        <p className="text-bold arcade text-white">Find Your Play Space</p>
                        <SearchBox />
                    </div>
                </div>
                <Box w={"100%"} h={"400px"} className={"channelScroll"}>
                 <Grid className={"overflow-y-auto scrollbar-hide"} overflowX={"hidden"} w={"100%"} h={"100%"}  p={"2%"} templateColumns={{ base: 'repeat(autofill, 1fr)', lg :'repeat(3, 1fr)'}} gap={12}>
                 {
                        rooms.map((room: roomModal) => (
                            <ChannelCard joinRoomHandler={joinRoomHandler} key={room.id} room={room} />
                        ))
                    }
                </Grid>
                </Box>
            </div>
    </>
}

const ChannelCard: React.FC<{
    room: roomModal
    joinRoomHandler: (room: roomModal) => void;
}> = ({ room, joinRoomHandler }) => {

    const [state, setState] = useState(false);
    const navigate = useNavigate();
    const joinRoom = () => {

        if (room.privacy === Privacy.PROTECTED)
            setState(true);
        else
        {
            joinRoomHandler(room);
            navigate(`/channels/ROOM/${room.id}`);
        }
    }

    return <>

        <div className=" bg-white rounded-lg w-fit h-fit sm:w-40  lg:w-[24rem] lg:h-96 border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img className="rounded-t-lg object-cover sm:w-40 sm:h-48 lg:w-[24rem] lg:h-48" src={room.avatar} alt="" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2  text-md lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{room.name}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{room.description}</p>
                <button onClick={joinRoom} className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-emerald-500 rounded-lg hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Join Channel
                    <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    {
                        state && <PasswordInput setState={setState} room={room} />
                    }
                </button>
            </div>
        </div>

    </>
}

const SearchBox: React.FC<{

}> = ({ }) => {

    const [state, setState] = useState("hidden");
    const changeState = () => {
        if (state === "hidden")
            setState("visible");
        else
            setState("hidden");
    }

    return <>


        <form>
            <div className="flex">
                <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Your Email</label>
                <button onClick={changeState} id="dropdown-button" data-dropdown-toggle="dropdown" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">All categories <svg aria-hidden="true" className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></button>
                <div id="dropdown" className={`${state} h-auto z-10 w-44 bg-white rounded  divide-gray-100 shadow dark:bg-gray-70 absolute  inset-0 mt-1 mx-0 translate-x-4 translate-y-16`} data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom" >
                    <ul className=" absolute py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                        <li>
                            <button type="button" className="inline-flex py-2 px-4 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Public Channels</button>
                        </li>
                        <li>
                            <button type="button" className="inline-flex py-2 px-4 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Protected Channels</button>
                        </li>
                    </ul>
                </div>
                <div className="relative w-full">
                    <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-l-sm rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." />
                    <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-emerald-500  rounded-l-sm rounded-r-lg border border-emerald-500 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div>
        </form>


    </>
}


const PasswordInput : React.FC <{
    setState : React.Dispatch<React.SetStateAction<boolean>>;
    room : roomModal;
}> = ({setState, room}) =>
{
    const socket = useContext(SocketContext);
    const navigate = useNavigate();
    const toast = useToast();

    const joinRoomHandler = (room: roomModal, password?: string) => {
		socket.emit("joinGroup_client", {
			id_group: room.id,
			password: password,
		}, (data : any) => {
            console.log("data - ", data)
            if (data === false)
            {
                toast({
                    title: `Room join`,
                    description: `Wrong Room Password`,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
                closeModal();
            }
            // console.log(data);
        });
        socket.on("joinGroup_server", (data) => {
            closeModal();
            navigate(`/channels/ROOM/${room.id}`);
            toast({
                title: `Room join`,
                description: `New Room joined`,
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
        })
	};
    const passwordRef = useRef<HTMLInputElement>(null);
    const { register, handleSubmit, setError, formState: { errors } } = useForm<{password: string}>();
    const closeModal = () => {

        setState(false);

    };

    const submitForm : SubmitHandler<{password : string}> = (data) => {
         joinRoomHandler(room, data.password);
        

    }

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
                        <h2 className="mt-6 text-center text-xl font-bold text-white">The Room is locked  </h2>
                        <h4 className="mt-6 text-center text-white">Enter The Password </h4>
                    </div>
                    <div className="h-auto w-full overflow-y-scroll scrollbar-hide">
                        <form className="space-y-2 gap-y-3" onSubmit={handleSubmit(submitForm)}>
                            <div className="flex flex-col gap-3 ml-3 w-5/6">
                            <input type={"password"} className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700" {...register("password", { required: true  })} />
                            </div>
                        </form>
                    </div>
                    <div className="h-1/6 w-full bg-discord_secondSideBar">
                        <div className="flex flex-row justify-end items-center mt-3">
                            {/* <BasicButtons onClick={closeModal} text={"Cancel"} /> */}
                            <BasicButtons onClick={handleSubmit(submitForm)} text={"Submit"} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
</>
}

export default ChannelsDisplay