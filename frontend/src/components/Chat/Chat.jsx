import React, { useState, useEffect } from 'react';
import ChatHeader from './ChatHeader/ChatHeader';
import Message from './Message/Message';
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import { io } from "socket.io-client";



function Chat() {
    const [socket, setSocket] = useState();

    useEffect(() => {
        const socket = io("http://localhost:3001");
        setSocket(socket);

        return () => socket.close();

        // socket.on("chat message", function (msg) {
        //     setMessage(msg);
        // });
        //     // let item = document.createElement("li");
        //     // item.textContent = msg;

        //     // messages.appendChild(item);
        //     // window.scrollTo(0, document.body.scrollHeight);

    }, [setSocket]);

    return (
        <div id='chat'>
            <ChatHeader></ChatHeader>
            {socket ? (
                <Message socket={socket} />
            ) : (
                <div>Not Connected</div>
            )}
            <div className='chat__input'>
                <AddCircleIcon fontSize="large" />
                <input placeholder="Message #test-channel" />
                <div className='chat__inputIcons'>
                    <CardGiftcardIcon fontSize="large" />
                    <GifIcon fontSize="large" />
                    <EmojiEmotionsIcon fontSize="large" />
                </div>
            </div>

        </div>

    )
}

export default Chat;