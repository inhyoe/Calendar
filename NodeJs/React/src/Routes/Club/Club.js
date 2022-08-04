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
   let array = {} // 유저의 시간대의 시간객체

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
      userTime.map((a, i) => {
         let changedKey = userTime[i] // key값
         let changedValue = [] // value값

         for (let j = 0; j < user_data.length; j++) {
            // console.log(`userTime[${j}] : `, userTime[i]) -> 중복을 제거한 맞는 시간
            // console.log(`user_data[${j}] :`, user_data[j].date) -> 유저가 글을 올린 시간
            if (userTime[i] == user_data[j].date) {
               // console.log("유저의 시간 : ", user_data[j])
               changedValue.push({ name: user_data[j].name, todo: user_data[j].todo })
            }
         }
         array[changedKey] = changedValue
      })
      console.log("array 는 : ", array)
      // console.log("userTime :", userTime)
      // console.log("timeData : ", timeData)
   }
   /* 시간대 : [ [시간대에 맞는 유저의 이름 , 할일] ,
               [시간대에 맞는 유저의 이름 , 할일] ] */

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

   function Forloop() {
      let ARR
      let TalbeData = []
      for (let i = 0; i < Object.keys(array).length; i++) {
         ARR = array[userTime[i]]
         TalbeData.push(
            <table border="2">
               <th>시간</th>
               <th>이름</th>
               <th>할일</th>
               <tr>
                  <td > {userTime[i]} </td>
               
                  {
                     array[userTime[i]].map((a, k) => {
                        return (
                           <>
                              <td > {array[userTime[i]][k].name} </td>
                           </>
                        )
                     })
                  }
               
               
                  {
                     array[userTime[i]].map((a, k) => {
                        return (
                           <>
                              <td > {array[userTime[i]][k].todo} </td>
                           </>
                        )
                     })
                  }
               </tr>
            </table>)
      }
      console.log(ARR)
      return TalbeData
   }
   console.log(userTime)
   console.log("나는야 : ", array[userTime[2]])

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

         <Forloop></Forloop>



      </div>
   )
}
