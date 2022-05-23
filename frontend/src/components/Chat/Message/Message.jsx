import React, { useState, useEffect, useRef } from 'react'
import './Message.modules.scss';

function Message({ socket }) {
    const messageEl = useRef(null);
    const [messages, setMessages] = useState({});

    useEffect(() => {
        if (messageEl) {
            messageEl.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
    }, [])

    useEffect(() => {
        const messageListener = (message) => {
            setMessages((prevMessages) => {
                const newMessages = { ...prevMessages };
                newMessages[message.id] = message;
                return newMessages;
            });
        }
        socket.on("message", messageListener);
        socket.emit('getMessages');

        return () => {
            socket.off('message', messageListener);
        };
    }, [socket]);



    return (
        <div className="chat__messagesWrapper" ref={messageEl}>
            <div className='chat__messages'>
                {[...Object.values(messages)]
                    .sort((a, b) => a.time - b.time)
                    .map((message) => (
                        <div className='chat__messageItemWrapper' key={message.id} title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}>
                            <div className='chat__messageItemImage'></div>
                            <div className='chat__messageItem'>
                                <div className='chat__messageItemHeader'>
                                    {message.user}
                                    <span className='chat__messageDate'>{new Date(message.time).toLocaleTimeString()}</span>
                                </div>
                                <div className='chat__messageItemInfo'>
                                    {message.msg}
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default Message