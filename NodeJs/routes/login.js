const express = require('express');

const bcrypt = require("bcrypt");

const router = express.Router();

router.post('/', (req,res) => {
   console.log("login : ",req.body) 
})


module.exports = router;