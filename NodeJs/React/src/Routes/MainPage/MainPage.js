/* eslint-disable */
import React from 'react'
import Footer from '../db/Footer'
import NavScroll from '../db/NavFun'

export default function MainPage() {

  return (
    <div>
      <NavScroll></NavScroll>
      <div id="body">
        <h1>Daily Select</h1>
        {/* <Link to = '/login' > 로그인 하러 가기 </Link> */}
      </div>
      <Footer></Footer>
    </div>

  )
}
