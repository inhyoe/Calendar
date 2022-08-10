import React from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function NewPostBtn() {
   const data = sessionStorage.getItem("user_grade")
   let navigate = useNavigate()
   function clicked(){
      navigate('/notice/writepost')
   }
  return (
    <>
      {/* 유저의 권한이 있는지 체크하여 있다면 글작성 버튼을 표시. */}
      {data === '2' ? <Button onClick = {clicked} variant="outline-info" >글작성</Button> : null}
    </>
  )
}
