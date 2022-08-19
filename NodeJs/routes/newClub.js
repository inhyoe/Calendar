const express = require('express');
const newClub = require('../models/startEndClub')
const bcrypt = require("bcrypt");
const router = express.Router();
const sequelize = require("sequelize");
const Op = sequelize.Op;



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
            grade: user_grade,
            startDate :{
               [Op.like] : "%" + startDate.substr(0,10) + "%"
            }
         },
      })
      console.log(user_club[0].dataValues)
      let user_data = []
      user_club.map((a, i) => {
         console.log("datavalues : ",a.dataValues);
         let StEd = {}
         let Start = a.dataValues.startDate.split('/')[3].concat(`:${a.dataValues.startDate.split('/')[4]}`)
         let End = a.dataValues.endDate.split('/')[3].concat(`:${a.dataValues.endDate.split('/')[4]}`)
         let TODO = a.dataValues.todo
         let User_name = a.dataValues.nickName
         StEd["Start"] = Start // ? 시작하는 시각
         StEd["End"] = End     // ? 끝나는 시각
         StEd['todo'] = TODO   // ? DB에서 불러온 데이터
         StEd['user_nickname'] = User_name
         user_data.push(StEd)  // ? user_data에 데이터를 Push해줌 
      })
      console.log(user_data)
      user_data.sort((a,b)=> {
         return a.Start.split(':')[0] - b.Start.split(':')[0]
      } )
      
      res.status(201).send(user_data)
   } catch (error) {
      
      console.log("failed")
      console.log("*****************************************")
      console.log(error)
      res.send(error.message)
   }
})
router.post('/search' ,async ( req, res ) =>{
   const { user_grade,startDate } = req.body
   console.log("startDate : ",startDate)
   console.log('++++++++++++++++++++++++++++++++++++++')
   const user_club = await newClub.findAll({
      where: {
         grade: user_grade,
         startDate :{
            [Op.like] : "%" + startDate.substr(0,10) + "%"
         }
      },
   })
   let user_data = []
      user_club.map((a, i) => {
         
         console.log("datavalues : ",a.dataValues);
         let StEd = {}
         let Start = a.dataValues.startDate.split('/')[3].concat(`:${a.dataValues.startDate.split('/')[4]}`)
         let End = a.dataValues.endDate.split('/')[3].concat(`:${a.dataValues.endDate.split('/')[4]}`)
         let TODO = a.dataValues.todo
         let User_name = a.dataValues.nickName
         StEd["Start"] = Start // ? 시작하는 시각
         StEd["End"] = End     // ? 끝나는 시각
         StEd['todo'] = TODO   // ? DB에서 불러온 데이터
         StEd['user_nickname'] = User_name
         user_data.push(StEd)  // ? user_data에 데이터를 Push해줌 
      })
      console.log(user_data)
      user_data.sort((a,b)=> {
         return a.Start.split(':')[0] - b.Start.split(':')[0]
      } )
      
      res.status(201).send(user_data)
})
module.exports = router;