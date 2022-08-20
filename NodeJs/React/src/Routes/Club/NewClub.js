import React, { useState } from 'react'

import 'react-calendar/dist/Calendar.css';

// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';
import './myCal.css'
import Cal from './Component/Calendars'
import ShowTodo from './Component/ShowTodo';
import NavFun from '../db/NavFun';
import Footer from '../db/Footer';


export default function NewClub() {
  const user_id = sessionStorage.getItem("user_id")
  const user_grade = sessionStorage.getItem("user_grade")
  const user_name = sessionStorage.getItem("user_name")
  
  let [startDate , setStartDate] = useState('') // * 시작 시간 입력
  let [endDate , setEndDate] = useState('') // * 끝나는시간 입력
  let [todo ,setTodo] = useState('') // * 할일 입력
  let [groupTodo , setGroupTodo] = useState([]) // *
  let [userTodo , setUserTodo] = useState([]) // *
  let [value, onChange] = useState(new Date());

  return (
    <div>
      // ! 모션은 react-spring을 이용하여 해보자.
      <NavFun></NavFun>
      <div className='mt-5'>
      <Cal startDate = {startDate} 
      setEndDate = {setEndDate} 
      endDate = {endDate} 
      setStartDate = {setStartDate}
      todo = {todo}
      setTodo = {setTodo}
      user_id = {user_id}
      user_grade = {user_grade}
      user_name = {user_name}
      setGroupTodo = {setGroupTodo}
      value = {value}
      onChange = {onChange}
      ></Cal>
      </div>
      <div>
      <ShowTodo
        groupTodo = {groupTodo}
        value = {value}
        user_grade = {user_grade}
        user_id = {user_id}
        setGroupTodo = {setGroupTodo}
        userTodo = {userTodo}
        setUserTodo = {setUserTodo}
      />
      </div>
      <Footer></Footer>
      
      {/*Cal컴포넌트에서 startDate endDate 관리함. */}
    </div>
  )
}
