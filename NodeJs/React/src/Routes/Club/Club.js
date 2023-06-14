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
import NavScroll from '../db/NavFun'
import SelectTime from './SelectTime'
import { useNavigate } from 'react-router-dom';




export default function Club() {


   const user_id = sessionStorage.getItem("user_id")
   const user_grade = sessionStorage.getItem("user_grade")
   const user_name = sessionStorage.getItem("user_name")
   let navigate = useNavigate()

   let [user_data, setUserData] = useState([]) // 유저의 데이터 - 항시 업데이트
   let [InputUserData, setInputUserData] = useState([]) // 유저가 입력한 데이터
   let [timeBoolean, setTimeBoolean] = useState(false) // getBack함수를 실행시키기 위한 임시 변수
   let [nowTime, setNowTime] = useState('') // 시간이 나온 버튼을 클릭 시 유저의 일정이 담긴 시간이 들어감
   let [changeArray, setChangeArray] = useState({}) // 유저의 데이터가 업데이트 될 때 ForLoop에 값을 전달하는 값
   let [deleteArray, setDeleteArray] = useState('');
   let [falsetrue, setFalseTrue] = useState(false);
   let [tf, setTf] = useState(true);


   const inputCal = useRef()


   let [userTime, setUserTime] = useState([])  // 중복을 제거한 유저의 시간
   let array = {}

   /* ======================유저 시간 모음 ====================== */
   // ログインになるかどうか確認するuserEffect
   useEffect(() => {
      if (user_id === null) {
         alert('Please Login')
         navigate('/login')
      }
   }, [])

   // 유저가 삭제했을때 발동하는 userEffect
   useEffect(() => {
      if (falsetrue) {
         const users_data = axios.post(`${DB.host}club/del`, { deleteArray })
      }
      array = changeArray
   }, [deleteArray])

   useEffect(() => {
      async function users_datas() {
         const users_data = await axios.post(`${DB.host}club/request`, { user_grade })

         if (users_data.data !== true) {
            setUserData(users_data.data)
         }
         setTf(false)

      }
      users_datas()
      array = changeArray

   }, [InputUserData])
   useEffect(() => {
      if (tf === false) {
         overLapTimeDelUser()
         matchUserTime()
      } else if (tf === true) {
         overLapTimeDelUser()
         matchUserTime()
      }
      console.log("tf값", tf);
   }, [tf])

   async function submit(e) {
      e.preventDefault();
      let toDo = inputCal.current.value
      let Input = [toDo, user_id, user_grade, user_name, nowDate]
      // setToDo(toDo);
      var DATE = moment()
      let nowDate = DATE.format("YY/MM/DD/HH/mm/ss")
      const users_data = await axios.post(`${DB.host}club`, { toDo, user_id, user_grade, user_name, nowDate })

      setInputUserData(Input)
      setUserData(users_data.data)
      setChangeArray(array)

      if (users_data.data == false) {
         return alert("no Todo in Your Club")
      }
      setTf(true)
      inputCal.current.value = ''
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

      userTime.map((a, i) => {
         let changedKey = userTime[i] // key값
         let changedValue = [] // value값

         for (let j = 0; j < user_data.length; j++) {
            if (userTime[i] === user_data[j].date)
               changedValue.push({ key: user_data[j].key_number, name: user_data[j].name, todo: user_data[j].todo })
         }
         array[changedKey] = changedValue
      })
   }


   /* 시간대 : [ [시간대에 맞는 유저의 이름 , 할일] ,
               [시간대에 맞는 유저의 이름 , 할일] ] */

   function deleteCal(i, k, userTime) {
      let result = array[userTime[i]].splice(k, 1)
      let copyArray = array

      setChangeArray(copyArray)
      setDeleteArray(result)
      if (falsetrue === false)
         setFalseTrue(true)
   }

   function Forloop() {
      console.log("forLoop Run");
      let TalbeData = []

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
         <NavScroll></NavScroll>
         {/* 몇월 몇일에 어떤 사람이 어떤 내용을 남겼는지 확인해 주세요. */}
         <form>

            <input ref={inputCal} placeholder='일정을 입력해 주세요'></input>
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
               timeBoolean == true ? setTimeBoolean(false) : setTimeBoolean(true);

            }}>{moment(value).format("YYYY/MM/DD")} </button>
            {timeBoolean == true ? <SelectTime></SelectTime> : null}
         </div>
         {timeBoolean == true ? <GetBack></GetBack> : null}
         <Forloop ></Forloop>



      </div>
   )
}
