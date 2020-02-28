import React from 'react'
import './InfoBar.css'

const InfoBar = () => {
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} alt="online image" />
            <h3>Room Name</h3>
        </div>
        <div className="RightInnerContainer">
            <a href="/"><img src={closeIcon} alt="close image" /></a>
        </div>
    </div>
}

export default InfoBar;