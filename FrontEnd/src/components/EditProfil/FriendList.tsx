import { List, Text } from "@chakra-ui/react"
import { useState } from "react"
import { IoCloseCircleSharp } from "react-icons/io5"
import { BlockFriend, getCurrentUser } from "../Services/user"
import { UserType } from "../Types/types"


const FriendList : React.FC <{
    currentUser : UserType
    closeModal: () => void
}> = ({currentUser, closeModal}) => {

    const [userInfo, setUserInfo] = useState<UserType>();


    getCurrentUser().then((res) => {
        setUserInfo(res);
    })
    return(
    <>

<div className="flex h-full flex-col gap-5 ">
            <div id="up div" className="flex flex-row  justify-around ">
                <h1 className="float-left font-bold left-0"> My Friend List </h1>
                <button
                    className=" bg-transparant  text-black  float-right text-3xl leading-none font-semibold"
                    onClick={closeModal}
                >
                    <IoCloseCircleSharp className="text-emerald-400" />
                </button>
            </div>
            <div className="flex h-auto  mt-11 ">
                <div id="down div" className="h-full flex w-full m-auto  flex-row ">
                    <div className="w-1/6"></div>
                    <div className="flex flex-col h-[40rem] w-[80rem]">

                     <div className="p-4 w-full  bg-gradient-to-r from-green-400 to-blue-500 rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 overflow-y-scroll scrollbar-hide">
                     <div className="flex justify-between items-center mb-4">
                         <h5 className="text-xl font-bold leading-none text-white dark:text-white">Friends</h5>
                    </div>
                    <div className="flow-root">
                         <ul role="list" className=" divide-y divide-gray-200 dark:divide-gray-700">
                            {
                                (userInfo?.friends?.length === 0) ? <Text className="text-black arcade"> You Have No Friends Yet</Text> :
                                userInfo?.friends?.map((friend: UserType) => (
                                   <List key={friend.id.toString()}> <FriendCard currentUser={friend}/></List>

                                ))
                            }
                         </ul>
                     </div>
                     </div>
                     </div>
                    </div>
                    </div>
                    </div>
    </>)
}



const FriendCard : React.FC <{
    currentUser : UserType
}> = ({currentUser}) => {
    return(
    <>
          <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <img className="w-12 h-12 rounded-full" src={currentUser.avatar} alt="Neil image"/>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-lg font-medium arcade text-white truncate dark:text-white">
                            {currentUser.username}
                        </p>
                        <p className="text-sm  text-beige_color truncate dark:text-gray-400">
                            {currentUser.email}
                        </p>
                    </div>
                    <div className="inline-flex items-center arcade text-base font-semibold text-gray-900 dark:text-white">
                        {currentUser.status}
                    </div>
                    <div className="inline-flex items-center arcade text-base font-bold text-green-300 dark:text-white">
                        won : {currentUser.win}
                    </div>
                    <div className="inline-flex items-center arcade text-base font-bold text-red-500 dark:text-white">
                        lost : {currentUser.loss}
                    </div>
                    <div className="inline-flex items-center whitespace-pre arcade text-base font-bold text-yellow-500 dark:text-white">
                        Best Achievement : {currentUser?.achievments ? currentUser?.achievments?.at(-1)?.type : "No Achivement yet"}
                    </div>
                </div>
            </li>
    </>)
}

export default FriendList;