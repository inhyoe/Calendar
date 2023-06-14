import React from 'react';

export default function userChat(props) {

   // ユーザーが相手をクリックしたときの処理
   function onClicked(index) {
      props.setClickedOp(props.opponent[index]); // chat.js - line 29
   }

   return (
      <div className="border border-5 border-primary" style={{ float: 'left', width: '30%', height: '700px' }}>
         {
            // 相手のリストをマッピングして表示
            props.opponent.map((a, i) => {
               return (
                  <div key={a} style={{
                     height: '15%', justifyContents: 'center', display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center'
                  }}>
                     <div className="px-2" style={{ width: '100%' }} onClick={() => {
                        onClicked(i); // 相手をクリックしたときにonClicked関数を呼び出し、選択された相手を設定する
                     }}>
                        <img src="img/puc.png" alt='face' className="rounded-circle m-1" style={{ float: 'left', width: '30%' }} />
                        <p>{a}</p>
                        <p>最新のチャット</p>
                     </div>
                  </div>
               )
            })
         }
      </div >
   )
}