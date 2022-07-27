import React, { useState } from 'react'
import axios from 'axios'

export default function Register() {
  let [id,setId] = useState('')
  let [passwd, setPasswd] = useState('')
  let [name, setName] = useState('')
  let [tel, setTel] = useState('')
  let [email, setEmail] = useState('')
  let [insta, setInsta] = useState('')
  let [github, setGithub] = useState('')

  function getId(e){
    setId(e.target.value)
  }
  function getPwd(e){
    setPasswd(e.target.value)
  }
  function getName(e){
    setName(e.target.value)
  }
  function getTel(e){
    setTel(e.target.value)
  }
  function getEmail(e){
    setEmail(e.target.value)
  }
  function getInsta(e){
    setInsta(e.target.value)
  }
  function getGithub(e){
    setGithub(e.target.value)
  }

  async function subMit(e){
    e.preventDefault()
    const result = await axios.post('/register',{id,passwd,name,tel,email,insta,github,})
    console.log(result)
  }


  return (
    <div>
      <center>
        <h3>Sign Up</h3>
        <form id='user-form' method="post">
          <table>
            <div class="int-area">
              <input type="text" name="id" id="id" autocomplete="off" onChange = {getId} required />
              <label for="id">ID</label>
            </div>
            <div class="int-area">
              <input type="password" name="passwd" id="passwd" autocomplete="off" onChange = {getPwd} required />
              <label for="pw">PW</label>
            </div>
            <div class="int-area">
              <input type="password" name="pwcheck" id="pwcheck" autocomplete="off"  required />
              <label for="pwcheck">PW Check</label>
            </div>
            <div class="int-area">
              <input type="text" name="name" id="name" autocomplete="off" onChange = {getName} required />
              <label for="name">Name</label>
            </div>
            <div class="int-area">
              <input type="tel" name="tel" id="tel" autocomplete="off" min='11' max='11' onChange = {getTel} required />
              <label for="name">TEL</label>
            </div>
            <div class="int-area" id="int2-area" >
              <input type="text" name="email" id="email" placeholder="" autocomplete="off" onChange = {getEmail} required />
              <label for="name">E-mail</label>
            </div>
              <div class="int-area" id="int2-area" >
                <input type="text" name="insta" id="insta" placeholder="" onChange = {getInsta} autocomplete="off" />
                <label for="name">instagram 필수x</label>
              </div>
              <div class="int-area" id="int2-area" onChange = {getGithub} >
                <input type="text" name="github" id="github" placeholder="" autocomplete="off" />
                <label for="name">github 필수x</label>
              </div>
            
          </table>
          <div class="btn-area">
            <button id="btn" type="submit" onClick={subMit}>Regist</button>
          </div>
        </form>
      </center> 
      
      </div>
  )
}
