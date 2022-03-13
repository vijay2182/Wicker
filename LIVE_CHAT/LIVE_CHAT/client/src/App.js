import './App.css';
import React, { useEffect, useState } from "react";
import io from 'socket.io-client';

let socket;
const CONNECTION_PORT = 'localhost:3001/';

function App() {
  
  //Before Login
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom]= useState('');
  const [username, setusername] = useState('');

  //After Login
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket  = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  useEffect(() =>{
    socket.on("receive_message", (data) =>{
      setMessageList([...messageList, data]);
    });
  });

  const connectToRoom = () => {
    if(username.valueOf() === '' || room.valueOf() === ''){
      alert("Username or Room id is missing");   
    }
    else{
      socket.emit('join_room', {room:room, username:username});
      setLoggedIn(true);
    }
  
  }

  const sendMessage = () =>{
    let messageContent ={
      room:room,
      content:{
        author:username,
        message:message
      }
    }
    setMessage("");
    socket.emit('send_message', messageContent);
    
  }

  return (
    <div className="App">
      {!loggedIn ? (
        <div className = "Login">
          <div className ="input">
          <input type="text" placeholder="Name...."  onChange = {(e) => {
            setusername(e.target.value);
          }}/>
          <input type="text" placeholder="Room...."  onChange ={(e) => {
            setRoom(e.target.value);
          }}/>
          </div>
          <button onClick = {connectToRoom}>Enter chat</button>
        </div>
      ): (
        <div className = "chatContainer">
          <div className = "messages">
          {messageList.map((val,key) =>{
            return (
            <div key = {key} className ="messageContainer" id = {val.author == username ? "you" : "other"}>
            <div className = "individualMessage"> 
              {val.author} : {val.message}
            </div>
            </div>
            );
          })}
          </div>
          <div className = "messageInputs"> 
            <input type="text" placeholder="Message.." value = {message} onChange ={(e) =>{
              setMessage(e.target.value);
            }}/>
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
