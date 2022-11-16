
import { useEffect, useRef } from "react";
import { MessageType } from "../Types/types";
import moment from 'moment';



const channel1 = require('../../images/wolf.png');
const MessagesSection : React.FC <{
    messages: MessageType[];

}> = ({messages}) => {


	const messageListRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		messageListRef.current?.scrollIntoView({ behavior: "smooth" });
		console.log('===============================messages=====');
		console.log(messages);
		console.log('====================================');
	}, [messages]);


    return (<>
    
    <div className="flex-grow m-4 flex flex-col my-10 gap-12 overflow-y-scroll scrollbar-hide ">
			{messages.map((message: MessageType, idx) => (
				
				messages && <MessageCard
					key={message._id + "" + idx}
					time={moment(message.updatedAt).format(
						"MMM D, YYYY [at] HH:mm"
					)}
					sender={message.sendBy.username}
					content={message.content}
				/>
			))}
			<div ref={messageListRef} />
		</div>
    
    </>)
}

const MessageCard: React.FC<{
	content: string;
	sender: string;
	time: string;
}> = ({ content, sender, time }) => {
	return (
		<div className="flex items-center p-1 pl-5 my-0 mr-2 hover:bg-[#32353B] group">
			<img
				width={40}
				height={40}
				className="h-10 rounded-full cursor-pointer mr-3 hover:shadow-2x"
				// src={`${process.env.REACT_APP_AVATARS_URL}/api/avatar?name=${sender}`}
				 src={channel1}
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