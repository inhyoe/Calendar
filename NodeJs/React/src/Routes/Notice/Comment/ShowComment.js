import axios from 'axios';
import React, { useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import myDB from '../../db/db';
import './Comment.css'
export default function ShowComment(props) {
   let { params, comment, setComment, user_name } = props

   useEffect(() => {
      axios.post(`${myDB.host}comment/${params}`).then(res => {
         console.log(res.data);
         setComment(res.data)
      })
   }, [])
   /**
    * 글 제거하는 함수
    * @param {Object} a 
    */
   function onClicked(user_array) {
      let comment_idx = user_array.comment_idx
      axios.delete(`${myDB.host}comment/delete/${params}`, { data: { comment_idx, user_name } }).then(res => {
         // 혹시나 모를 변수에 대비
         if (res.data.result === true)
            setComment(res.data.comment)
         else
            alert('올바르지 않은 형식입니다.')
      })
   }
   return (
      <Table className="tables">
         <thead>
            <tr>
               <th id="nameZone"></th>
               <th id="commentZone"></th>
               <th class="timeZone"></th>
            </tr>
         </thead>
         <tbody>
            {
               comment.map((a, i) => {
                  return (
                     <tr>
                        <td>{a.commenter}</td>
                        <td>{a.sub_text}</td>
                        <td class="timeZone">{a.created_at}
                        {a.commenter === user_name ? <button type="button" class="btn-close" aria-label="Close" onClick={() => {
                           onClicked(a)
                        }}></button> : null}
                        </td>
                        
                     </tr>)
               })
            }
         </tbody>
      </Table>
   )
}
