import { ChatType } from "../Types/types";


const ChatHeader: React.FC <{
    selectedUserDM : ChatType;
    choosenChat : ChatType;
}> = ({choosenChat, selectedUserDM}) =>
{
    return (<>
    
        <div className="dark-2-bg py-3 px-3 font-weight-bold">
        <span className="gray-color">@</span>
			<span className="ml-2 text-capitalize">
				{ choosenChat.name === "Direct Message" && (selectedUserDM.name || choosenChat.name) }
				{ choosenChat.name !== "Direct Message" && choosenChat.name }
				</span>
        </div>
    
    </>)
}

export default ChatHeader;