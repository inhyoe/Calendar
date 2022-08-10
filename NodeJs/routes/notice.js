const express = require('express');
const User = require('../models/user');
const Notice = require('../models/notice');
// const bcrypt = require("bcrypt");

const router = express.Router();

router.post('/', async (req, res) => {
   // Id찾기 
   try {
      let notice = await Notice.findAll(
         {
            order: [["post_id", "DESC"]],
            offset: 0
         }
      );
      console.log("notice : ", notice);
      res.send(notice);
   } catch (error) {
      res.send(error)
   }
}
)
// router.post('/', async (req, res) => {
//    console.log("반응옴")
//    res.send('hi')
// })
router.post('/writepost', async (req, res) => {
   try {
      let { NoticerId, user_name , title, main_text } = req.body;
      let us = await Notice.create({
         title,
         main_text,
         NoticerId
      })
      console.log(us)
      res.send('hi')
   } catch (error) {
      res.send(error)
   }
})


module.exports = router;