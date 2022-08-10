/* eslint-disable */
// let timeData = []  // 중복이 있는 유저의 시간
// let userTime = []  // 중복을 제거한 유저의 시간
// let rightTime = [] // 맞는 시간을 넣어놓은 배열객체


import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';
import Button from 'react-bootstrap/Button';
import DB from '../db/db'



export default function Club() {


   const user_id = sessionStorage.getItem("user_id")
   const user_grade = sessionStorage.getItem("user_grade")
   const user_name = sessionStorage.getItem("user_name")

   let [toDo, setToDo] = useState('')
   let [daily, setDaily] = useState('')
   let [user_data, setUserData] = useState([])
   let [InputUserData, setInputUserData] = useState([])
   let [timeBoolean, setTimeBoolean] = useState(false)
   let [nowTime, setNowTime] = useState('') // 시간이 나온 버튼을 클릭 시 유저의 일정이 담긴 시간이 들어감
   let [changeArray, setChangeArray] = useState({})
   let [deleteArray, setDeleteArray] = useState('');
   let [falsetrue, setFalseTrue] = useState(false);
   let [tf, setTf] = useState(true);

   const inputDate = useRef(null)
   const inputCal = useRef(null)


   let [userTime, setUserTime] = useState([])  // 중복을 제거한 유저의 시간
   let array = {}

   /* ======================유저 시간 모음 ====================== */
   useEffect(() => {
      if (falsetrue) {
         const users_data = axios.post(`${DB.host}club/del`, { deleteArray })
      }
      // console.log("============================up")
      // console.log("falsetrue :" , falsetrue)
      // console.log("useEffect in changeArray : " , changeArray)
      // setArray(changeArray)
      array = changeArray
      
      // console.log("useEffect in array : " , array)
      // console.log("useEffect in DelArray :" , deleteArray)
      // console.log("============================downs")

   }, [deleteArray])
   
   useEffect(() => {
      async function users_datas() {
         const users_data = await axios.post(`${DB.host}club/request`, { user_grade })

         if (users_data.data !== true) {
            setUserData(users_data.data)
            console.log('imrun')
            console.log("+=============================+")
            
         }
         setTf(false)
         console.log("서버의 데이터 : ", users_data.data)
      }
      users_datas()
      console.log("+=============================+")

      console.log("array : ", array)
      console.log("user_data : ", user_data)
   }, [InputUserData])
   useEffect(() => {
      if (tf === false) {
         overLapTimeDelUser()
         matchUserTime()
      } else if (tf === true) {
         overLapTimeDelUser()
         matchUserTime()
      }
      console.log("tf값",tf);
   }, [tf])

   function setDailing(e) {
      setDaily(e.target.value)
   }/* 오늘 날짜 */

   function setDating(e) {
      setToDo(e.target.value)
   }/* 오늘 할일 */

   async function submit(e) {
      e.preventDefault();
      let Input = [toDo, daily, user_id, user_grade, user_name, nowDate]


      var DATE = moment()
      let nowDate = DATE.format("YY/MM/DD/HH/mm/ss")

      setInputUserData(Input)
      inputDate.current.value = ''
      inputCal.current.value = ''
      const users_data = await axios.post(`${DB.host}club`, { toDo, daily, user_id, user_grade, user_name, nowDate })

      setUserData(users_data.data)
      // 유저의 데이터가 바뀔 때 뭘 해야함.
      setTf(true)
      setChangeArray(array)
      if (users_data.data == false) {
         return alert("no Todo in Your Club")
      }
      setTf(true)
   }
   
   function overLapTimeDelUser() { // 유저간 타임이 맞는 함수
      let timeData = []  // 중복이 있는 유저의 시간
      user_data.map((a, i) => {
         timeData.push(user_data[i].date)
      })
      
      const set = new Set(timeData) // set객체 이용
      setUserTime([...set]) // 중복 제거
   }

   function matchUserTime() {
      // console.log("matchUserTime user_data : ", user_data)
      userTime.map((a, i) => {
         
         let changedKey = userTime[i] // key값
         let changedValue = [] // value값
         // console.log("matchUserTime in user_data : ", user_data)   
         // console.log("matchUserTime in user_data.length", user_data.length)
         for (let j = 0; j < user_data.length; j++) {

            if (userTime[i] === user_data[j].date)
               changedValue.push({ key: user_data[j].key_number, name: user_data[j].name, todo: user_data[j].todo })
         }
         // console.log();
         // updateValue[changedKey] = changedValue
         // console.log("upValue : ",updateValue)
         
         // console.log("myarray : ",myarray);
         
         array[changedKey] = changedValue
         
      })
      
      // console.log("matchUserTime in user_array : ", array)
   }


   /* 시간대 : [ [시간대에 맞는 유저의 이름 , 할일] ,
               [시간대에 맞는 유저의 이름 , 할일] ] */

   function deleteCal(i, k, userTime) { // i = forLoop outArray ,k = changeArray.map 
      // console.log("i : ", i, "k : ", k)
      // console.log(userTime[i][k])
      // console.log("before Array", array)
      // console.log(`array[${userTime[i]}][${k}]는 :`, array[userTime[i]][k])
      let result = array[userTime[i]].splice(k, 1)
      // console.log("result : ",result)
      // console.log("array : ", array)
      let copyArray = array

      setChangeArray(copyArray)
      setDeleteArray(result)
      if (falsetrue === false)
         setFalseTrue(true)

   }
   function Forloop() {
      console.log("forLoop Run");
      let TalbeData = []
      // console.log("ForLoop User :", user_data)
      // console.log("ForLoop realNowTime : ", realNowTime)
      // console.log("ForLoop userTime : ", userTime)
      
      for (let i = 0; i < Object.keys(changeArray).length; i++) {
         // console.log('ForLoop in for Run!')
         TalbeData.push(<>
            {
               changeArray[userTime[i]].map((a, k) => {
                  // console.log("forLoop nowTime : ", realNowTime)
                  // console.log("forLoop userTime : ", userTime[i])

                  if (realNowTime === userTime[i]) {
                     return (
                        <>
                           <div key={a.todo}>Now time : {userTime[i]}</div>
                           이름은 : {changeArray[userTime[i]][k].name}<br />
                           할일은 : {changeArray[userTime[i]][k].todo} <br />

                           <button onClick={() => {
                              deleteCal(i, k, userTime)
                              console.log(`im Runned ! ${k}`)
                           }}>Delete</button><br />

                           =====================================================
                        </>
                     )
                  }
               })
            }
         </>
         )
         // console.log("TalbeData : ", TalbeData)
         // console.log("=================================")
      }

      return TalbeData
   }

   let Time = []
   let [realNowTime, setRealNowTime] = useState('')
   function GetBack() {
      matchUserTime();
      // console.log("GetBack() in userTime : ", userTime)
      // console.log("GetBack() in nowTime : ", nowTime)
      let setTime = []
      let tempTime = [] // 유저의 중복된 값이 들어간 임시 배열
      for (let i = 0; i < 24; i++) {
         userTime.map((a, k) => {
            if (nowTime === userTime[k].substring(8, 0)) {
               tempTime.push(userTime[k].substr(9)) // 시간만 들어감
            }
         })
         setTime = new Set(tempTime)
         Time = [...setTime] // Set 객체로 바뀐 Time을 다시 배열로 바꿔줌.
      }
      // console.log("GetBackFun in Time", Time)

      let timeList = Time.map((a, i) => { // 유저가 입력한 시간을 나타내는 버튼
         return <Button key={a} onClick={() => {
            setRealNowTime(nowTime.concat(`/${Time[i]}`))
            setChangeArray(array)
         }

         } >{Time[i]}</Button>
      })
      return timeList
   }




   const [value, onChange] = useState(new Date());
   return (
      <div>
         {/* 몇월 몇일에 어떤 사람이 어떤 내용을 남겼는지 확인해 주세요. */}
         <form>
            <input ref={inputDate} placeholder='날자을 입력해 주세요' onChange={setDailing}></input>
            <input ref={inputCal} placeholder='일정을 입력해 주세요' onChange={setDating}></input>
            <Button variant="outline-primary" type='submit' onClick={submit}>Submit</Button>
         </form>
         <div>{
            userTime.map((a, i) => {
               return <>
                  <Button variant="outline-success" key={a} onClick={() => {

                  }}>{userTime[i]}</Button>
               </>
            })
         }</div>

         <Calendar onChange={onChange} value={value} />
         <div>
            <button onClick={() => {

               setNowTime(moment(value).format("YY/MM/DD"))
               overLapTimeDelUser();

               // console.log("시간클릭 : ", nowTime);
               timeBoolean == true ? setTimeBoolean(false) : setTimeBoolean(true);

            }}>{moment(value).format("YYYY/MM/DD")} </button>
         </div>
         {timeBoolean == true ? <GetBack></GetBack> : null}
         <Forloop ></Forloop>



      </div>
   )
}
