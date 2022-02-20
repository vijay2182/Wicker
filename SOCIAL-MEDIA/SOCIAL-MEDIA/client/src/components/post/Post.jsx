import React, { useContext, useEffect } from 'react'
import "./post.css"
import {MoreVert} from '@mui/icons-material/';
import {Users} from "../../dummyData"
import {useState} from "react";
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

function Post({post}) {

    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const {user} = useContext(AuthContext);

    const [postUser, setPostUser] = useState({});



    useEffect(async ()=>{
        const res = await axios.get(`http://localhost:3000/api/users/${post.userId}`);
        setPostUser(res.data);
        console.log(post);
    },[user._id, post.likes]);

    const likeHandler = async ()=>{
        await axios.post("http://localhost:3000/api/posts/like", {postId:post._id, userId:user._id});
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }
    
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img src={postUser.profilePicture} alt="" className="postProfileImg" />
                        <span className="postUserName">{postUser.username}</span>
                        <span className="postDate">{post.createdAt}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={post.img} className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postbottomLeft">
                        <img src="Assets/Posts/like.png"  className="likeIcon" onClick={likeHandler} />
                        <img src="Assets/Posts/heart.png" className="likeIcon" onClick ={likeHandler}/>
                        <span className="likeCounter">{like}</span>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Post
