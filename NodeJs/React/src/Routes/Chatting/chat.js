import React, { useEffect, useRef, useState } from 'react'
import Footer from '../db/Footer'
import NavFun from '../db/NavFun'
import UserChat from './userChat'
import io from 'socket.io-client'
import DB from '../db/db'
import FirstLoad from './FirstLoad'


const socket = io(`${DB.chatServer}`)
console.log(socket);
// io서버 주소

export default function chat() {
  //Room State

  let message = useRef('')
  let inputOpponent = useRef('')
  let regist = useRef('')
  // Messages States
  const user_id = sessionStorage.getItem("user_id")
  const user_grade = sessionStorage.getItem("user_grade")
  const user_name = sessionStorage.getItem("user_name")
  
  let [opponent, setOpponent] = useState('')
  let [storageMsg, setStorageMsg] = useState([])
  const sendMessage = () => {

    socket.emit('send_message', { user_id, user_name, user_grade, opponent, message: message.current.value })
  };

  useEffect(() => {
    socket.emit('user_id', { user_id })
  }, [])
  useEffect(() => {
    let arr = []
    socket.on("receive_message", (data) => {
      console.log('im run');
      console.log(data);
      //  setOpponent(data.opponent); 
      //  setMessageReceived(data.message);
      data.map((a, i) => {
        let newUser = {}
        newUser["created_at"] = a.created_at
        newUser["user_id"] = a.chater_name;
        newUser['user_message'] = a.message;
        arr.push(newUser)
      })
      setStorageMsg(arr)
      arr = []
      console.log("arr : ",arr);
    });
  }, [socket]);

  
  console.log("storageMSg : ", storageMsg);

  function registOppenet(){
    setOpponent(regist.current.value)
  }
  return (
    <div>
      <NavFun></NavFun>
      <div className='container mt-5 mb-5' style={{ backgroundColor: '#F1F3F4', height: '700px' }}>
        <input ref={regist} placeholder='원하는 유저를 입력하세요'></input>
        <button onClick = {registOppenet}>유저 등록</button>
        <UserChat opponent={opponent}></UserChat>
        <div className="center-block border border-success border-5" style={{ float: 'right', width: "70%", height: '700px' , overflow : 'scroll' }}>

          <FirstLoad opponent={opponent} user_id = {user_id}></FirstLoad>
          {storageMsg.map((a, i) => {
            return (
              <div key={a.created_at}>
                <p>유저 이름 : {a.user_id}</p>
                <p>메세지 : {a.user_message} </p>
              </div>
            )
          })}
        </div>
          <input ref={message} placeholder="메세지"></input> <br />
          <button onClick={sendMessage}>보내기</button>
      </div>
      <Footer></Footer>
    </div>
  )
}
