import React,{useState, useEffect} from "react";
import pic from "../bellingrath-gardens-alabama-landscape-scenic-158028.jpeg";
import { Avatar } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import {doc, setDoc, collection, addDoc, Timestamp } from "firebase/firestore"; 
import { db } from "./Firebase";
import firebase from "firebase";
import { useSelector } from "react-redux";
const Post =(props) => {
    const [open,setOpen] = useState(false);
    const {user} = useSelector(state=> state);
    const handleClose =() => {
        setOpen(!open);
    }
    const [answer,setAnswer] = useState("");
    const [answerList, setAnswerList] = useState([]);
    const handleAdd = async() => {
        if(answer.length == 0){
            return;
        }
        db.collection("questions").doc(props.id).collection("answer").add( {
            answer : answer,
            username : user.email,
            created: firebase.firestore.FieldValue.serverTimestamp(),
          })

    }

    useEffect(()=> {
        if(props.id){
        db.collection("questions")
        .doc(props.id)
        .collection("answer")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) =>
          setAnswerList(
            snapshot.docs.map((doc) => {
                console.log(doc.data(),"check");
               return  { id: doc.id, answers: doc.data() }})
          )
        );
            }
    },[props.id])

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
    return (
        <>
        {console.log(props.id,"id")}
        <div className="post">
            <div className="post_heading">
            <Avatar
            sx={{ height: 35,width: 30 }}
            >I</Avatar>
            <p style={{fontWeight: 700}}>{props.username}</p>
            <button className="add_btn" onClick={()=> setOpen(true)}>Answer</button>
            </div>
            
            <div className="post_caption">
                <p style={{fontWeight:500}}>{props.question}</p>
            </div>
            <div className="answers">
                {answerList.length>0 &&  answerList?.map(item => {
                    return (<div className="answer_single">
                        <div style={{fontStyle:"serif"}}>
                            {item.answers.answer}
                        </div>
                        <div className="answers_header">
                            <p style={{color: "#b92b27"}}>{item.answers.username}</p>
                            <p className="timestamp">{item.answers.created?.toDate().toLocaleString()}</p>
                        </div>
                    </div>)
                })}
            </div>

            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Box sx={style}>
             <div className="modal_header">
         <h1>{props.question}</h1>
         <p>Question by {props.username}</p>
         </div>
         <div className="modal_answer">
         <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter Your Answer"
                type="text"
              />

           
          <button onClick={handleAdd}>
                Add Answer
              </button>
              </div>
        </Box>
      </Modal>

        </div>
        </>
    )
}

export default Post;