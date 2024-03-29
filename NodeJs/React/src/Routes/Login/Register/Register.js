import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DB from '../../db/db'
import axios from 'axios'
import { checkEmail, checkPw, checkPwCorrect, telCheck } from './Func/checkFun'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';



export default function Register() {
  let [id, setId] = useState('')
  let [passwd, setPasswd] = useState('')
  let [passwdCk, setPasswdCk] = useState('')
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

  function getId(e) {
    setId(e.target.value)
  }
  function getPwd(e) {
    setPasswd(e.target.value)
  }
  function getPwdCk(e) {
    setPasswdCk(e.target.value)
  }
  function getName(e) {
    setName(e.target.value)
  }
  function getTel(e) {
    setTel(e.target.value)
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
    if (!checkEmail) {
      console.log(checkEmail)
      alert('이메일 형식이 맞지 않습니다')
      return false
    }
    if (!checkPw) {
      alert('비밀번호 형식이 맞지 않습니다')
      return false
    }
    if (!telCheck) {
      alert('전화번호 형식이 맞지 않습니다')
      return false
    }
    if ((tel).toString().length !== 11) {
      return alert('전화번호 형식이 맞지 않습니다 확인해 주세요')
    }
    console.log(typeof tel)
    const result = await axios.post(`${DB.host}register`, { id, passwd, name, tel, email, insta, github })

    if (result.data) {
      navigate('/login')
    } else {
      alert('형식이 잘못되었습니다.')
    }
  }

  function ShowPwVaild() {
    if (checkPw(passwd) === false) {
      return (<div>비밀번호 형식이 같지 않습니다</div>)
    } else {
      return <div>비밀번호 형식이 같습니다</div>
    }
  }
  function ShowPwCk() {
    if (checkPwCorrect(passwd, passwdCk) === false) {
      return (<div>비밀번호가 같지 않습니다</div>)
    } else {
      return <div>비밀번호가 같습니다</div>
    }
  }
  function ShowEmailCk() {
    if (checkEmail(email) === false) {
      return (<div>이메일 형식이 같지 않습s니다</div>)
    } else {
      return <div>이메일 형식이 같습니다</div>
    }
  }
  function ShowTelCk() {
    if (telCheck(tel) === false) {
      return (<div>비밀번호 형식이 같지 않습니다</div>)
    } else {
      return <div>비밀번호 형식이 같습니다</div>
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

          <OverlayTrigger placement={'right'}
            overlay={
              <Tooltip id={'tooltip-right'}>
                대문자,소문자,특수문자를 포함해 주세요
              </Tooltip>
            }
          >
            <div className="int-area">
              <input type="password" name="passwd" id="passwd" autoComplete="off" onChange={getPwd} required />
              <label htmlFor="pw">PW</label>
              {passwd === '' ? null : <ShowPwVaild></ShowPwVaild>}
            </div>
          </OverlayTrigger>
          <div className="int-area">
            <input type="password" name="pwcheck" id="pwcheck" autoComplete="off" onChange={getPwdCk} required />
            <label htmlFor="pwcheck">PW Check</label>
            {passwd === '' ? null : <ShowPwCk></ShowPwCk>}
          </div>
          <div className="int-area">
            <input type="text" name="name" id="name" autoComplete="off" onChange={getName} required />
            <label htmlFor="name">Name</label>
          </div>
          <div className="int-area">
            <input type="tel" name="tel" id="tel" autoComplete="off" min='11' max='11' onChange={getTel} required />
            <label htmlFor="name">TEL</label>
            {tel === '' ? null : <ShowTelCk></ShowTelCk>}
          </div>
          <div className="int-area" id="int2-area" >
            <input type="text" name="email" id="email" placeholder="" autoComplete="off" onChange={getEmail} required />
            <label htmlFor="name">E-mail</label>
            {email === '' ? null : <ShowEmailCk></ShowEmailCk>}
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
