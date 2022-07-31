import React from 'react'
import axios from 'axios'
import {Route,Routes , Link} from 'react-router-dom'
export default function MainPage() {
  let a = false
  const data = axios.post("/MainPage").then( (res) => {
    return res
  } ) 

  return (
  <div>
      <h1>메인페이지입니다</h1>
      { a === true ? null : 
      <Link to = '/login' > 로그인 하러 가기 </Link> }
    { console.log(data) }
      {/* <Link to = '/login' > 로그인 하러 가기 </Link> */}
    </div>

  )
}
