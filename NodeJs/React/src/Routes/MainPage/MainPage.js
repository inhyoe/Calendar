import React from 'react'
import {Route,Routes , Link} from 'react-router-dom'
export default function MainPage() {
  return (
    <div>
      <h1>메인페이지입니다</h1>
      <Link to = '/login' > 로그인 하러 가기 </Link>
    </div>

  )
}
