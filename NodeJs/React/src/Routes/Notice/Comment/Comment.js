import React, { useState } from 'react'
import InputComment from './InputComment'
import ShowComment from './ShowComment'

export default function comment(props) {
   let { user_name , grade ,params} = props
   let [comment , setComment] = useState([])
  return (
    <div className='m-5'>
      <ShowComment params = {params} comment = {comment} setComment = {setComment} user_name = {user_name}/>
      <InputComment user_name={user_name} grade={grade} params = {params} setComment = {setComment}/>
   </div>
  )
}
