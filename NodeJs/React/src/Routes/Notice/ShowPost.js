import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DB from '../db/db'
import NavScroll from '../db/NavFun'
import Button from 'react-bootstrap/Button';

export default function ShowPost() {
   let par = useParams()
   let params = par["*"]
   let navigate = useNavigate()
   useEffect(() => {
      axios.post(`${DB.host}notice/${params}`).then(
         (res) => {
            setPost(res.data)
         }
      )
   }, [])
   
   let [post, setPost] = useState([])
   let grade = sessionStorage.getItem("user_grade")
   
   function deleteBtn(){
      axios.post(`${DB.host}notice/delete/${params}`).then((res) => {
         if(res.data === true){
            alert('글이 삭제되었습니다')
            navigate('/notice')
         }else{
            alert('알수없는 오류로 글이 삭제되지 않았습니다')
            navigate('/notice')
         }
      })
   }
   // console.log(post.main_text);

   return (
      <div>
         <NavScroll></NavScroll>
         <div className="m-5">
            <table class="table">
               <thead class="thead-dark">
                  <tr>
                     <th className = "writer_idx" scope="col">글번호 : {post.idx}</th>
                     <th scope="col">글제목 : {post.title}</th>
                     <th className="td-created-at" scope="col">작성일 : {post.created_at}</th>
                  </tr>
               </thead>
            </table>
               <div className='w-100'>
                  <h5 className='m-5'>
                     {post.main_text}
                  </h5>
               </div>
            { grade === '2' ? <Button onClick = {deleteBtn} variant="outline-info">글삭제</Button> : null }
         </div>
      </div>
   )
}
