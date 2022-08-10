import React, { useEffect, useRef, useState } from 'react'

export default function Club2() {
   // useEffect(() => {
   //    setSex(inputVal)
   // })
   const a = useRef() 
   let [inputVal, SetInputVal] = useState('')
   let [sex , setSex] = useState('')

   function submit(e)
   {  e.preventDefault() 
      console.log(a.current.value);
      SetInputVal(a.current.value)   
   }

   return (
      <div classname="App">
         <form>
         <input ref = {a}></input>
         <button onClick={submit}>asda</button>
         <p>{inputVal}</p>
         </form>

      </div>
   );
}



