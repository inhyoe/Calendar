import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DB from '../db/db'
import NavScroll from '../db/NavFun'

export default function ShowPost() {
   let par = useParams()
   let params = par["*"]
   useEffect(() => {
      axios.post(`${DB.host}notice/${params}`).then(
         (res) => {
            setPost(res.data)
         }
      )
   }, [])
   async function a() {
      let me = await axios.post(`${DB.host}notice/${params}`)
      console.log(me);
   }
   let [post, setPost] = useState([])
   console.log(post);
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
               <div>
                  <h5 className='m-5'>
                     {post.main_text}
                  </h5>
               </div>
            </table>
         </div>
         <button onClick={a}>asd</button>
      </div>
   )
}
