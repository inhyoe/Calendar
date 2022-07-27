const bcrypt = require("bcrypt");
const express = require('express');
const User = require("../models/user");


const router = express.Router();


router.post('/',async (req,res) => {
   const { id } = req.body
   const { passwd } = req.body;
   const hashId = await bcrypt.hash(id ,12 );
   const hashPwd = await bcrypt.hash(passwd,12);
   let { body } = req
   console.log('this is tel',body.tel)

   try{
      const user = await User.create({
        id: hashId,
        passwd: hashPwd,
        name: body.name,
        tel: body.tel,
        email: body.email,
      })
   }catch(e){
      console.error(e);
   }
   
})


module.exports = router;