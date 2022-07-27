const express = require('express');

const bcrypt = require("bcrypt");

const router = express.Router();

let id = { id : "asd" , pw : "asd"}

router.post('/', (req,res) => {
   if(id.id === req.body.id) {
      console.log("login : ",req.body) 
      if(id.pw === req.body.pw) {
         return res.status(201).send(true)
      }
      return res.send("pw")
      
   }
   res.send("id")
})


module.exports = router;