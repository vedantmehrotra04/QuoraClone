import React, {useState} from 'react';
import "./Login.css";
import {auth} from "./Firebase";

import { useDispatch } from 'react-redux';
const Login =() =>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();

    const handleSignIn =() => {
      auth
      .signInWithEmailAndPassword(email, password)
        .then(user => {
            console.log(user);
            
        })
        .catch(err =>{
            alert(err.message);
        })
    }

    const handleSignup =() => {
      auth
      .createUserWithEmailAndPassword(email, password)
        .then(user => {
            console.log(user,"user");
            dispatch({type : "login", payload: user})
        })
        .catch(err => {
            alert(err.message);
        })
    }
    return (
        <div className='login'>
            <div className="login__logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Quora_logo_2015.svg/250px-Quora_logo_2015.svg.png"
            alt=""
          />
        </div>
        <div className="login__desc">
        <p>A Place to Share knowledge and better understand the world</p>
        </div>
       <div className="input">
        <div className="login__inputFields">
              <div className="login__inputField">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div className="login__inputField">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="login__forgButt">
              <small>Forgot Password?</small>
              
            </div>
            <button onClick={handleSignIn} style={{marginBottom : "5px"}}>Login</button>
            <button onClick={handleSignup}>Register</button>
            </div>
            </div>
        </div>
    )
}

export default Login;