import axios from 'axios'
import React, { useState } from 'react'

export default function Club() {
   const user_id = sessionStorage.getItem("user_id")
   const user_grade = sessionStorage.getItem("user_grade")
   const [date , setDate] = useState('')
   const [daily, setDaily] = useState('')
   
   function setDating(e){
      setDate(e.target.value)
   }

   function setDailing(e){
      setDaily(e.target.value)
   }

   function submit(){
      axios.post('/club', {date,daily,user_id,user_grade})
   }   
  return (
    <div>
      {/* 몇월 몇일에 어떤 사람이 어떤 내용을 남겼는지 확인해 주세요. */}
      <form>
      <input placeholder='날자을 입력해 주세요' onChange={setDailing}></input>
      <input placeholder='일정을 입력해 주세요' onChange={setDating}></input>
      <button type = 'submit' onClick={submit}></button>
      </form>
    </div>
  )
}
