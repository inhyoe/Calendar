import axios from 'axios'
import React, { useState } from 'react'
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
   
   let date = new Date()
   console.log(date);
   let [value, onChange] = useState(new Date());
  return (
   <>
    <div>Club</div>
    <Calendar onChange={onChange} value={value} />
    </>
  )
}
