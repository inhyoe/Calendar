import React, { useEffect } from 'react'
import moment from 'moment';

export default function ShowTodo(props) {
   const { groupTodo,value } = props
   useEffect(() => {
      console.log("it's me",groupTodo);
   },[groupTodo])
   console.log("value 는 ",value);
  return (
    <div>
      <div>{moment(props.value).format("YYYY/MM/DD")}날의 일정은 </div>
      {groupTodo.map( (a,i) => {
         return(
            <div key = {i} >
               
               StartTime : {a.Start}
               EndTime : {a.End}
               todo : {a.todo}
            </div>
         )
      })}
    </div>
  )
}
