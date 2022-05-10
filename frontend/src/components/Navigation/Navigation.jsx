import React from 'react'
import Server from './Server/Server'
import Sidebar from './Sidebar/Sidebar'

function Navigation() {
    return (
        <div className='nav'>
            <Server />
            <Sidebar />
        </div>
    )
}

export default Navigation