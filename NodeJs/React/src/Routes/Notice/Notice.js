import axios from 'axios'
import React, { useEffect } from 'react'
import DB from '../db/db'
import NavScroll from '../db/NavFun'
import NewPostBtn from './NewPostBtn'
import UploadPost from './UploadPost'
export default function Notice() {
   // Notice 정보를 먼저 불러 와야 함.
   useEffect(() => {
      axios.post(`${DB.host}notice`)
      console.log("im runnning");
   })
  return (
    <div>
      <NavScroll></NavScroll>
      <UploadPost></UploadPost>
      <NewPostBtn></NewPostBtn>
    </div>
  )
}
