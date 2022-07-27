const { request } = require('express');
const express = require('express');


const router = express.Router();

let id = { id : "asd" , pw : "asd"}

router.post('/', (req,res) => {
   return res.send('success')
})


module.exports = router;