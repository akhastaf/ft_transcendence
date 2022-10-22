import React, { useEffect, useState } from 'react';
// import ChatBar from './ChatBar';÷
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

const ChatPage = ({ socket } : any) => {
  const [messages , setMessages] = useState([]);

  useEffect(() => {
    // socket.on('messageResponse', (data : never) => setMessages([...messages  , data] ));
  }, [socket, messages]);

  return (
    <div className="chat">
      {/* <ChatBar socket={socket} /> */}
      <div className="chat__main">
        <ChatBody messages={messages} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;