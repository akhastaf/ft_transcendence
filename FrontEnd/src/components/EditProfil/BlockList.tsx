import { Heading, List } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { IoCloseCircleSharp } from "react-icons/io5"
import { getBlockedList, getCurrentUser } from "../Services/user"
import { userModel, UserType } from "../Types/types"


const BlockList : React.FC <{
    currentUser : UserType
    closeModal: () => void
}> = ({currentUser, closeModal}) => {

    const [blocked , setBlocked] = useState<UserType>()

    getCurrentUser().then((res) => {
        setBlocked(res);
    })
    return(
    <>
<div className="flex h-full flex-col gap-5 ">
            <div id="up div" className="flex flex-row  justify-around ">
                <h1 className="float-left font-bold left-0"> My Block List </h1>
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

                     <div className="p-4 w-full  bg-gradient-to-r from-pink-500 to-yellow-500  rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 overflow-y-scroll scrollbar-hide">
                     <div className="flex justify-between items-center mb-4">
                         <h5 className="text-xl font-bold leading-none text-white dark:text-white">Blocked Users</h5>
                    </div>
                    <div className="flow-root">
                         <ul  className=" divide-y divide-gray-200 dark:divide-gray-700">
                            {
                                (!blocked?.bloked) ? <Heading className="text-black arcade"> You Have No blocked Users Yet, Be More Toxic</Heading> : 
                                blocked?.bloked.map((blocked: UserType) => (
                                   <List key={blocked.id} > <BlockCard currentUser={blocked}/></List>

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



const BlockCard : React.FC <{
    currentUser : UserType
}> = ({currentUser}) => {
    return(
    <>
          <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <img className="w-12 h-12 rounded-full" src={currentUser.avatar} alt="user"/>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-lg font-medium arcade text-white truncate dark:text-white">
                            {currentUser.username}
                        </p>
                        <p className="text-sm  text-beige_color truncate dark:text-gray-400">
                            {currentUser.status}
                        </p>
                    </div>
                </div>
            </li>
    </>)
}

export default BlockList;