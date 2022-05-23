import React, { useState, useContext } from 'react'
import '../Chat.modules.scss'
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import AuthContext from '../../../Context/AuthContext'


function ChatInput({ socket }) {
    const ctx = useContext(AuthContext);
    const [value, setValue] = useState({
        username: "",
        msg: "",
    });


    const submitForm = (e) => {
        e.preventDefault();
        if (value.msg == "") {
            setValue({ msg: "" });
        }
        else {
            socket.emit('message', value);
            setValue({ msg: "" });
        }


    };
    return (
        <form className='chat__input' onSubmit={submitForm}>
            <AddCircleIcon fontSize="large" />
            <input autoFocus placeholder="Message #test-channel" value={value.msg} onChange={(e) => { setValue({ username: ctx.username, msg: e.currentTarget.value }) }} />
            <div className='chat__inputIcons'>
                <CardGiftcardIcon fontSize="large" />
                <GifIcon fontSize="large" />
                <EmojiEmotionsIcon fontSize="large" />
            </div>
        </form>
    )
}

export default ChatInput