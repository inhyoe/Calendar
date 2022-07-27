const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const LoginRouter = require('./routes/login')
const RegisterRouter = require('./routes/register');

const app = express();
dotenv.config();




app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 30000,
  },
  name: "session-cookie",
}));

app.use(express.static(path.join(__dirname, '../React/build')))
app.use(morgan('dev'))
app.use(express.json());
app.use(cors());

app.use('/login', LoginRouter)
app.use('/register', RegisterRouter);

app.listen(4041, function () {
  console.log('listening on 4041')
}); 

app.get('/',function(req,res) {
   res.sendFile(path.join(__dirname, 'React/build/index.html'));
   console.log("it's me!")
})
app.post('/', (req,res) => {
   console.log("why me?")
})

app.get('*', (req,res) =>{
   res.sendFile(path.join(__dirname, 'React/build/index.html'));
})