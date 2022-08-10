import React, { useRef, useState } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import NavScroll from '../db/NavFun'
import DB from '../db/db'
import ToggleButton from 'react-bootstrap/ToggleButton';
import axios from 'axios';

export default function NewPost() {

  let title = useRef()
  let mainText = useRef()
  const [checked, setChecked] = useState(false);
  const user_id = sessionStorage.getItem("user_id")
  const user_name = sessionStorage.getItem("user_name")
  async function subMit(e) {
    e.preventDefault();
    console.log(title.current.value)
    
    let InputTitle = title.current.value
    let InputMainText = mainText.current.value
    console.log(`${DB.host}writepost`)
    const user = await axios.post(`${DB.host}notice/writepost`,{ NoticerId : user_id , user_name, title : InputTitle , main_text : InputMainText})
    console.log(user)
    
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
              Checked
            </ToggleButton>

            {/* <button id="btn" type="submit" onClick={subMit}>LOGIN</button> */}

          </form>
        </section>
      </div>
    </div>
  )
}
