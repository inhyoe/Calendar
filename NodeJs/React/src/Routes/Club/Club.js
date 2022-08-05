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



export default function Club() {


   const user_id = sessionStorage.getItem("user_id")
   const user_grade = sessionStorage.getItem("user_grade")
   const user_name = sessionStorage.getItem("user_name")

   let [toDo, setToDo] = useState('')
   let [daily, setDaily] = useState('')
   let [user_data, setUserData] = useState([])
   let [InputUserData, setInputUserData] = useState([])
   let [timeBoolean, setTimeBoolean] = useState(false)
   let [nowTime, setNowTime] = useState('')

   const inputDate = useRef(null)
   const inputCal = useRef(null)


   let userTime = []  // 중복을 제거한 유저의 시간
   let array = {} // 유저의 시간대의 시간객체

   /* ======================유저 시간 모음 ====================== */
   useEffect(() => {
   
   }, [nowTime])
   useEffect(() => {
      async function users_datas() {
         const users_data = await axios.post('http://localhost:4041/club/request', { user_grade })

         if (users_data.data !== false) {
            setUserData(users_data.data)
         } else {
            setUserData([InputUserData])
         }
      }
      users_datas()

   }, [InputUserData])

   useEffect(() => {
      console.log("유즈 이펙트 내의 : ", user_data)
      setUserData(user_data)
   }, [InputUserData])

   useEffect(() => {
      setFix(moment(value).format("YYYY/MM/DD"))
   }, [fix])
   overLapTimeDelUser()    // bug
   matchUserTime()         // bug



   function setDailing(e) {
      setDaily(e.target.value)
   }/* 오늘 날짜 */

   function setDating(e) {
      setToDo(e.target.value)
   }/* 오늘 할일 */

   async function submit(e) {
      e.preventDefault();
      let Input = [toDo, daily, user_id, user_grade, user_name, nowDate]
      overLapTimeDelUser()
      matchUserTime()

      var DATE = moment()
      let nowDate = DATE.format("YY/MM/DD/HH/mm/ss")

      setInputUserData(Input)
      inputDate.current.value = ''
      inputCal.current.value = ''

      const users_data = await axios.post('http://localhost:4041/club', { toDo, daily, user_id, user_grade, user_name, nowDate })

      console.log("submit의 :", users_data.data)

      setUserData(users_data.data)
      if (users_data.data == false) {
         return alert("no Todo in Your Club")
      }

   }

   function overLapTimeDelUser() { // 유저간 타임이 맞는 함수
      let timeData = []  // 중복이 있는 유저의 시간
      user_data.map((a, i) => {
         timeData.push(user_data[i].date)
      })
      const set = new Set(timeData) // set객체 이용
      userTime = [...set] // 중복 제거
      // console.log("overLapTimeDelUser Run!")
   }

   function matchUserTime() {
      userTime.map((a, i) => {
         let changedKey = userTime[i] // key값
         let changedValue = [] // value값

         for (let j = 0; j < user_data.length; j++)
            if (userTime[i] === user_data[j].date)
               changedValue.push({ name: user_data[j].name, todo: user_data[j].todo })

         array[changedKey] = changedValue
      })
      // console.log("matchUserTime Run!")
   }


   /* 시간대 : [ [시간대에 맞는 유저의 이름 , 할일] ,
               [시간대에 맞는 유저의 이름 , 할일] ] */



   function Forloop(props) {

      let TalbeData = []
      for (let i = 0; i < Object.keys(array).length; i++) {
         console.log("Forloop array :  ", array)
         console.log("ForLoop setFix : ", props.setFix)
         console.log("ForLoop userTime : ", userTime)
         console.log(userTime[1])
         console.log(props.setFix === userTime[1])
         TalbeData.push(<>
            {
               array[userTime[i]].map((a, k) => {
                  if (props.setFix === userTime[i]) {
                     return (
                        <>

                           <div key={a}>Now time : {userTime[i]}</div>
                           이름은 : {array[userTime[i]][k].name}<br />
                           할일은 : {array[userTime[i]][k].todo} <br />

                           =====================================================

                        </>
                     )
                  }
               })
            }
         </>
         )
         console.log("TalbeData : ", TalbeData)
         console.log("=================================")
      }

      return TalbeData
   }

   function GetBack() {
      let Time = []
      for (let i = 0; i < 24; i++) {
         Time.push(i)
      }
      console.log(Time)

      let timeList = Time.map((a, i) => {
         return <Button key={a} onClick={() => {
            if(i == 0){
               setNowTime(k.concat(`/00`))
               console.log('00')
               setFix(nowTime)
            }else{
               console.log(Time[i])
            setNowTime(k.concat(`/${Time[i]}`))
            setFix(nowTime)
         }
         }

         } >{Time[i]}</Button>
      })

      return timeList
   }


   console.log("array", array)
   let [fix, setFix] = useState('')
   let [k, setK] = useState('')
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
                     setFix(userTime[i])
                  }}>{userTime[i]}</Button>
               </>
            })
         }</div>

         <Calendar onChange={onChange} value={value} />
         <div className="text-gray-500 mt-4">
            <button onClick={() => {
               setK(moment(value).format("YY/MM/DD"))
               setNowTime(k)
               console.log("시간클릭 : ", nowTime);
               timeBoolean == true ? setTimeBoolean(false) : setTimeBoolean(true);

            }}>{moment(value).format("YYYY/MM/DD")} </button>
         </div>
         {timeBoolean == true ? <GetBack></GetBack> : null}
         <Forloop setFix={fix}></Forloop>



      </div>
   )
}
