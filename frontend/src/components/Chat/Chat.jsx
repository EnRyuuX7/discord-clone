import React from 'react';
import ChatHeader from './ChatHeader/ChatHeader';
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import { io } from "socket.io-client";

function Chat() {
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        const socket = io("http://localhost:3001");

        // let form = document.querySelector("form");
        // let input = document.querySelector("input");

        // form.onsubmit = message;

        // function message(e) {
        //     if (e.keyCode == 13) {
        //         e.preventDefault();
        //         if (input.value) {
        //             socket.emit("chat message", input.value);
        //             input.value = "";
        //         }
        //     }
        // }

        socket.on("chat message", function (msg) {
            // let item = document.createElement("li");
            // item.textContent = msg;
            console.log(msg);
            // messages.appendChild(item);
            // window.scrollTo(0, document.body.scrollHeight);
        });
    }, []);

    return (
        <div id='chat'>
            <ChatHeader></ChatHeader>
            <div className='chat__messages'></div>
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