const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const LoginRouter = require('./routes/login')
const RegisterRouter = require('./routes/register');
const clubRouter = require('./routes/club');
const ForgotRouter = require('./routes/forgot');

const app = express();
dotenv.config();

// 시퀄라이즈
const { sequelize } = require("./models");

sequelize
  .sync({ force: false })
  // sequelize
  //   .sync({ force: true })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

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
  name: "Id_value",
}));

app.use(express.static(path.join(__dirname, 'React/build')))
app.use(morgan("tiny"))

app.use(express.json());
app.use(cors());

app.use('/login', LoginRouter)
app.use('/register', RegisterRouter);
app.use('/club', clubRouter);
app.use('/login/forgot',ForgotRouter)

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