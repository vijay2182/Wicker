import React from 'react'
import "./rightbar.css"
import {Users} from "../../dummyData"
import Online from '../online/Online'

function Rightbar({profile}) {

    const HomeRightbar =() => {
        return (
            <div className="rightbar">
                <div className="rightbarWrapper">
                    <div className="birthdayContainer">
                        <img src="Assets/Posts/gift.png" className="birthdayImg" />
                        <span className="birthdayText">
                            <b>Christian Bale</b> and <b>3 other friends</b>  birthday today
                        </span>
                    </div>
                    <img src="Assets/Posts/ad.jpg" className="rightbarAd" />
                    <h4 className="rightbarTitle">Online Friends</h4>
                    <ul className="rightbarFriendList">
                    {Users.map(u=>(
                        <Online key={u.id} user ={u}/>
                    ))}
                    </ul>
                </div>
            </div>
        )
    }

    const ProfileRightbar = () =>{
        return (
            <>
            <h4 className="rightbarTitle">User Information</h4>
            <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfokey">City:</span>
                    <span className="rightbarInfovalue">Chennai</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfokey">From:</span>
                    <span className="rightbarInfovalue">Chennai</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfokey">Relationship:</span>
                    <span className="rightbarInfovalue">Single</span>
                </div>    
            </div>
            <h4 className="rightbarTitle">User friends</h4>
            <div className="rightbarFollowings">
                <div className="rightbarFollowing">
                    <img src="Assets/Person/2.jpg" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">Christian Bale</span>
                </div>
                <div className="rightbarFollowing">
                    <img src="Assets/Person/2.jpg" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">Christian Bale</span>
                </div>
                <div className="rightbarFollowing">
                    <img src="Assets/Person/2.jpg" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">Christian Bale</span>
                </div>
                <div className="rightbarFollowing">
                    <img src="Assets/Person/2.jpg" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">Christian Bale</span>
                </div>
                <div className="rightbarFollowing">
                    <img src="Assets/Person/2.jpg" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">Christian Bale</span>
                </div>
                
            </div>
            </>
        )
    }
    return(
        <div className="rightbar">
                <div className="rightbarWrapper">
                    {profile ? <ProfileRightbar/> : <HomeRightbar/>}
                </div>
            </div>
    )
}

export default Rightbar
