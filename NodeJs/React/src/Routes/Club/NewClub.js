import React, { useEffect, useRef, useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';
import axios from 'axios'
import DB from '../db/db'
import Cal from './Component/Calendars'


export default function NewClub() {
  const user_id = sessionStorage.getItem("user_id")
  const user_grade = sessionStorage.getItem("user_grade")
  const user_name = sessionStorage.getItem("user_name")
  
  let [startDate , setStartDate] = useState('')
  let [endDate , setEndDate] = useState('')
  let [todo ,setTodo] = useState('')
  return (
    <div>
      <Cal startDate = {startDate} 
      setEndDate = {setEndDate} 
      endDate = {endDate} 
      setStartDate = {setStartDate}
      todo = {todo}
      setTodo = {setTodo}
      user_id = {user_id}
      user_grade = {user_grade}
      user_name = {user_name}
      ></Cal>
      {/*Cal컴포넌트에서 startDate endDate 관리함. */}
    </div>
  )
}
