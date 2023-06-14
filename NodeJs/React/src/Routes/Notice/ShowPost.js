import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DB from '../db/db';
import NavScroll from '../db/NavFun';
import Comment from './Comment/Comment';
import Button from 'react-bootstrap/Button';
import Footer from '../db/Footer';

export default function ShowPost() {
   let par = useParams()
   let params = par["*"]
   const navigate = useNavigate();
   const [post, setPost] = useState([]);
   const grade = sessionStorage.getItem('user_grade');
   const user_name = sessionStorage.getItem('user_name');

   useEffect(() => {
      axios.post(`${DB.host}notice/${params}`).then(
         (res) => {
            setPost(res.data)
         }
      )
   }, [])

   // ポスト修正ボタンをクリックするとページ移動
   function modifyBtn() {
      navigate(`/notice/modify/${params}`)
   }

   // ポスト削除ボタンをクリックするとリクエスト送信
   function deleteBtn() {
      axios.post(`${DB.host}notice/delete/${'*'}`).then((res) => {
         if (res.data === true) {
            alert('投稿が削除されました');
            navigate('/notice');
         } else {
            alert('不明なエラーのため、投稿が削除されませんでした');
            navigate('/notice');
         }
      });
   }

   return (
      <div>
         <NavScroll />
         {console.log(grade)}
         {console.log("post : ", post)}
         <div className="m-5">
            <div className="buttons">
               {/* 管理者レベルが2の場合にのみ、投稿削除ボタンを表示 */}
               {grade === '2' && (
                  <Button onClick={deleteBtn} variant="outline-info">
                     ポスト削除
                  </Button>
               )}
               {/* 管理者レベルが2の場合にのみ、投稿編集ボタンを表示 */}
               {grade === '2' && (
                  <Button onClick={modifyBtn} variant="outline-info">
                     ポスト修正
                  </Button>
               )}
            </div>

            <table className="table">
               <thead className="thead-dark">
                  <tr>
                     <th className="writer_idx" scope="col">
                        ポスト番号: {post.idx}
                     </th>
                     <th scope="col">タイトル: {post.title}</th>
                     <th className="td-created-at" scope="col">
                        作成日: {post.created_at}
                     </th>
                  </tr>
               </thead>
            </table>

            <div className="w-100">
               <h5 className="m-5">{post.main_text}</h5>
            </div>
         </div>

         <Comment grade={grade} user_name={user_name} params={'*'} />

         <Footer />
      </div>
   );
}
