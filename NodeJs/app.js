const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

const LoginRouter = require('./routes/login')

const app = express();

app.use(express.static(path.join(__dirname, '../React/build')))
app.use(morgan('dev'))
app.use(express.json());
app.use(cors());

app.use('/login', LoginRouter)

app.listen(4041, function () {
  console.log('listening on 4041')
}); 

app.get('/',function(req,res) {
   res.sendFile(path.join(__dirname, 'React/build/index.html'));
})


app.get('*', (req,res) =>{
   res.sendFile(path.join(__dirname, 'React/build/index.html'));
})