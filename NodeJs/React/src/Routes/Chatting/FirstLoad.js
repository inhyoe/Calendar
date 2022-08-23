import axios from 'axios'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import myDB from '../db/db'
import { useSelector } from 'react-redux'
export default function FirstLoad(props) {

   useEffect(() => {
      console.log("opponent", props.clickedOp);
      console.log("user_id", props.user_id);
      axios.post(`${myDB.host}chat`, { opponent: props.clickedOp, chater: props.user_id }).then((res) => {
         props.setFirstData(res.data)
      })
   }, [props.clickedOp])
   useEffect(()=>{
      
      // console.log(scrollMenu.current);
      if(scrollMenu.current !== undefined && scrollMenu.current!==null){
        scrollMenu.current.scrollIntoView({ behavior: 'smooth' })

           scrollMenu.current.scrollIntoView(false)
        }
   },[props.socket])
   const scrollMenu = useRef()
   return (
      <div ref={scrollMenu}  className = 'hime'>

         {props.firstData.map((a, i) => {

            return (
               <div  key = {i} style ={{ overflow :'scroll' }} >
                  { a.chater === props.user_id ? <div><p>나 : {a.chater_name}</p> <p>메세지 :  {a.message}</p></div> :
                     (<div style={{float : 'right'}}><p>상대방 : {a.chater}</p> <p>채팅 : {a.message}</p></div> )
                  }

               </div>
            )
         })}
      </div>
   )
}
