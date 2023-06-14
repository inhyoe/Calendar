import React, { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import NavScroll from '../db/NavFun';
import DB from '../db/db';
import ToggleButton from 'react-bootstrap/ToggleButton';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function ModifyPost() {
  let par = useParams()
  let params = par["*"]// URLパラメータを取得
  const navigate = useNavigate();
  const title = useRef(); // タイトルの参照を作成
  const mainText = useRef(); // メインテキストの参照を作成
  const [checked] = useState(false); // チェックボックスの状態を管理
  const user_id = sessionStorage.getItem('user_id'); // ユーザーIDを取得

  useEffect(() => {
    axios.post(`${DB.host}notice/modifypost/${params}`).then((res) => {
      console.log(res.data);
      title.current.value = res.data[0].title; // タイトルの参照に値を設定
      mainText.current.value = res.data[0].main_text; // メインテキストの参照に値を設定
    });
  }, []);

  async function subMit(e) {
    e.preventDefault();

    const InputTitle = title.current.value; // タイトルの入力値を取得
    const InputMainText = mainText.current.value; // メインテキストの入力値を取得

    const user = await axios.put(`${DB.host}notice/modifypost/${params}`, {
      NoticerId: user_id,
      title: InputTitle,
      main_text: InputMainText,
    });

    if (user.data === true) {
      alert('修正が成功しました');
      navigate('/notice');
    } else {
      console.log(user.data);
      alert('修正が失敗しました');
    }
  }

  return (
    <div>
      <div>
        <NavScroll />
        <section className="px-5 my-3">
          <form id="login-tag">
            <InputGroup className="my-3">
              <InputGroup.Text id="basic-addon1">タイトル</InputGroup.Text>
              <Form.Control placeholder="タイトル" ref={title} />
            </InputGroup>
            <div>
              <InputGroup.Text>内容</InputGroup.Text>
              <Form.Control
                className="form-control form-control-lg mb-3"
                rows="10"
                as="textarea"
                aria-label="With textarea"
                ref={mainText}
              />
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
              お知らせを修正する
            </ToggleButton>
          </form>
        </section>
      </div>
    </div>
  );
}
