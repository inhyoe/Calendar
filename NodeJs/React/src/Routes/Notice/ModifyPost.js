import React, { useEffect, useRef, useState } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import NavScroll from '../db/NavFun'
import DB from '../db/db'
import ToggleButton from 'react-bootstrap/ToggleButton';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';



export default function ModifyPost() {
  let par = useParams()
  let params = par["*"]

  let title = useRef()
  let mainText = useRef()
  let navigate = useNavigate()
  const [checked, setChecked] = useState(false);
  const user_id = sessionStorage.getItem("user_id")
  const user_name = sessionStorage.getItem("user_name")
  useEffect(() => {
    const user = axios.post(`${DB.host}notice/modifypost/${params}`).then(res => {
      title.current.value = res.data[0].title
      mainText.current.value = res.data[0].main_text
    })
  }, [])
  async function subMit(e) {
    e.preventDefault();

    let InputTitle = title.current.value
    let InputMainText = mainText.current.value

    const user = await axios.put(`${DB.host}notice/modifypost/${params}`, { NoticerId: user_id, title: InputTitle, main_text: InputMainText })
    if (user.data === true) {
      alert("Successfully")
      navigate('/notice')
    } else {
      console.log(user.data);
      alert("실패하였습니다")
    }
  }
  return (
    <div>
      <div>
        <NavScroll></NavScroll>
        <section className="px-5 my-3">

          <form id='login-tag'>
            <InputGroup className="my-3">
              <InputGroup.Text id="basic-addon1">제목</InputGroup.Text>
              <Form.Control
                placeholder="Tittle"
                ref={title}
              />

            </InputGroup>
            <div>
              <InputGroup.Text>With textarea</InputGroup.Text>
              <Form.Control className="form-control form-control-lg mb-3" rows="10" as="textarea" aria-label="With textarea" ref={mainText} />

            </div>
            <ToggleButton
              className="mb-2 my-3 h-50"
              id="toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={checked}
              value="1"
              onClick={subMit}
            >
              글수정
            </ToggleButton>



          </form>
        </section>
      </div>
    </div>
  )
}
