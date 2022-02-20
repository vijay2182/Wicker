import React, { useContext, useEffect, useState } from 'react'
import "./profile.css"
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

function Profile() {

    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;


    return (
        <>
        <Topbar/>
        <div className="profile">
            <Sidebar/>
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        <img src={user.coverPicture ? PF+user.coverPicture : "Assets/Person/NoAvatar.png"} alt="" className="profileCoverImg" />
                        <img src={user.profilePicture ? PF+user.profilePicture : "Assets/Person/NoAvatar.png"} alt="" className="profileUserImg" />  
                    </div>
                </div>
                <div className="profileInfo">
                    <h4 className="profileInfoName">{user.username}</h4>
                    <span className="profileInfoDescription">{user.desc}</span>
                </div>
                <div className="profileRightBottom">
                    <Feed/>
                    <Rightbar/>
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile
