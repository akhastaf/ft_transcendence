import { ChatType } from "../Types/types";
import React from 'react';


const ChatHeader: React.FC <{
    selectedUserDM : ChatType;
    choosenChat : ChatType;
}> = ({choosenChat, selectedUserDM}) =>
{
    return (<>
    
        <div className="fixed top-0 w-full dark-2-bg py-3 px-3 font-weight-bold  text-lg border-b p-4 border-gray-800 ">
        <span className="text-gray-400">@</span>
			<span className="ml-2 text-white capitalize">
                {selectedUserDM.username === "" && choosenChat.username === "" && "Welcome To Transcendance Enjoy the Game !" }
				{ choosenChat.username === "Direct Messages" && (selectedUserDM.username || choosenChat.username) }
				{ choosenChat.username !== "Direct Messages" && choosenChat.username }
				</span>
        </div>
    
    </>)
}

export default ChatHeader;