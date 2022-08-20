import React, { useEffect, useRef, useState } from 'react'
import Footer from '../db/Footer'
import NavFun from '../db/NavFun'
import UserChat from './userChat'
import io from 'socket.io-client'
import DB from '../db/db'
import FirstLoad from './FirstLoad'
import axios from 'axios'
import myDB from '../db/db'


const socket = io(`${DB.chatServer}`)
console.log(socket);
// io서버 주소

export default function chat() {

  let message = useRef('')
  let regist = useRef('')
  // Messages States
  const user_id = sessionStorage.getItem("user_id")
  const user_grade = sessionStorage.getItem("user_grade")
  const user_name = sessionStorage.getItem("user_name")
  let [firstData, setFirstData] = useState([])
  let [opponent, setOpponent] = useState([])
  let [clickedOp, setClickedOp] = useState('') // 클릭된 상대방
  const sendMessage = () => {
    socket.emit('send_message', { user_id, user_name, user_grade, opponent: clickedOp, message: message.current.value })
  };
  useEffect(() => {
    axios.post(`${myDB.host}chat/bringdata`, { user_id }).then(
      (res) => {
        console.log(res.data);
        setOpponent(res.data);
      }
    ) // 상대방 불러오기
    socket.emit('user_id', { user_id })
  }, [])
  useEffect(() => {
    let arr = []
    socket.on("receive_message", (data) => {
      console.log('im run');
      console.log("data : ", data);
      // firstData를 바꿔줘야함.
      console.log("firstData : ", firstData);
      setFirstData((prev) => [...prev, data])
      arr = []
      console.log("arr : ", arr);
    });
    
  }, [socket]);

  const onClick = () =>{
    socket.emit('send_message', { user_id, user_name, user_grade, opponent: clickedOp, message: message.current.value })
  }

  const onKeyPress = (e) =>{
    if(e.key == 'Enter') {
      onClick();
    }
  }
  
  function registOppenet() {
    axios.post(`${DB.host}chat/create` , {user_id , opponent : regist.current.value } ).then(
      (res) => {
        console.log(res.data)
      }
    )
    setOpponent(prev => [...prev, regist.current.value])
  }
  
  return (
    <div>
      <NavFun></NavFun>
      <div>
        <input ref={regist} placeholder='원하는 유저를 입력하세요'></input>
        <button onClick={registOppenet}>유저 등록</button>
      </div>
      {/* 맨 처음에 유저가 창을 열 때 */}
      <div className='container mt-5 mb-5' style={{ backgroundColor: '#F1F3F4', height: '700px' }}>
        <UserChat opponent={opponent} setClickedOp={setClickedOp}></UserChat>
        <div  className="center-block border border-success border-5" style={{ float: 'right', width: "70%", height: '93%', overflow: 'scroll' }}>
          <FirstLoad socket ={socket} firstData={firstData} setFirstData={setFirstData} clickedOp={clickedOp} user_id={user_id}></FirstLoad>
        </div>
        <div className="me" style={{float:"right", width: "70%" ,height : "7%"}}>
          <input ref={message} onKeyPress={onKeyPress} style={{ height: "100%",width:"90%" }} placeholder="메세지"></input>
          <button style={{  height: "100%" ,width:"10%"}} onClick={() => {
            sendMessage()
            
          }}>보내기</button>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}
