import React, { useEffect } from 'react'
import moment from 'moment';
import './Calendars.css'
import axios from 'axios';
import myDB from '../../db/db';
export default function ShowTodo(props) {
   const { groupTodo, userTodo, value, user_grade, setGroupTodo, setUserTodo, user_id } = props
   useEffect(() => { // ? 유저가 날자를 클릭하면 나오는 todo
      axios.post(`${myDB.host}newclub/search`, { startDate: moment(props.value).format("YYYY/MM/DD"), user_grade, user_id }).then((res) => {
         console.log("res.dara :", res.data)
         setGroupTodo(res.data.group_StEd)
         setUserTodo(res.data.user_StEd)
      })

   }, [value])
   /**
   * @param {Array} wTodo 誰がする(who's Todo)
   * @param {Object} Time 時間(Times)
   */
   function WhatTodo({ wTodo, Time, who }) {
      console.log(wTodo)
      return (
         <div id="hi">
            <div>{moment(Time).format("YYYY/MM/DD")}날의 {who}의 일정은 </div>
            <div id='todo'>
               {wTodo.map((a, i) => {
                  return (
                     <div key={i} >
                        <p >nickName : {a.user_nickname}</p>
                        <p className="inlined">StartTime : {a.Start}</p>
                        <p className="inlined">EndTime : {a.End}</p>
                        <p>todo : {a.todo}</p>
                        <p>=====================</p>
                     </div>
                  )
               })}
            </div>
         </div>
      )
   }

   return (
      <div>
         <div id="myCalendar">
            <WhatTodo wTodo={userTodo} Time={props.time} who={"나"}></WhatTodo>
            <WhatTodo wTodo={groupTodo} Time={props.time} who={"팀"}></WhatTodo>
         </div>
      </div>
   )
}
