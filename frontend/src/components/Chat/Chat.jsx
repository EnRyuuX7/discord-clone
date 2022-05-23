import React, { useState, useEffect } from 'react';
import ChatHeader from './ChatHeader/ChatHeader';
import Message from './Message/Message';
import ChatInput from './ChatInput/ChatInput';
import { io } from "socket.io-client";
import './Chat.modules.scss'



function Chat() {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socket = io("http://localhost:3001");
        setSocket(socket);

        return () => socket.close();

    }, [setSocket]);

    return (
        <div id='chat'>
            <ChatHeader></ChatHeader>
            {socket ? (
                <Message socket={socket} />
            ) : (
                <div>Not Connected</div>
            )}
            <ChatInput socket={socket} />
        </div>

    )
}

export default Chat;