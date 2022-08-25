import axios from 'axios';
import React, { useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useParams } from 'react-router-dom';
import myDB from '../../db/db';
import './Comment.css'
export default function InputComment(props) {
  let { user_name , grade, params, setComment } = props
  
  let inputTxt = useRef('')
  async function onClicked(){
    let inputedTxt = inputTxt.current.value
    await axios.post(`${myDB.host}comment/create/${params}`, { sub_text : inputedTxt , commenter : user_name , grade}).then( res =>{
      alert("댓글 등록 완료!")
      inputTxt.current.value =  ''
    })
    await axios.post(`${myDB.host}comment/${params}`).then(
      res => {
        setComment(res.data)
      }
    )
  }
  return (
    <div className = "input-commnet">
      <InputGroup>
        <InputGroup.Text>댓글</InputGroup.Text>
        <Form.Control ref={inputTxt} as="textarea" aria-label="With textarea" />
        <Button variant="outline-secondary" id="button-addon2" onClick={onClicked}>
          등록
        </Button>
      </InputGroup>
    </div>
  )
}
