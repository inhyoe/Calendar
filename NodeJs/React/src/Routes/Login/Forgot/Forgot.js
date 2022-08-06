import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import DB from '../../db/db'
import "../../Login/Login.css"

export default function Forgot() {
  let [id, setId] = useState('')
  let [pw, setPw] = useState('')
  let [inputId, setInputId] = useState('');
  let [inputGroup, setInputGroup] = useState('');
  let [inputPw, setInputPw] = useState('');

  // Action에 따라 state를 수정함.
  function getAction(action, e) {
    var value = e.target.value
    console.log(value)
    if (action == "getId") {
      console.log("idChange")
      setInputId(value)
    } else if (action == "getGroup") {
      console.log("GroupChange")
      setInputGroup(value)
    } else if (action == "getPw") {
      setInputPw(value)
    }
  }
  /*클릭 시 el = true 값 or false값
    opel = opposite elment의 축약형 / el의 반대값
    8/6일 6:30분 [유창훈] */
  function Clicked(el, opel) {
    setId(el)
    setPw(opel)
  }
  // useEffect(() => {
  //   console.log(id)
  // }, [id])

  // 이 함수는 아이디를 잊어버렸을 때 서버에게 유저가 입력한 데이터를 보내고
  // 그 데이터가 맞으면, 서버에 저장된 데이터를 받아오는 값 8/6일 6:30분 [유창훈]
  async function GetId() {

    const user = await axios.post(`${DB.host}login/forgot/id`, { name: inputId, grade: inputGroup })
    console.log("user : ", user)
  }
  async function GetPw() {
    const user = await axios.post(`${DB.host}login/forgot/pw`, { name: inputId, grade: inputGroup, pw: inputPw })
    console.log("user : ", user)
  }

  // ======================= 컴포넌트 ===============================
  // 컴포넌트 Clicked함수 실행 8/6일 6:30분 [유창훈]
  function GetBtn(props) {
    return (
      <>
        <Button variant="info" onClick={() => {
          Clicked(props.first, props.second)
        }}>{props.el}</Button>{' '}
      </>
    )
  }
  // Id찾기 컴포넌트

  const SearchId = React.memo(function SearchId() {
    return (
      <>
        <div>아이디 찾기 창</div>
        <form >
          <input type="text" name="id" id="id" autoComplete="off" onChange={(e) => { getAction("getId", e) }} required />
          <label htmlFor="id">id</label>
          <input type="text" name="group" id="group" autoComplete="off" onChange={(e) => { getAction("getGroup", e) }} required />
          <label htmlFor="group">group</label>
          {/* <input onChange={() => GetId(e.target.value)}></input> */}
          <button onClick={
            (e) => {
              e.preventDefault();
              GetId()
            }
          }>보내기</button>
        </form>
      </>
    )
  })
  function SearchPw() {
    return (
      <>
        <div>비밀번호 찾기 창</div>
        <form>
          <input type="text" name="id" id="id" autoComplete="off" onChange={(e) => { getAction("getId", e) }} required />
          <label htmlFor="id">id</label>
          <input type="text" name="group" id="group" autoComplete="off" onChange={(e) => { getAction("getPw", e) }} required />
          <label htmlFor="group">group</label>

          <button onClick={
            (e) => {
              e.preventDefault();
              GetId()
            }
          }>보내기</button>
        </form>
      </>
    )
  } // -> 컴포넌트들
  return (
    <>
      <div>무엇을 잊어버리셨나요?</div>
      {id === '' || id == true ? <GetBtn el={"id"} first={true} second={false} ></GetBtn> : null}
      {pw === '' || pw == true ? <GetBtn el={"pw"} first={false} second={true}></GetBtn> : null}
      {id === true ? <>
        <div>아이디 찾기 창</div>
        <form >
          <input type="text" name="id" id="id" autoComplete="off" onChange={(e) => { getAction("getId", e) }} required />
          <label htmlFor="id">id</label>
          <input type="text" name="group" id="group" autoComplete="off" onChange={(e) => { getAction("getGroup", e) }} required />
          <label htmlFor="group">group</label>
          {/* <input onChange={() => GetId(e.target.value)}></input> */}
          <button onClick={
            (e) => {
              e.preventDefault();
              GetId()
            }
          }>보내기</button>
        </form>
        </> : null}
      {pw === true ? <>
        <div>비밀번호 찾기 창</div>
        <form>
          <input type="text" name="id" id="id" autoComplete="off" onChange={(e) => { getAction("getId", e) }} required />
          <label htmlFor="id">id</label>
          <input type="text" name="group" id="group" autoComplete="off" onChange={(e) => { getAction("getGroup", e) }} required />
          <label htmlFor="group">group</label>
          <input type="text" name="pw" id="pw" autoComplete="off" onChange={(e) => { getAction("getPw", e) }} required />
          <label htmlFor="pw">pw</label>

          <button onClick={
            (e) => {
              e.preventDefault();
              GetPw()
            }
          }>보내기</button>
        </form>
      </> : null}
      {/* 8/6일 7:48분 컴포넌트로 만들시 무한 랜더링 되는 버그가 있음 그래서 임시로 넣어둠. */}
      <form>

      </form>
    </>
  )
}
