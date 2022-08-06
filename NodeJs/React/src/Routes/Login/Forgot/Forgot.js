import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import DB from '../../db/db'
import "../../Login/Login.css"

export default function Forgot() {
  let [id, setId] = useState('')
  let [pw, setPw] = useState('')
  let [inputId, setInputId] =useState('');
  let [inputGroup, setInputGroup] = useState('');

  function getAction(action,e){
    
    var value = e.target.value
    if(action == "getId"){
      setInputId(value)
    }else if(action == "getGroup"){
      setInputGroup(value)
  }
}

  function Clicked(el, opel) {
    // el가 아닌것은 삭제됨.
    // 최초엔 둘다 true값 버튼을 눌렀을때 한 값을 true로 바꾸고 나머지 하나의 값은 false로 만든다.
    // true 값만 남음. 아니지, 한 값만 없에주면 되잖아
    
    setId(el)
    setPw(opel)
  }
  useEffect(() => {
  }, [id])

  function GetBtn(props) {
    return (
      <>
        <Button variant="info" onClick={() => {
          Clicked(props.first, props.second)
        }}>{props.el}</Button>{' '}
      </>
    )
  }

  async function GetId(e) {
    
    const user = await axios.post(`${DB.host}login/forgot`, { name: inputId, grade: inputGroup })
    console.log("user : ", user)
  }

  return (
    <>
      <div>무엇을 잊어버리셨나요?</div>
      {id === '' || id == true ? <GetBtn el={"id"} first={true} second={false} ></GetBtn> : null}
      {pw === '' || pw == true ? <GetBtn el={"pw"} first={false} second={true}></GetBtn> : null}
      {id === true ? <>아이디 찾기 창</> : null}
      {pw === true ? <>pw 찾기 창</> : null}
      <form>

        <input type="text" name="id" id="id" autoComplete="off" onChange={(e) =>{getAction("getId",e)}} required />
        <label htmlFor="id">id</label>
        <input type="text" name="group" id="group" autoComplete="off" onChange={(e)=>{getAction("getGroup",e)}} required />
        <label htmlFor="group">group</label>

        <button onClick={
          (e)=> {
            e.preventDefault();
            GetId()
            
          }
        }>보내기</button>
      </form>
    </>
  )
}
