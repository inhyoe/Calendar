import React, { useEffect, useRef, useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';
import Form from 'react-bootstrap/Form';
import './Calendars.css'
import Button from 'react-bootstrap/Button';
export default function Calendars(props) {
   useEffect(() => {
      console.log(startDate)
      console.log(endDate)
      if(startDate !== null && endDate !== null){
         // 시작시간과 끝나는 시간이 null값이 아닐 때
      }
   },[props.startDate])

   const [value, onChange] = useState(new Date());
   let StartDate = useRef()
   let EndDate = useRef()
   let StartHour = useRef()
   let StartMin = useRef()
   let EndHour = useRef()
   let EndMin = useRef()
   let { startDate, setStartDate, endDate, setEndDate } = props;
   
   const inputFun = (SD,SH,SM) =>{
      let sd = SD.current.value // ! 날자
      let sh = SH.current.value // ! 시간
      let sm = SM.current.value // ! 분
      if(sd == NaN || sh == NaN || sm === NaN ){
         SH.current.value = ''
         SM.current.value = ''
         return false
      }else if(sh > 24 || sm > 60 ){
         SH.current.value = ''
         SM.current.value = ''
         return false
      }
      let sDsHsM = sd.concat(`/${sh}/`).concat(sm)
      return sDsHsM
      // 유저가 입력한 시간을 리턴해주는 함수
   }
   
   const compare = (before, after ) => {
      let startArr = before.split('/')
      let endArr = after.split('/')
      if(startArr[3] > endArr[3] || startArr[4] > endArr[4]){
         return false
      }
   }

   const handleDate = () => { // 시작-끝나는 시간 입력
      let startResult = inputFun(StartDate,StartHour,StartMin)
      let endResult = inputFun(EndDate,EndHour,EndMin)
      if( startResult == false || endResult === false){
         return alert('잘못된 양식입니다 다시 입력해주세요')
      }
      let compared = compare(startResult,endResult)
      if( compared === false ){
         return alert('일정 시작 시간이 더 큽니다 다시 입력해주세요')
      }
      setEndDate(startResult)
      setStartDate(endResult)
      
   }
   // ! CodeFlow => 유저가 시간 입력 => inputFun에서 유효성 검사 =>잘못된 경우 handleDate에서 alert출력
   // ! inputFun에서 잘못된 것이 없을때 compare 함수에서 유효성(시간) 검사 => 잘못된 경우 alert출력
   return (
      <div>
         <Calendar onChange={onChange} value={value} />
         <div style={{ height: "40px" }}>
            <div style={{ height: "60px" }}>
               <div>StartTime</div>
               
               <Form.Control ref= {StartDate} className="input-calendar" placeholder="24hours" defaultValue = {moment(value).format("YYYY/MM/DD")} style={{ float: 'left', width: '12%' }} />
               <Form.Control ref={StartHour} className="input-calendar" placeholder="24hours" style={{ float: 'left', width: '5%' }} />
               <div style={{ float: 'left' }}>
                  :
               </div>
               <div>
                  <Form.Control ref={StartMin} className="input-calendar" placeholder="24hours" style={{ float: 'left', width: '5%' }} />
               </div>
            </div>

            <div style={{ height: "60px" }}>
               <div>End Time</div>
               <Form.Control ref= {EndDate} className="input-calendar" placeholder="24hours" defaultValue = {moment(value).format("YYYY/MM/DD")} style={{ float: 'left', width: '12%' }} />
               <Form.Control ref= {EndHour} className="input-calendar" placeholder="24hours" style={{ float: 'left', width: '5%' }} />
               <div style={{ float: 'left' }}>
                  :
               </div>
               <div>
                  <Form.Control ref = {EndMin} className="input-calendar" placeholder="24hours" style={{ float: 'left', width: '5%' }} />
               </div>
            </div>
            <Button variant="success" onClick = { () => {
               console.log("clicked")
               handleDate()
               
            }}>Submit</Button>
         </div>
      </div>
   )
}
