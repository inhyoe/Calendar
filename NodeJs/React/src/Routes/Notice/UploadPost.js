import Table from 'react-bootstrap/Table';
import NewPostBtn from './PostBtn'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DB from '../db/db';
import { useNavigate } from 'react-router-dom';
import "./Notice.css"

export default function UploadPost() {
   let navigate = useNavigate()

   // requestを受け取るためにリクエストを送る部分です。
   useEffect(() => {
      axios.post(`${DB.host}notice`).then((res) => {
         setNotice(res.data)
      })
   }, [])

   // お知らせをクリックすると、その記事に移動する関数です。
   async function movePost(noticeIdx) {
      navigate(`${noticeIdx}`)
   }

   let [notice, setNotice] = useState([])
   console.log("notice : ", notice);

   return (
      <div>
         <div className="w-70 p-5">
            <h1>お知らせ</h1>
            <NewPostBtn className="float-right"></NewPostBtn>
            <Table bordered hover size="lg">
               <thead>
                  <tr>
                     <th className="td-no">番号</th>
                     <th className="td-created-at">お知らせ日</th>
                     <th>お知らせ内容</th>
                     <th className="td-writer">運営者</th>
                  </tr>
               </thead>
               <tbody>
                  {notice.map((a, i) => {
                     return (
                        <tr key={a["idx"]} onClick={() => {
                           movePost(notice[i].idx)
                        }}>
                           <td>{notice[i].idx}</td>
                           <td>{notice[i].created_at}</td>
                           <td>{notice[i].title}</td>
                           <td>{notice[i].NoticerId}</td>
                        </tr>
                     )
                  })}
               </tbody>
            </Table>
         </div>
      </div>
   )
}
