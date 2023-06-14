import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import myDB from '../db/db'

export default function FirstLoad(props) {

   useEffect(() => {
      console.log("opponent", props.clickedOp);
      console.log("user_id", props.user_id);

      // チャットデータを取得するためのAPI呼び出し
      axios.post(`${myDB.host}chat`, { opponent: props.clickedOp, chater: props.user_id }).then((res) => {
         props.setFirstData(res.data)
      })
   }, [props.clickedOp])

   useEffect(() => {
      // スクロール位置を制御するためにuseRefを使用
      if (scrollMenu.current !== undefined && scrollMenu.current !== null) {
         scrollMenu.current.scrollIntoView({ behavior: 'smooth' });
         scrollMenu.current.scrollIntoView(false);
      }
   }, [props.firstData])

   const scrollMenu = useRef();

   return (
      <div ref={scrollMenu} className='hime'>

         {props.firstData.map((a, i) => {
            return (
               <div key={i} style={{ overflow: 'scroll' }}>
                  {a.chater === props.user_id ? (
                     <div>
                        <p>私: {a.chater_name}</p>
                        <p>メッセージ: {a.message}</p>
                     </div>
                  ) : (
                     <div style={{ float: 'right' }}>
                        <p>相手: {a.chater}</p>
                        <p>チャット: {a.message}</p>
                     </div>
                  )}
               </div>
            )
         })}
      </div>
   )
}