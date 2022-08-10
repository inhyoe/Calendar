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


module.exports = router;