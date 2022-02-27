import React, {useState, useEffect} from 'react';
import './App.css';
import logo from "./Instagram_logo_wordmark_logotype.png";
import Posts from "./Components/Posts";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import {auth} from "./Components/Firebase";
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';


import Login from "./Components/Login";
import {useDispatch, useSelector} from "react-redux";
function App() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const {user} = useSelector(state=>state);
  const handleClose =() => {
    setOpen(!open);
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const handleSignup =() =>{
    auth
    .createUserWithEmailAndPassword(email, password)
   .then(res => {
     console.log(res,"res");
     dispatch({type: "add", payload: res.user})
   })
   setOpen(!open);
  }


  const handleLogout =() =>{
    auth.signOut()
    .then(res=> {
      console.log(res);
      dispatch({type: "add", payload: null})
    })
  }

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser) 
       {
        dispatch({ type: "logout"});
      }
      else {
        dispatch({type : "login", payload: authUser})
      }
      console.log(authUser);
    });
  }, [dispatch]);
  return (
    <div className="App">
      {user ?  <Posts /> :
      <Login />}
      {/* <Posts /> */}
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      ><>
       <Box sx={style}>
       <input type="text" placeholder="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
       <input type="password" placeholder="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
       <button onClick={handleSignup}>Signup</button>
       </Box>
       </>
      </Modal> */}
    </div>
  );
}

export default App;
