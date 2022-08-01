import React from 'react'
import axios from 'axios'
import {Route,Routes , Link} from 'react-router-dom'
export default function MainPage() {
  
  const data = sessionStorage.getItem("user_id")
  
  return (
  <div>
      <h1>메인페이지입니다</h1>
      { data !== null ? <Link to = "/logout">로그아웃 하러가기</Link> : 
      <Link to = '/login' > 로그인 하러 가기 </Link> }
      {console.log(data)}
      {/* <Link to = '/login' > 로그인 하러 가기 </Link> */}
    </div>

  )
}
