import { useEffect, useRef } from "react";
import { ChatType, RoomType } from "../Types/types";



const MessageInput: React.FC <{
    // joinRoomHandler: (room: RoomType) => void;
    choosenChat: ChatType;
    isMemberOfRoom:  boolean
    sendMessage: (a: string) => void;
}> = ({ choosenChat, isMemberOfRoom, sendMessage}) => {
    const inputRef = useRef<HTMLInputElement>(null);

	const onSubmitForm = (e: any) => {
		e.preventDefault();
		sendMessage(inputRef.current!.value);
		// e.target.value.reset();
	};

    useEffect(() =>
    {
        // console.log(isMemberOfRoom);
        // console.log(`chosenChat = ${choosenChat._id}`)
    },[]);
    return <>

	<div className="absolute inset-x-0 bottom-0 h-16 ml-96 mr-20">
			{!isMemberOfRoom && (
				<div className="mb-3 flex align-items-center justify-content-between">
					<p className="m-0 font-weight-bold gray-color text-uppercase">
						You are not member in Room {choosenChat.username}
					</p>
					<button
						className="btn main-btn font-weight-bold text-uppercase"
						
					>
						Join {choosenChat.username}
					</button>
				</div>
			)}
			{isMemberOfRoom && choosenChat._id !== "" && (
				<form className="form-group" onSubmit={onSubmitForm}>
					<input
						type="text"
						className="form-control main-input"
						id="exampleFormControlInput1"
						placeholder={`Message @${choosenChat.username}`}
						ref={inputRef}
					/>
				</form>
			)}
		</div>
    </>
}

export default MessageInput;