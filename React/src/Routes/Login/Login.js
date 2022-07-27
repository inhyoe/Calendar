import React, { useState } from 'react'
import {Route,Routes , Link} from 'react-router-dom'
import axios from 'axios'
import "./Login.css"

export default function Login() {

  const [id,SetId] = useState('')
  const [pw,SetPw] = useState('')
  
  function getId(e){
    SetId(e.target.value)
  }

  function getPw(e){
    SetPw(e.target.value);
  }

  function subMit(e){
    console.log("id : " , id)
    console.log("pw : " , pw)
    axios.post('/login',{"id" : id, "pw" : pw})
  }

  return (
    <>
      <section id="login-form">
        <h1>Login</h1>
        <form id='login-tag'>
          <div className="int-area">
            <input type="text" name="id" id="id" autoComplete="off" onChange={getId} required/>
              <label htmlFor="id">USER NAME</label>
          </div>
          <div className="int-area">
            <input type="password" name="pw" id="pw" autoComplete="off" onChange={getPw} required/>
              <label htmlFor="pw">PASSWORD</label>
          </div>
          <div className="btn-area">
            <button id="btn" type="submit" onClick={subMit}>LOGIN</button>
          </div>
          <div className="caption">
            <Link to = "/login/forgot" >Forgot Password?</Link>
            <Link to = "/login/register" >회원가입</Link>
          </div>
        </form>
      </section>
    </>

  )
}

