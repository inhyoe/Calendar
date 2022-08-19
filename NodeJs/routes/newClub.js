const express = require('express');
const newClub = require('../models/startEndClub')
const bcrypt = require("bcrypt");
const router = express.Router();



router.post('/', async (req, res) => {
   const { user_id,user_grade,user_name,todo,startDate,endDate } = req.body
   console.log(req.body)
   try {
      let user = await newClub.create({
         cluber: user_id,
         startDate,
         endDate,
         todo,
         nickName: user_name,
         grade: user_grade,
      })
      const user_club = await newClub.findAll({
         where: {
            grade: user_grade
         }
      })
      console.log(user_club)
      // let user_data = []
      // user_club.map((a, i) => {
      //    user_data[i] = user_club[i].dataValues.date.substr(0, 11)
      //    user_club[i].dataValues.date = user_data[i]
      // })
      // console.log(user_data)


      console.log(user)
      console.log("========================= ")

      res.status(201).send(true)
   } catch (error) {
      
      console.log("failed")
      console.log("*****************************************")
      console.log(error)
      res.send(error.message)
   }
})
module.exports = router;