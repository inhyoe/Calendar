import axios from 'axios'
import React, { useEffect, useState } from 'react'
import myDB from '../db/db'
export default function FirstLoad(props) {
   useEffect(() => {
      console.log("opponent", props.opponent);
      console.log("user_id", props.user_id);
      axios.post(`${myDB.host}chat`, { opponent: props.opponent, chater: props.user_id }).then((res) => {
         console.log("res.data : ", res.data);
         setFirstData(res.data)
      })

   }, [props.opponent])
   let [fristData, setFirstData] = useState([])
   return (
      <div>
         {fristData.map((a, i) => {
            console.log(a);
            return (
               <div key = {a} style ={{overflow :'scroll'}}>
                  { a.chater === props.user_id ? <div><p>나 : {a.chater}</p> <p>메세지 :  {a.message}</p></div> :
                     (<div style={{float : 'right'}}><p>상대방 : {a.chater}</p> <p>채팅 : {a.message}</p></div> )
                  }
                  
               </div>

            )
         })}
      </div>
   )
}
