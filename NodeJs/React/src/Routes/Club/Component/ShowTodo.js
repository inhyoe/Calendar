import React, { useEffect } from 'react'
import moment from 'moment';
import './Calendars.css'
import axios from 'axios';
import myDB from '../../db/db';
export default function ShowTodo(props) {
   const { groupTodo,value,user_grade,setGroupTodo } = props

   console.log("value 는 ",value);
   useEffect(() => { // ? 유저가 날자를 클릭하면 나오는 todo
      console.log("start Date : ",value)
      axios.post(`${myDB.host}newclub/search`,{ startDate : moment(props.value).format("YYYY/MM/DD") , user_grade}).then((res) => {
       setGroupTodo(res.data)
    })
  
 },[value])
  return (
    <div>
      <div id = 'me'>{moment(props.value).format("YYYY/MM/DD")}날의 일정은 </div>
      <div id = 'todo'>
      {groupTodo.map( (a,i) => {
         return(
            <div  key = {i} >
               <p >nickName : {a.user_nickname}</p>
               <p className = "inlined">StartTime : {a.Start}</p>
               <p className = "inlined">EndTime : {a.End}</p>
               <p>todo : {a.todo}</p>
               <p>=========================================</p>
            </div>
         )
      })}
      </div>
    </div>
  )
}
