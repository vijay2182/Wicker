import React from 'react'
import "./closeFriend.css"

function CloseFriend({user}) {
    return (
        <div>
             <li className="rightbarFriend">
                <img src={user.photo}  className="sidebarFriendImg" />
                <span className="sidebarFriendName">{user.userName}</span>
            </li>
        </div>
    )
}

export default CloseFriend
