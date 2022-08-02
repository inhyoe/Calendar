const express = require('express');
const club = require('../models/club') 


const bcrypt = require("bcrypt");

const router = express.Router();


// router.post('/', async (req, res) => {
//    try {
//       const user = await User.findOne({ where: { id: req.body.id } })
//       console.log("user : ", user)
//       // console.log("req.id" , req.body.id)
//       // console.log("req.passwd" , req.body.pw)     
//       // const hashPwd = await bcrypt.hash(req.body.pw,12);
//       // console.log("hashPwd" , hashPwd)
//       // console.log("user passwd",user.passwd)
//       if (user) {
//          const checkPw = await bcrypt.compare(req.body.pw, user.passwd)
//          console.log("login : ", req.body)
//          if (checkPw) {
//             req.session.IsLogined = user;
//             return res.status(201).send(user)
//          }
//          return res.send("pw")

//       }
//       return res.send("id")
   
//    }
//    catch (err) {
//       return false
//    }
// }

// )

router.post( '/', async (req,res) => {
   const { toDo,user_id,user_grade,user_name, nowDate,daily } = req.body
   
   try {
      await club.create({
         cluber : user_id,
         date : nowDate,
         name : user_name,
         grade : user_grade,
         todo : toDo
      })

      const user = await club.findOne({
         id : user_id
      })
      console.log("success! ")
      console.log("현재 시각은 : ",req.body.nowDate)
      console.log("========================= ")
      console.log(user)
      res.status(201).send(user)
   } catch (error) {
      console.log("현재 시각은 : ",req.body.nowDate)
      console.log("failed")
      console.log("*****************************************")
      console.log(error)
      res.send(error.message)
   }
   
})

module.exports = router;