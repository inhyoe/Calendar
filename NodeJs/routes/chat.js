const Chat = require('../models/chat');
const User = require('../models/user')
const bcrypt = require("bcrypt");

const http = require("http");
const express = require("express");
const app = express();
const { Server } = require("socket.io");
const cors = require("cors");
let userList = []
// <- io서버를 활성화 하기 위한 require
app.use(cors());

// const DB = require('../React/src/Routes/db/db');

const router = express.Router();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",// 접속할 리엑트 서버명
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  userList.push(socket.id);
  console.log(userList);
  socket.on("send_message", (data) => {
   console.log("sended message : ",data);
   console.log(data.opponent); 
    io.emit("receive_message", 'ㅎㅇㅇ')
    console.log('성공 !');

  });
   
});

server.listen(3001, () => { // 겹치지 않는 서버
  console.log("SERVER IS RUNNING");
});

router.post('/', async (req, res) => {
   // Id찾기 
   try {
      console.log('반응옴')
      // const { name, grade } = req.body
      console.log('반응옴')
      // const user = await User.findOne({ where: { name, grade } })
      
      res.send({id : "fuck"})
   } catch (error) {
      res.send('error')
   }
}
)

module.exports = router;