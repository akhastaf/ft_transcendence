import { IoCloseCircleSharp } from "react-icons/io5";
import { UserType } from "../Types/types";

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
            selected === "My Profile" && <FriendList />
        }
        {
            selected === "Friend List" && <FriendList />
        }
        {
            selected === "Block List" && <FriendList />
        }
        {
            selected === "Friend Request" && <FriendList />
        }
        {
            selected === "Disconnect" && <FriendList />
        }
    </>)
}
export default Settings;


const UserCard: React.FC<{
    currentUser: UserType
    closeModal: () => void
}> = ({ closeModal, currentUser }) => {
    return <>
        <div className="flex h-full flex-col gap-10 ">
            <div id="up div" className="flex flex-row  justify-around ">
                <h1 className="float-left font-bold left-0"> My Account </h1>
                <button
                    className=" bg-transparant  text-black  float-right text-3xl leading-none font-semibold"
                    onClick={closeModal}
                >
                    <IoCloseCircleSharp className="text-emerald-400" />
                </button>
            </div>
            <div className="flex h-full flex-nowrap overflow-x-auto">
                <div id="down div" className="h-full flex w-full  flex-row ">
                    <div className="w-1/6"></div>
                    <div className="flex flex-col rounded-lg h-2/5 bg-gradient-to-r from-sky-500 to-indigo-500 w-full">
                        <div className="flex gap-x-1 border-2 border-red-200 flex-row pt-12 pl-12">
                        {/* <div className="h-19 ">

                        </div> */}
                        {/* <div className=" w-1/3 flex flex-col"> */}
                        <img
                            src={currentUser.avatar}
                            alt=""
                            className="h-28 rounded-full"
                        />
                        {/* <div className="p-10"> */}
                        <h1 className="arcade  text-white p-10  "> {currentUser.username}</h1>
                        <h1 className="arcade  text-gray-400 p-10"> # {" " + currentUser._id}</h1>

                            <button className="bg-main_color h-1/2 rounded-lg p-10 text-white">
                                <h1 className="text-center">Modify Your User Profile</h1>
                            </button>
    
                        </div>
                        <div className="h-10">

                        {/* </div> */}
                        </div>
                        {/* </div> */}
                    </div>
                    <div className="lg:w-1/6"></div>
                </div>
            </div>
        </div>
    </>
};


const FriendList: React.FC<{

}> = ({ }) => {
    return <>
        <div>
        </div>
    </>
};