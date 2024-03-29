import React, { useRef } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import NavScroll from '../db/NavFun'
import DB from '../db/db'
import ToggleButton from 'react-bootstrap/ToggleButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function NewPost() {

  let title = useRef()
  let mainText = useRef()
  let navigate = useNavigate()
  const user_id = sessionStorage.getItem("user_id")
  const user_name = sessionStorage.getItem("user_name")

  // 投稿の送信処理
  async function subMit(e) {
    e.preventDefault();
    console.log(title.current.value)

    let InputTitle = title.current.value
    let InputMainText = mainText.current.value

    // サーバーに投稿を送信
    const user = await axios.post(`${DB.host}notice/writepost`, { NoticerId: user_id, user_name, title: InputTitle, main_text: InputMainText })
    if (user.data === true) {
      navigate('/notice') // 成功した場合は、通知一覧ページに遷移する
    } else {
      console.log(user.data);
      alert("失敗しました") // 失敗した場合は、エラーメッセージを表示する
    }
  }

  return (
    <div>
      <div>
        <NavScroll></NavScroll>
        <section className="px-5 my-3">

          <form id='login-tag'>
            <InputGroup className="my-3">
              <InputGroup.Text id="basic-addon1">タイトル</InputGroup.Text>
              <Form.Control
                placeholder="Tittle"
                ref={title}
              />
            </InputGroup>
            <div>
              <InputGroup.Text>本文</InputGroup.Text>
              <Form.Control className="form-control form-control-lg mb-3" rows="10" as="textarea" aria-label="With textarea" ref={mainText} />
            </div>
            <ToggleButton
              className="mb-2 my-3 h-50"
              id="toggle-check"
              type="checkbox"
              variant="outline-primary"
              value="1"
              onClick={subMit}
            >
              投稿する
            </ToggleButton>
          </form>
        </section>
      </div>
    </div>
  )
}
