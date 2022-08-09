import React, { useEffect, useState } from 'react'

export default function Club2() {
   useEffect(() => {
      console.log(state)
   })


   const [state, setState] = useState({ fName: "", lName: "" });
        
            
            setState(prevState => ({
                ...prevState,
                "name": "shit"
            }));
        
   // const handleChange = (e) => {
   //    let updatedValue = {};
   //    updatedValue = { item1: e.target.value };
   //    setShopCart(shopCart => ({
   //       ...shopCart,
   //       ...updatedValue
   //    }));
   // }
   return (
      <div classname="App">
         {}
      </div>
   );
}



