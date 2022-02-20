import React from 'react'
import "./online.css"

function Online({user}) {
    return (
        <div>
             <li className="rightbarFriend">
                <div className="rightbarProfileImgContainer">
                    <img src={user.photo}  className="rightbarProfileImg" />
                    <span className="rightbarOnline"></span>
                </div>
                <span className="rightbarUsername">{user.userName}</span>
            </li>
        </div>
    )
}

export default Online
