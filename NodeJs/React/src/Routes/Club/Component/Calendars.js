import React, { useEffect, useRef } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';
import Form from 'react-bootstrap/Form';
import './Calendars.css'
import Button from 'react-bootstrap/Button';
import DB from '../../db/db'
import axios from 'axios'
import FormsData from './moclues/component/formsData.jsx';
import handleDate from './moclues/fun/handelDate';


export default function Calendars(props) {

   let { startDate, setStartDate, endDate, setEndDate, setTodo, user_id, user_grade, user_name, setGroupTodo, setUserTodo, onChange, value } = props; // * 받아온 state값

   // handleDate関数でstartDateとendDateが変わる時に実行されるuseEffect。
   // リアルタイムで変化するように見せるためにuseEffectを使う。
   useEffect(() => {
      if (Number(startDate) !== 0 && Number(endDate) !== 0) {

         axios.post(`${DB.host}newClub`, { user_id, user_grade, user_name, inputTodo: inputTodo.current.value, startDate, endDate }).then((res) => {
            setGroupTodo(res.data.group_StEd)
            setUserTodo(res.data.user_StEd)
         })
         startHour = 0
         startMin = 0
         endHour = 0
         endDate = 0
      }
   }, [startDate, endDate])

   let inputTodo = useRef()
   let startDay = useRef()
   let endDay = useRef()
   let startHour = useRef()
   let startMin = useRef()
   let endHour = useRef()
   let endMin = useRef()
   let start = { type: "Start", startDay, startHour, startMin }
   let end = { type: "End", endDay, endHour, endMin }
   let set = { setEndDate, setStartDate, setTodo, inputTodo }

   return (
      <div className="Cal">
         <Calendar onChange={onChange} value={value}
            className="mx-auto w-full border-b"
         />
         <div className="aroundDiv">
            <div className="innerDiv">
               {console.log("start는 : ", start)}
               {console.log("end : ", end)}
               <FormsData start={start}></FormsData>
               <FormsData end={end}></FormsData>
               <div id='me'>
                  <Form.Control ref={inputTodo} className="input-calendar" placeholder="todo" style={{ width: '50%', float: "left" }} />
                  <Button variant="success" onClick={() => {
                     handleDate(start, end, set)
                  }}>Submit</Button>
               </div>
            </div>
         </div>
      </div>
   )
}
