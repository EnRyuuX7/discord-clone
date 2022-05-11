import React, { useState, useEffect } from 'react'
import './Message.modules.scss';

function Message({ socket }) {
    const [messages, setMessages] = useState({});

    useEffect(() => {
        const messageListener = (message) => {
            setMessages((prevMessages) => {
                const newMessages = { ...prevMessages };
                newMessages[message.id] = message;
                return newMessages;
            });
        }
        console.log(socket);
        socket.on("chat message", messageListener);
        socket.emit('getMessages');

        return () => {
            socket.off('message', messageListener);
        };
    }, [socket]);

    return (
        <div className='chat__messages'>
            {[...Object.values(messages)]
                .sort((a, b) => a.time - b.time)
                .map((message) => (
                    <div className='chat__messageItemWrapper' key={message.id} title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}>
                        <div className='chat__messageItemImage'></div>
                        <div className='chat__messageItem'>
                            <div className='chat__messageItemHeader'>
                                {message.username}
                                <span className='chat__messageDate'>{new Date(message.time).toLocaleTimeString()}</span>
                            </div>
                            <div className='chat__messageItemInfo'>
                                {message.value}
                            </div>
                        </div>
                    </div>
                ))
            }

        </div>
    )
}

export default Message