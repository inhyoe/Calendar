import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
  let [id, setId] = useState('')
  let [passwd, setPasswd] = useState('')
  let [name, setName] = useState('')
  let [tel, setTel] = useState('')
  let [email, setEmail] = useState('')
  let [insta, setInsta] = useState('')
  let [github, setGithub] = useState('')

  useEffect(() => {
    if (isNaN(tel)) {
      alert('잘못된 입력입니다')
      console.log(isNum(tel))
    }
  }, [tel])

  let navigate = useNavigate()
  function isNum(val) {
    return !isNaN(val)
  }
  function getAction(action,e){
    var value = e.target.value
    if(action == "getId"){
      setId(value)
    }else if(action == "getPwd"){
      setPasswd(value)
    }else if(action == "getName"){
      setName(value)
    }
  }

  function getId(e) {
    setId(e.target.value)
  }
  function getPwd(e) {
    setPasswd(e.target.value)
  }
  function getName(e) {
    setName(e.target.value)
  }
  function getTel(e) {
    setTel((e.target.value).toString())
    if (isNaN(tel)) {
      e.target.value = ''
    }
  }
  function getEmail(e) {
    setEmail(e.target.value)
  }
  function getInsta(e) {
    setInsta(e.target.value)
  }
  function getGithub(e) {
    setGithub(e.target.value)
  }

  async function subMit(e) {
    e.preventDefault()
    console.log("tel : ", tel)
    console.log("me", (tel).toString().length)

    if ((tel).toString().length !== 11) {
      return alert('전화번호 형식이 맞지 않습니다 확인해 주세요')
    }
    console.log(typeof tel)
    const result = await axios.post('http://localhost:4041/register', { id, passwd, name, tel, email, insta, github })

    if (result.data) {
      navigate('/login')
    } else {
      alert('형식이 잘못되었습니다.')
    }
  }


  return (
    <div>
      <center>
        <h3>Sign Up</h3>
        <form id='user-form' method="post">
          
            <div className="int-area">
              <input type="text" name="id" id="id" autoComplete="off" onChange={getId} required />
              <label htmlFor="id">ID</label>
            </div>
            <div className="int-area">
              <input type="password" name="passwd" id="passwd" autoComplete="off" onChange={getPwd} required />
              <label htmlFor="pw">PW</label>
            </div>
            <div className="int-area">
              <input type="password" name="pwcheck" id="pwcheck" autoComplete="off" required />
              <label htmlFor="pwcheck">PW Check</label>
            </div>
            <div className="int-area">
              <input type="text" name="name" id="name" autoComplete="off" onChange={getName} required />
              <label htmlFor="name">Name</label>
            </div>
            <div className="int-area">
              <input type="tel" name="tel" id="tel" autoComplete="off" min='11' max='11' onChange={getTel} required />
              <label htmlFor="name">TEL</label>
            </div>
            <div className="int-area" id="int2-area" >
              <input type="text" name="email" id="email" placeholder="" autoComplete="off" onChange={getEmail} required />
              <label htmlFor="name">E-mail</label>
            </div>
            <div className="int-area" id="int2-area" >
              <input type="text" name="insta" id="insta" placeholder="" onChange={getInsta} autoComplete="off" />
              <label htmlFor="name">instagram 필수x</label>
            </div>
            <div className="int-area" id="int2-area" onChange={getGithub} >
              <input type="text" name="github" id="github" placeholder="" autoComplete="off" />
              <label htmlFor="name">github 필수x</label>
            </div>

          
          <div className="btn-area">
            <button id="rg_btn" type="submit" onClick={subMit}>Regist</button>
          </div>
        </form>
      </center>

    </div>
  )
}
  