const express = require('express');
const User = require('../models/user')
const bcrypt = require("bcrypt");

const router = express.Router();



router.post('/id', async (req, res) => {
   // Id探す
   try {
      console.log('/id router react')
      const { name, grade } = req.body
      const user = await User.findOne({ where: { name, grade } })

      console.log(true)
      res.send(user.dataValues.id)
   } catch (error) {
      res.send('error')
   }
}
)
router.post('/pw', async (req, res) => {
   // Pw探す 
   try {
      console.log('/pw router react')
      const { name, grade, pw } = req.body
      const user = await User.findOne({ where: { name, grade } })

      console.log(user.dataValues)
      console.log(pw)
      const hashPwd = await bcrypt.hash(pw, 12);
      await User.update({ passwd: hashPwd }, { where: { name } })

      res.send(true)
   } catch (error) {
      res.send('error')
   }
}
)

module.exports = router;