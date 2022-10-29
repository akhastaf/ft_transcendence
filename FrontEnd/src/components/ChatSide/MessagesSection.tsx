
import { useEffect, useRef } from "react";
import moment from "moment";
import { MessageType } from "../Types/types";



const channel1 = require('../../images/wolf.png');
const MessagesSection : React.FC <{
    messages: MessageType[];

}> = ({messages}) => {


	const messageListRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		messageListRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);


    return (<>
    
    <div className="flex-grow-1 m-4 d-flex flex-column gap-12 overflow-y-scroll">
			{messages.map((message: MessageType, idx) => (
				<MessageCard
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
		<div className="flex gap-12">
			<img
				width={40}
				height={40}
				className="rounded-full"
				// src={`${process.env.REACT_APP_AVATARS_URL}/api/avatar?name=${sender}`}
				 src={channel1}
				alt=""
			/>
			<div>
				<div className="flex gap-8">
					<span className="font-bold">{sender}</span>
					<span className="text-gray-300">{time}</span>
				</div>
				<div>{content}</div>
			</div>
		</div>
	);
};

export default MessagesSection;