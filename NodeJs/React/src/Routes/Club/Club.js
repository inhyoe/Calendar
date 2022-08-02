/* eslint-disable */
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'


export default function Club() {


   const user_id = sessionStorage.getItem("user_id")
   const user_grade = sessionStorage.getItem("user_grade")
   const user_name = sessionStorage.getItem("user_name")

   const [toDo, setToDo] = useState('')
   const [daily, setDaily] = useState('')
   const [user_data, setUserData] = useState([])
   const [InputUserData, setInputUserData] = useState([])

   const inputDate = useRef(null)
   const inputCal = useRef(null)

   useEffect( () => {
      async function users_data(){
         const users_data = await axios.post('http://localhost:4041/club/request', { user_grade })
         
         if(users_data.data !== false){
         console.log("userEffect내의 users_data :", users_data.data)
         setUserData(users_data.data)
      }else{
         setUserData([])
      }
      }
      users_data()
   }, [])

   let today = new Date();
   let year = String(today.getFullYear()); // 년도
   let month = String(today.getMonth() + 1);  // 월
   let dately = String(today.getDate());  // 날짜
   let hour = String(today.getHours()); // 시
   let minutes = String(today.getMinutes());  // 분
   let seconds = String(today.getSeconds());  // 초

   let nowDate = year + "/" + month + "/" + dately + "/" + hour + "/" + minutes + "/" + seconds;

   // let mytime = new Date()
   // mytime = String(mytime.toLocaleString()).split('. ')
   // mytime[4] = 
   // console.log(String(mytime.toLocaleDateString()))
   // console.log(mytime)
   //  -> 나중에 봅시다...



   function setDailing(e) {
      setDaily(e.target.value)
   }/* 오늘 날짜 */

   function setDating(e) {
      setToDo(e.target.value)
   }/* 오늘 할일 */


   function submit(e) {
      e.preventDefault();
      // let Input = [ toDo, daily, user_id, user_grade, user_name ,nowDate ]
      // setInputUserData(Input)
      inputDate.current.value = ''
      inputCal.current.value = ''
      console.log(InputUserData)
      axios.post('http://localhost:4041/club', { toDo, daily, user_id, user_grade, user_name, nowDate })
   }


   async function commit() {
      const users_data = await axios.post('http://localhost:4041/club/request', { user_grade })
      console.log("users_data :", users_data.data)

      setUserData(users_data.data)

      if (users_data.data == false) {
         return alert("no Todo in Your Club")
      }


   }


   return (
      <div>
         {/* 몇월 몇일에 어떤 사람이 어떤 내용을 남겼는지 확인해 주세요. */}
         <form>
            <input ref={inputDate} placeholder='날자을 입력해 주세요' onChange={setDailing}></input>
            <input ref={inputCal} placeholder='일정을 입력해 주세요' onChange={setDating}></input>
            <button type='submit' onClick={submit}>submit</button>
         </form>
         <button onClick={commit}>commited</button>
         {/* {console.log("user_data : ", user_data[0])} */}
         {console.log(typeof user_data)}
         {
            user_data.map((a, i) => {
               return <>
                  <div key = {user_data[i].date+"1"}>이름은 : {user_data[i].name}</div>
                  <div key = {user_data[i].date+"2"}>할일은 : {user_data[i].todo}</div>
                  <div key = {user_data[i].date+"3"}>시간은 : {user_data[i].date}</div>
               </>
            }
            )
         }



      </div>
   )
}
