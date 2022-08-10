import axios from 'axios';
import React, { useEffect } from 'react'
import DB from '../db/db';

export default function UploadPost() {
   useEffect(() => {
      axios.post(`${DB.host}notice`).then((res) => {
         console.log(res.data)
      })
      console.log("im runnning");
   })
   return (
    <div>UploadPost</div>
  )
}
