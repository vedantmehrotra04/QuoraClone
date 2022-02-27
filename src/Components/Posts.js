import React,{useEffect, useState} from 'react';
import pic from "../bellingrath-gardens-alabama-landscape-scenic-158028.jpeg";
import { Avatar } from '@mui/material';
import "./Posts.css";
import Post from "./Post"
import { useSelector } from 'react-redux';
import {auth, db} from "./Firebase";
import InputBox from './InputBox';
import Navbar from "./Navbar";
const Posts = () => {
    let {user} = useSelector(state=> state);
    const [questions, setQuestions] = useState([]);

    useEffect(()=>{
        const q = db.collection("questions")
        console.log(q)
        db.collection("questions").orderBy("created", "desc").onSnapshot( (querySnapshot) => {
            setQuestions(querySnapshot.docs.map(doc => {
               return {
                   id: doc.id,
                   doc: doc.data() 
               }
                 }))
          },(error)=>{ console.log(error)})
    },[])
    return(
        <>
        <Navbar />
        {console.log(questions)}
        <div style={{width:"50%", margin:"auto"}}>
        <InputBox />
        {questions.map(item=>{
            return (<Post  username={item.doc.username} question={item.doc.question} id={item.id}/>)
        })}
        </div>
        
        </>
    )
}

export default Posts;