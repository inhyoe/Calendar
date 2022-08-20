import DB from '../db/db'
import React from 'react';

export default function userChat(props) {
   const user_id = sessionStorage.getItem("user_id")
   const user_grade = sessionStorage.getItem("user_grade")
   const user_name = sessionStorage.getItem("user_name")

   function onClicked (index) {
      props.setClickedOp(props.opponent[index]); // chat.js - line 29
   }

   return (
      <div className="border border-5 border-primary" style={{ float: 'left', width: '30%', height: '700px' }}>
         {
            props.opponent.map((a, i) => {
               return (
                  <div className="sex" style={{
                     height: '15%', justifyContents: 'center', display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center'
                  }}>
                     <div className="px-2" style={{ width: '100%' }} onClick = {() => {
                        onClicked(i) // onClicked시 상대방을 선택할 수 있음
                     }}>
                        <img src="img/puc.png" className="rounded-circle m-1" style={{ float: 'left', width: '30%' }} />
                        <p>{a}</p>
                        <p>최근 채팅</p>
                     </div>
                  </div>)
            })
         }
      </div >

   )
}
