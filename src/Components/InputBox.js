import React, {useState} from "react";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import "./InputBox.css";
import { db } from "./Firebase";
import firebase from "firebase";
const InputBox = () => {
    const {user} = useSelector(state => state);
    const [text, setText] = useState("");



    const handleAdd = async() => {
        if(!text){
            alert("Please Add a Question");
            return;
        }
        try {
          db.collection("questions").add( {
              question : text,
              username : user.email,
              created: firebase.firestore.FieldValue.serverTimestamp(),
            })
            
          } catch (err) {
            alert(err)
          }
          setText("");
    }
    return (
        <div className="input">
        <div className="heading">
            <Avatar />
            <h5>{user?.email}</h5>
        </div>
        <div className="add_text">
        <input placeholder="What is your question or link?" value={text} onChange={(e) =>setText(e.target.value)}/>
        <div className="add">
        <button onClick={handleAdd}>Add</button>
        </div>
      </div>
      </div>
    )
}


export default InputBox;