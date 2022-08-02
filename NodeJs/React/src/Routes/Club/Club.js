import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Club() {
   
   useEffect(() =>{
      let time = setInterval(
        () => {
         setTime(nowDate)
        }
      ,1000);
      return (() => clearInterval(time))
   })
   
   
   const user_id = sessionStorage.getItem("user_id")
   const user_grade = sessionStorage.getItem("user_grade")
   const user_name = sessionStorage.getItem("user_name")
   const [time, setTime] = useState('')
   const [date, setDate] = useState('')
   const [daily, setDaily] = useState('')
   let today = new Date();
   let year = String(today.getFullYear()); // 년도
   let month = String(today.getMonth() + 1);  // 월
   let dately = String(today.getDate());  // 날짜
   let hour = String(today.getHours()); // 시
   let minutes = String(today.getMinutes());  // 분
   let seconds = String(today.getSeconds());  // 초

   let nowDate = year + "/" + month + "/" + dately + "/" + hour + "/" + minutes + "/" + seconds;
   
   
   function setDailing(e) {
      setDaily(e.target.value)
   }/* 오늘 날짜 */
   
   function setDating(e) {
      setDate(e.target.value)
   }/* 오늘 할일 */
   
   
   function submit(e) {
      e.preventDefault();
      
      console.log(nowDate)
      axios.post('/club', { date, daily, user_id, user_grade, user_name ,nowDate })
   }
   
   
   async function commit() {
      const user_data = await axios.post('/club')
      console.log(user_data)
   }
   return (
      <div>
         {/* 몇월 몇일에 어떤 사람이 어떤 내용을 남겼는지 확인해 주세요. */}
         <form>
            <input placeholder='날자을 입력해 주세요' onChange={setDailing}></input>
            <input placeholder='일정을 입력해 주세요' onChange={setDating}></input>
            <button type='submit' onClick={submit}>submit</button>
         </form>
         <button onClick={commit}>commited</button>

      </div>
   )
}
