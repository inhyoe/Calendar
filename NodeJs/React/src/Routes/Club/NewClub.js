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
  let [startDate , setStartDate] = useState('')
  let [endDate , setEndDate] = useState('')
  return (
    <div>
      <Cal startDate = {startDate} setEndDate = {setEndDate} endDate = {endDate} setStartDate = {setStartDate}></Cal>
      {/* 캘린더 컴포넌트 */}
    </div>
  )
}
