import React, { useEffect, useRef, useState } from 'react'
import Footer from '../db/Footer'
import NavFun from '../db/NavFun'
import UserChat from './userChat'
import io from 'socket.io-client'
import DB from '../db/db'

const socket = io(`${DB.chatServer}`)
console.log(socket);
// io서버 주소

export default function chat() {
   //Room State
   const [room, setRoom] = useState("");
   let message =useRef('') 
   let inputOpponent = useRef('')
   
   // Messages States
   const user_id = sessionStorage.getItem("user_id")
   const user_grade = sessionStorage.getItem("user_grade")
   const user_name = sessionStorage.getItem("user_name")
   const [messageReceived, setMessageReceived] = useState("");
   let [opponent, setOpponent] = useState("");
   const joinRoom = () => {
     if (room !== "") {
       socket.emit("join_room", room);
     }
   };
  
   const sendMessage = () => {
    
    socket.emit('send_message' , { user_id , opponent : inputOpponent.current.value, message : message.current.value })
   };
   
   useEffect(() => {
    socket.emit('user_id' , { user_id })
   },[])
   useEffect(() => {
     socket.on("receive_message", (data) => {
      console.log('im run');
        console.log(data);
       setMessageReceived(data);
     });
   }, [socket]);

   console.log(messageReceived);
  return (
    <div>
      <NavFun></NavFun>
      <div className='container mt-5 mb-5' style={{backgroundColor: '#F1F3F4', height: '700px'}}>
         <UserChat></UserChat>
         <div className = "center-block border border-success border-5" style={{float : 'right', width :"70%", height: '700px'}}>
          <input ref={message} placeholder = "메세지"></input> <br/>
          <input ref={inputOpponent} placeholder = "유저이름"></input>
          <p>{messageReceived}ㅎㅇ</p>
      <button onClick= {sendMessage}>보내기</button>
         </div>
      </div>
      <Footer></Footer>
    </div>
  )
}
