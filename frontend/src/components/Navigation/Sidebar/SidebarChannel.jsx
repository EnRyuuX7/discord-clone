import React from "react";
import "./SidebarChannel.scss";

function SidebarChannel({ id, channelName }) {

    return (
        <div className="sidebarChannel">
            <h4>
                <span className="sidebarChannel__hash"># generals</span>
                {channelName}
            </h4>
        </div>
    );
}

export default SidebarChannel;