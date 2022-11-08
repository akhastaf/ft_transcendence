import { ChatType } from "../Types/types";


const ChatHeader: React.FC <{
    selectedUserDM : ChatType;
    choosenChat : ChatType;
}> = ({choosenChat, selectedUserDM}) =>
{
    return (<>
    
        <div className="dark-2-bg py-3 px-3 font-weight-bold  text-lg border-b p-4 border-gray-800 ">
        <span className="text-gray-400">@</span>
			<span className="ml-2 text-white capitalize">
                {selectedUserDM.name === "" && choosenChat.name === "" && "Welcome To Transcendance Enjoy the Game !" }
				{ choosenChat.name === "Direct Messages" && (selectedUserDM.name || choosenChat.name) }
				{ choosenChat.name !== "Direct Messages" && choosenChat.name }
				</span>
        </div>
    
    </>)
}

export default ChatHeader;