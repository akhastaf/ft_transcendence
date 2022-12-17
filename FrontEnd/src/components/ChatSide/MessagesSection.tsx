
import { useEffect, useRef } from "react";
import { ChatType, MessageModal, MessageType } from "../Types/types";
import moment from 'moment';
import MessageInput from "./MessageInput";




const MessagesSection : React.FC <{
    messages: MessageModal[];
	choosenChat: ChatType;
    isMemberOfRoom:  boolean
    sendMessage: (a: string) => void;

}> = ({messages,  choosenChat, isMemberOfRoom, sendMessage}) => {


	const messageListRef = useRef<HTMLDivElement>(null);
	// let rev : MessageModal[] = messages.reverse();

	useEffect(() => {
		messageListRef.current?.scrollIntoView({ behavior: "smooth" });

	}, [messages]);


    return (<>
    <div className="h-screen flex flex-col gap-10">
    <div  className="h-5/6 relative flex flex-col mt-[60px]  mb-[20px] gap-10 overflow-y-auto scrollbar-hide ">
			{messages.map((message: MessageModal, idx) => (
				
				message && <MessageCard
					key={message.userId + "" + idx}
					time={moment(message.date).format(
						"MMM D, YYYY [at] HH:mm"
					)}
					sender={message.userName}
					content={message.message}
					img={message.avatar}
				/>
			))}
			<div ref={messageListRef} />
		</div>
		<MessageInput
								choosenChat={choosenChat}
								isMemberOfRoom={isMemberOfRoom}
								sendMessage={sendMessage}
			/>
    </div>
    </>)
}

const MessageCard: React.FC<{
	content: string;
	sender: string;
	time: string;
	img : string;
}> = ({ content, sender, time , img}) => {
	
	return (
		<div className="flex items-center p-1 pl-5 my-0 mr-2 hover:bg-[#32353B] group">
			<img
				width={40}
				height={40}
				className="h-10 rounded-full cursor-pointer mr-3 hover:shadow-2x"
				// src={`${process.env.REACT_APP_AVATARS_URL}/api/avatar?name=${sender}`}
				 src={img}
				alt=""
			/>
			<div>
				<div className="flex gap-8">
					<span className=" text-white font-bold">{sender}</span>
					<span className="text-gray-400">{time}</span>
				</div>
				<div className="text-sm text-[#dcddde]" >{content}</div>
			</div>
			{/* <div
          className=" hover:bg-[#ed4245] p-1 ml-auto rounded-sm text-[#ed4245] hover:text-white cursor-pointer"
          onClick={() =>
            db
              .collection("channels")
              .doc(channelId)
              .collection("messages")
              .doc(id)
              .delete()
          }
        >
          <TrashIcon className="h-5 hidden group-hover:inline" />
        </div> */}
		</div>
	);
};

export default MessagesSection;