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

   let timeData = []  // 중복이 있는 유저의 시간
   let userTime = []  // 중복을 제거한 유저의 시간
   let rightTime = [] // 맞는 시간을 넣어놓은 배열객체
   /* ======================유저 시간 모음 ====================== */
   useEffect(() => {
      async function users_data() {
         const users_data = await axios.post('http://localhost:4041/club/request', { user_grade })

         if (users_data.data !== false) {
            console.log("userEffect내의 users_data :", users_data.data)
            setUserData(users_data.data)
         } else {
            setUserData([InputUserData])
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
      let Input = [toDo, daily, user_id, user_grade, user_name, nowDate]
      setInputUserData(Input)
      inputDate.current.value = ''
      inputCal.current.value = ''
      console.log(InputUserData)
      axios.post('http://localhost:4041/club', { toDo, daily, user_id, user_grade, user_name, nowDate })
   }

   function concatUser() { // 유저간 타임이 맞는 함수
      user_data.map((a, i) => {
         timeData.push(user_data[i].date)
      })
      const set = new Set(timeData) // set객체 이용
      userTime = [...set] // 중복 제거
      console.log("맞는 유저 시간 : ", userTime)
   }
   // let timeData = []  // 중복이 있는 유저의 시간
   // let userTime = []  // 중복을 제거한 유저의 시간
   // let rightTime = [] // 맞는 시간을 넣어놓은 배열객체
   function searchCal() {
      let q = {}
      user_data.map((a, i) => {
         for (let j = 0; j < userTime.length; j++) {
            if(user_data[i].date == userTime[j]){
      
               
               console.log('sucess')
               console.log("map내 userTime : ",userTime[j])
               console.log("map내 userdate : ",user_data[i].date)
               
            }
            break;
         }
         
      })
      console.log("userTime :" , userTime)
      console.log("timeData : ", timeData )
      console.log(q)
      console.log("rightTime 배열 : ", rightTime)
   }
   
   async function commit() {
      const users_data = await axios.post('http://localhost:4041/club/request', { user_grade })
      console.log("users_data :", users_data.data)

      if (users_data.data == false) {
         return alert("no Todo in Your Club")
      }

      setUserData(users_data.data)
   }
   concatUser()
   searchCal()

   return (
      <div>
         {/* 몇월 몇일에 어떤 사람이 어떤 내용을 남겼는지 확인해 주세요. */}
         <form>
            <input ref={inputDate} placeholder='날자을 입력해 주세요' onChange={setDailing}></input>
            <input ref={inputCal} placeholder='일정을 입력해 주세요' onChange={setDating}></input>
            <button type='submit' onClick={submit}>submit</button>
         </form>
         <button onClick={commit}>commited</button>
         <button onClick={concatUser}>concatuser</button>
         <button onClick={searchCal}>searchCal</button>
         {/* {console.log("user_data : ", user_data[0])} */}


         {
            user_data.map((a, i) => {
               return <>
                  <div key={user_data[i].date + "1"}>이름은 : {user_data[i].name}<br />
                     할일은 : {user_data[i].todo}<br />
                     시간은 : {user_data[i].date}</div>
               </>
            }
            )
         }




      </div>
   )
}
