import React from 'react'
import Navigation from './Navigation/Navigation';
import Chat from './Chat/Chat';


function Container() {
    return (
        // <ChatContext.Provider
        //     value={{
        //         id
        //     }}>
        <>
            <Navigation />
            <Chat />
        </>
        // </ChatContext.Provider>
    )
}

export default Container