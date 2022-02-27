import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import "./Navbar.css";
import SearchIcon from "@material-ui/icons/Search";
import { auth } from "./Firebase";
const Navbar =() =>{

    return(<div className="header">
        <div className="header_img">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Quora_logo_2015.svg/250px-Quora_logo_2015.svg.png"
          alt=""
        />
        </div>
       
        <HomeIcon />
        <div className="qHeader__input">
        <SearchIcon />
       <input type="text" placeholder="Quora Search" />
       
       </div>
       <button style={{borderRadius: "5px",
    border: "none",
    cursor: "pointer"}} onClick={()=> auth.signOut()}>Logout</button>
    </div>)
}

export default Navbar;