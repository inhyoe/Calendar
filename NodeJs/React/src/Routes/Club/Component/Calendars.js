import React, { useEffect, useRef, useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';
import Form from 'react-bootstrap/Form';
import './Calendars.css'
import Button from 'react-bootstrap/Button';
import DB from '../../db/db'
import axios from 'axios'
export default function Calendars(props) {

   let { startDate, setStartDate, endDate, setEndDate, todo, setTodo, user_id, user_grade, user_name, setGroupTodo,setUserTodo, onChange, value } = props; // * 받아온 state값

   useEffect(() => {
      if (startDate !== null && endDate !== null) {
         // 시작시간과 끝나는 시간이 null값이 아닐 때
      }
   }, [props.startDate])
   useEffect(() => {
      if (Number(startDate) !== 0 && Number(endDate) !== 0) {
         axios.post(`${DB.host}newClub`, { user_id, user_grade, user_name, todo, startDate, endDate }).then((res) => {
            setGroupTodo(res.data.group_StEd)
            setUserTodo(res.data.user_StEd)
         })
      }
   }, [startDate, endDate])

   let StartDate = useRef()
   let EndDate = useRef()
   let StartHour = useRef()
   let StartMin = useRef()
   let EndHour = useRef()
   let EndMin = useRef()
   let inputTodo = useRef()
   /**
    * @param {string} SD 날자
    * @param {string} SH 시간
    * @param {string} SM 분
    * @return {boolean or string(time)} 유저가 입력한 시간을 리턴 혹은 false
   */
   const inputFun = (SD, SH, SM) => {
      let sd = SD.current.value // * 날자
      let sh = SH.current.value // * 시간
      let sm = SM.current.value // * 분
      if (sd == NaN || sh == NaN || sm === NaN) {
         SH.current.value = ''
         SM.current.value = ''
         return false
      } else if (sh > 24 || sm > 60) { // ? 시간이 범위를 벗어났을때 날짜는 정규 표현식을 배우고 할 것.
         SH.current.value = ''
         SM.current.value = ''
         return false
      }
      let sDsHsM = sd.concat(`/${sh}/`).concat(sm)
      return sDsHsM
      // 유저가 입력한 시간을 리턴해주는 함수
   }
   /**
   * 시작 시간과 끝 시간을 비교해주는 함수
   * @param {String} before 시작시간
   * @param {String} after  끝나는시간
   * @return {Boolean} true 혹은 false를 반환함
   */ 
   const compare = (before, after) => {
      let startArr = before.split('/')
      let endArr = after.split('/')
      if (startArr[3] > endArr[3]) { // * startArr[3] 은 시간
         return false
      } else if (startArr[3] === endArr[3]) {
         if (startArr[4] > endArr[4]) // * startArr[4] 는 분
            return false
      }
   }

   const handleDate = () => { //? 시작-끝나는 시간 입력 todo
      let startResult = inputFun(StartDate, StartHour, StartMin)
      let endResult = inputFun(EndDate, EndHour, EndMin)

      if (startResult == false || endResult === false) {
         return alert('잘못된 양식입니다 다시 입력해주세요')
      }
      
      let compared = compare(startResult, endResult)
      if (compared === false) {
         return alert('일정 시작 시간이 더 큽니다 다시 입력해주세요')
      }
      setEndDate(endResult)
      setStartDate(startResult)
      setTodo(inputTodo.current.value)
   }
   // ! CodeFlow => 유저가 시간 입력 => inputFun에서 유효성 검사 =>잘못된 경우 handleDate에서 alert출력
   // ! inputFun에서 잘못된 것이 없을때 compare 함수에서 유효성(시간) 검사 => 잘못된 경우 alert출력

   function FormsData(props) { // ? 일정을 표시해주는 컴포넌트 
      // ! console.log("props : ", props); 꼭 확인해봅시다.

      return (
         <div id="me">
            <div>StartTime</div>

            <Form.Control ref={props.date} className="input-calendar" placeholder="24hours" defaultValue={moment(props.value).format("YYYY/MM/DD")} style={{ float: 'left', width: '45%' }} />
            <Form.Control ref={props.hour} className="input-calendar" placeholder="24hours" style={{ float: 'left', width: '25%' }} />
            <div style={{ float: 'left' }}>
               :
            </div>
            <div>
               <Form.Control ref={props.min} className="input-calendar" placeholder="24hours" style={{ float: 'left', width: '25%' }} />
            </div>
         </div>
      )
   }

   return (
      <div className="Cal">
         <Calendar onChange={onChange} value={value}
            className="mx-auto w-full border-b"
         />
         <div className="aroundDiv">
            <div className="innerDiv">
               <FormsData value={value} date={StartDate} hour={StartHour} min={StartMin}></FormsData>
               <FormsData value={value} date={EndDate} hour={EndHour} min={EndMin}></FormsData>
               <div id='me'>
                  <Form.Control ref={inputTodo} className="input-calendar" placeholder="todo" style={{ width: '50%', float: "left" }} />
                  <Button variant="success" onClick={() => {
                     handleDate()
                  }}>Submit</Button>
               </div>
            </div>
         </div>
      </div>
   )
}
