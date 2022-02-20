import React, { useEffect, useRef, useState} from 'react'
import axios from "axios";
import "./register.css"
import { useNavigate } from 'react-router-dom';

function Register() {

    const navigate = useNavigate();
    const username= useRef();
    const email = useRef();
    const password = useRef();
    const rePassword = useRef();
    const [message, setmessage] = useState("");
    const [isMessage, setisMessage] = useState(false);

    const registrationHandler = async (e)=>{
        e.preventDefault();
        if(password.current.value === rePassword.current.value){
            const user = {
                username:username.current.value,
                email: email.current.value,
                password:password.current.value
            }

            try{
                const res = await axios.post("http://localhost:3000/api/auth/register", user);
                setmessage(res.data);
                username.current.value="";
                email.current.value="";
                password.current.value="";
                rePassword.current.value="";
                setisMessage(true);

            }catch(err){
                console.log(err);
            }    
        }
        else{
            alert("Password mismatch");
        }
    }

    const toLogin =()=>{
       navigate("/login"); 
    }
    

    return (
        <div>
            <div className="login">
                <div className="loginWrapper">
                    <div className="loginLeft">
                        <h3 className="loginLogo">SocioWick</h3>
                        <span className="loginDesc">
                            Enjoy your time with friends virtually through SocioWick
                            </span>
                    </div>
                    <div className="loginRight">
                        <form className="loginBox" onSubmit={registrationHandler}>
                            <input placeholder="Username" className="loginInput" ref={username} required/>

                            <input placeholder="Email" type = "email" className="loginInput" ref={email} required/>

                            <input placeholder="Password" type="password" className="loginInput" min = "6" ref={password} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                             title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required/>

                            <input placeholder="Reconfirm - Password" type="password" className="loginInput" ref={rePassword} required/>
                            <button className="loginButton" type="submit">Sign Up</button>

                            <button className="loginregisterButton" onClick={toLogin}>Log Into Account</button>
                        </form>
                        <h4 className="message">{isMessage? message+" !!":""}</h4>
                    </div>  
                </div>
            </div>
        </div>
    )
}

export default Register
