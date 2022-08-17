import DB from '../db/db'
import React from 'react';
import { useQuery, useMutation, queryCache } from "react-query";
import axios from 'axios';

export default function userChat(props) {
   const user_id = sessionStorage.getItem("user_id")
   const user_grade = sessionStorage.getItem("user_grade")
   const user_name = sessionStorage.getItem("user_name")
   // const order_currency = "BTC";
   //  const payment_currency = "KRW";
   // const { status, data, error, isFetching } = useQuery([order_currency, payment_currency],async () => {
   // console.log("im running");
   // const data = await axios.post(`https://api.bithumb.com/public/transaction_history/BTC_KRW`, { user_id, user_grade, user_name })
   // return data.data
   // })
   // console.log("isFetching" , isFetching);
   // console.log("status : ", status);
   // console.log("er :", error );
   // console.log("dtat : " ,data );




   return (
      <div className="border border-5 border-primary" style={{ float: 'left', width: '30%', height: '700px' }}>
         <div className="sex" style={{
            height: '15%', justifyContents: 'center', display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
         }}>
            <div className = "px-2" style={{width: '100%'}}>
               <img src="img/puc.png" className="rounded-circle m-1" style={{ float: 'left', width: '30%' }} />
               <p>{props.opponent}</p>
               <p>최근 채팅</p>
            </div>
         </div> {/* << = 반복될 div박스 */}
      </div >

   )
}
