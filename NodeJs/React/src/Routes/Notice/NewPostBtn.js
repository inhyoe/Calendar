import React from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function NewPostBtn() {
   const data = sessionStorage.getItem("user_grade")
   let navigate = useNavigate()
   function clicked(){
      navigate('/notice/newpost')
   }
  return (
    <>
      {data === '2' ? <Button onClick = {clicked} variant="outline-info" >글작성</Button> : null}
    </>
  )
}
