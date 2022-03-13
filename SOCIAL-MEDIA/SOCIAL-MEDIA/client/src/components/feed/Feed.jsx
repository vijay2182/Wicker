import React, { useContext, useEffect } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import "./feed.css"
import {useState} from "react"
import {Posts} from "../../dummyData.js"
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'


function Feed() {

    const {user} = useContext(AuthContext);

    const [posts, setposts] = useState([]);

    useEffect(async ()=>{
        const res = await axios.get(`http://localhost:3000/api/posts/timeline/${user._id}`);
        setposts(res.data);
    }, []);

    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share/>
                 {posts.map(p=>(
                     <Post key ={p.id} post = {p} />
                 ))}
            </div>
        </div>
    )
}

export default Feed
