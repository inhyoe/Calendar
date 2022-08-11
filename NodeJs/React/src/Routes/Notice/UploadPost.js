// 최초에 포스팅된 정보를 업로드하기
import Table from 'react-bootstrap/Table';
import NewPostBtn from './PostBtn'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DB from '../db/db';
import { useNavigate } from 'react-router-dom';
import "./Notice.css"
export default function UploadPost() {
   let navigate = useNavigate()
   useEffect(() => {
      axios.post(`${DB.host}notice`).then((res) => {
         setNotice(res.data)
      })
   },[])
   async function movePost(noticeIdx){
      navigate(`${noticeIdx}`)
   }
   
   let [notice, setNotice] = useState([])
   console.log("notice : ", notice);
   return (
      <div>
         
         <div className = "w-70 p-5">
            
               <h1>공지글</h1>
               <NewPostBtn className="float-right"></NewPostBtn>
            
            <Table bordered hover size="lg">
               <thead>
                  <tr>
                     <th className = "td-no">번호</th>
                     <th className = "td-created-at">공지일</th>
                     <th>공지내용</th>
                     <th className = "td-writer">운영자</th>
                  </tr>
               </thead>

               <tbody>
                  {notice.map((a, i) => {
                     return (
                        <tr key={a["idx"]} onClick={()=>{
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

