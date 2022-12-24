import { ChatType } from "../Types/types";
import React from 'react';
import {Divider} from '@chakra-ui/react'


const ChatHeader: React.FC <{
    selectedUserDM : ChatType;
    choosenChat : ChatType;
}> = ({choosenChat, selectedUserDM}) =>
{
    return (<>
        <div className={"absolute top-0 flex-grow"}>
        <div className="w-full border-b dark-2-bg py-3 px-3 font-weight-bold  text-lg  p-4 ">
        <span className="text-gray-400">@</span>
			<span className="ml-2 text-white capitalize">
                {selectedUserDM.username === "" && choosenChat.username === "" && "Welcome To Transcendance Enjoy the Game !" }
				{ choosenChat.username === "Direct Messages" && (selectedUserDM.username || choosenChat.username) }
				{ choosenChat.username !== "Direct Messages" && choosenChat.username }
				</span>
        </div>
        </div>
    
    </>)
}

export default ChatHeader;