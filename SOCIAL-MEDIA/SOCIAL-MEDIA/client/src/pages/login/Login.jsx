import axios from 'axios';
import React, { useContext, useRef, useState } from 'react'
import { loginCall } from '../../ApiCalls';
import { AuthContext } from '../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import "./login.css"
import { useNavigate } from 'react-router-dom';

function Login() {

    const email = useRef();
    const password = useRef();
    const{user, isFetching, error, dispatch} = useContext(AuthContext);
    const navigate = useNavigate();


    const handleSubmit = async (e)=>{
        e.preventDefault();
        await loginCall({email:email.current.value, password:password.current.value}, dispatch);
        navigate("/");
    }


    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">SocioWick</h3>
                    <span className="loginDesc">
                        Enjoy your time with friends virtually through SocioWick
                        </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleSubmit}>
                        <input placeholder="Email" type= "email" className="loginInput" ref={email} required/>
                        <input placeholder="Password" type="password" className="loginInput" ref={password} required/>
                        <button type="submit" className="loginButton" disabled={isFetching}>
                            {isFetching ? <CircularProgress size="15px" color="white"/>: "Log In"}</button>
                        <span className="loginForgot">ForgotPassword?</span>
                        <button  className="loginregisterButton" disabled={isFetching}>
                            {isFetching ? <CircularProgress size="15px" color="white"/>: "Create Your Account"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
