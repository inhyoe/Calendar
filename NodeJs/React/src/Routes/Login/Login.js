import React, { useState } from 'react'
import { Route, Routes, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import "./Login.css"

export default function Login() {
  let navigate = useNavigate()

  const [id, SetId] = useState('')
  const [pw, SetPw] = useState('')

  function getId(e) {
    SetId(e.target.value)
  }

  function getPw(e) {
    SetPw(e.target.value);
  }

  async function subMit(e) {
    e.preventDefault();
    // console.log("id는 : ", id) // id 표시
    // console.log("pw : ", pw) // pw 표시
    
    const user = await axios.post('/login', { id, pw })
    
    if(user !== "id"){
      if(user === "pw"){
        return  alert('pw Error')
      }
      console.log(user)
      sessionStorage.setItem("user_id" , user.data.id)
      sessionStorage.setItem("user_name" , user.data.name)
      sessionStorage.setItem("user_grade" , user.data.grade)
      console.log(sessionStorage.getItem("user_id") )
      navigate('/')
    }else{
      return alert('Id Error')
    }
  }

  return (
    <>
    <div id = "body">
      <section id="login-form">
        <h1>Login</h1>
        <form id='login-tag'>
          <div className="int-area">
            <input type="text" name="id" id="id" autoComplete="off" onChange={getId} required />
            <label htmlFor="id">USER NAME</label>
          </div>
          <div className="int-area">
            <input type="password" name="pw" id="pw" autoComplete="off" onChange={getPw} required />
            <label htmlFor="pw">PASSWORD</label>
          </div>
          <div className="btn-area">
            <button id="btn" type="submit" onClick={subMit}>LOGIN</button>
          </div>
          <div className="caption">
            <Link to="/login/forgot" >Forgot Password?</Link>
            <Link to="/login/register" >회원가입</Link>
          </div>
        </form>
      </section>
      </div>
    </>

  )
}

