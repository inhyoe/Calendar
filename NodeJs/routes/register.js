const bcrypt = require("bcrypt");
const express = require('express');
const User = require("../models/user");


const router = express.Router();

// 会員登録
router.post('/',async (req,res) => {
   const { passwd } = req.body;
   const hashPwd = await bcrypt.hash(passwd,12);
   let { body } = req

   try{
      const user = await User.create({
        id: body.id,
        passwd: hashPwd,
        name: body.name,
        tel: body.tel,
        email: body.email,
      })
      console.log("登録されたユーザー名", user.name)
      await res.status(201).send(true)
   }catch(e){
      res.send(false)
      console.error(e);
   }
   
})


module.exports = router;