import { useState,useEffect, useCallback} from "react";
import {useDropzone} from 'react-dropzone'
import axios from 'axios';

function MyDropzone({userProfileId}) {
    const onDrop = useCallback(acceptedFiles => {
      const file = acceptedFiles[0];
      console.log(file);

      const formData = new FormData();
      formData.append("file", file);

      axios.post(`http://localhost:8080/api/v1/user-profile/${userProfileId}/image/upload`, formData, 
      {
        headers:{
          "Content-Type": "multipart/form-data"
        }
      }).then(() => {
        console.log("File uploaded successfully")
      }).catch(err => {
        console.log(err)
      });

    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the image here ...</p> :
            <p>Drag 'n' drop profile image here, or click to select profile image</p>
        }
      </div>
    )
  }

const UserProfiles = ()=>{

    const [userProfiles, setuserProfiles] = useState([]);
  
    const fetchUserprofiles = ()=>{
      axios.get("http://localhost:8080/api/v1/user-profile").then(res => {
        setuserProfiles(res.data);
      });
    }
  
    useEffect(()=> {
      fetchUserprofiles();
    }, []);
  
    return userProfiles.map((userProfile,index) => {
      return <div key={index}>
        {userProfile.userProfileId ? <img src = {`http://localhost:8080/api/v1/user-profile/${userProfile.userProfileId}/image/download`}/> : null}
        <br/>
        <br/>
        <h1>{userProfile.userProfileId}</h1>
        <p>{userProfile.userName}</p>
        <MyDropzone userProfileId = {userProfile.userProfileId}/>
        <br/>
      </div>
    })
  
  }

  export default UserProfiles;