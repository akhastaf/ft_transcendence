import { IoCloseCircleSharp } from "react-icons/io5"
import { Userstatus, UserType } from "../Types/types"



const FriendListRequest : React.FC <{
    currentUser : UserType
    closeModal: () => void
}> = ({currentUser, closeModal}) => {
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
                         <h5 className="text-xl font-bold leading-none text-white dark:text-white">Friend request</h5>
                    </div>
                    <div className="flow-root">
                         <ul role="list" className=" divide-y divide-gray-200 dark:divide-gray-700">
                            {/* {
                                (currentUser.friends.length === 0) ? <li className="text-black arcade"> You Have No Friends Yet</li> :
                                currentUser.friends.map((friend: UserType) => (
                                   <li> <FriendCard currentUser={friend}/></li>

                                ))
                            } */}
                         <FriendCard currentUser={currentUser}/>
                         <FriendCard currentUser={currentUser}/>
                         <FriendCard currentUser={currentUser}/>
                         <FriendCard currentUser={currentUser}/>
                         <FriendCard currentUser={currentUser}/>
                         <FriendCard currentUser={currentUser}/>
                         <FriendCard currentUser={currentUser}/>
                         <FriendCard currentUser={currentUser}/>
                         <FriendCard currentUser={currentUser}/>
                         <FriendCard currentUser={currentUser}/>
                         <FriendCard currentUser={currentUser}/>
                         <FriendCard currentUser={currentUser}/>
                         <FriendCard currentUser={currentUser}/>
                         <FriendCard currentUser={currentUser}/>
                         <FriendCard currentUser={currentUser}/>
                         <FriendCard currentUser={currentUser}/>
                         <FriendCard currentUser={currentUser}/>
                         <FriendCard currentUser={currentUser}/>
                         <FriendCard currentUser={currentUser}/>
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
    currentUser.status = Userstatus.PLAYING;
    let color : string = currentUser.status === Userstatus.ONLINE ? "text-green-300" : currentUser.status === Userstatus.OFFLINE ? "text-red-700" : "text-blue-700";
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
                    <div className={`inline-flex items-center arcade text-base font-semibold ${color}`}>
                        {currentUser.status}
                    </div>
                    </div>
                    <div className="inline-flex items-center arcade text-base font-bold text-green-300 dark:text-white">
                    <a href="#" className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a>
                    </div>
                    <div className="inline-flex items-center arcade text-base font-bold text-red-500 dark:text-white">
                     <a href="#" className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Message</a>
                    
                    </div>
                    <div className="inline-flex items-center arcade text-base font-bold text-red-500 dark:text-white">
                     <a href="#" className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-red-500 rounded-lg border border-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Decline</a>
                    
                    </div>
                </div>
            </li>
    </>)
}

export default FriendListRequest ;