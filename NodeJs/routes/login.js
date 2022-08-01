const express = require('express');


const User = require('../models/user')
const bcrypt = require("bcrypt");

const router = express.Router();



router.post('/', async (req, res) => {
   try {
      const user = await User.findOne({ where: { id: req.body.id } })
      console.log("user : ", user)
      // console.log("req.id" , req.body.id)
      // console.log("req.passwd" , req.body.pw)     
      // const hashPwd = await bcrypt.hash(req.body.pw,12);
      // console.log("hashPwd" , hashPwd)
      // console.log("user passwd",user.passwd)
      if (user) {
         const checkPw = await bcrypt.compare(req.body.pw, user.passwd)
         console.log("login : ", req.body)
         if (checkPw) {
            req.session.IsLogined = user;
            return res.status(201).send(user)
         }
         return res.send("pw")

      }
      return res.send("id")
   
   }
   catch (err) {
      return false
   }
}

)

router.post( '/logined', async (req,res) => {


})

module.exports = router;