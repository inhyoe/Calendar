const Chat = require('../models/chat');
const User = require('../models/user')
const bcrypt = require("bcrypt");
const _ = require('lodash');
const http = require("http");
const express = require("express");
const app = express();
const { Server } = require("socket.io");
const cors = require("cors");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
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
let user_list = []
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('user_id', (data) => {
    data["socket_id"] = socket.id
    user_list.push(data)
    for (let i = 0; i < user_list.length; i++) {
      for (let k = i + 1; k < user_list.length; k++) {
        if (user_list[i].user_id === user_list[k].user_id) {
          user_list.splice(i, 1)
        }
      }
    }
    console.log("Last : ", user_list);


  })
  
  try {
    socket.on("send_message", async (data) => {
      data["socketId"] = socket.id
      console.log("sended message : ", data);
      console.log("user_list 는 :", user_list);

      // 만약 상대방이 접속하지 않았을 때에는?
      // DB에 단순히 socket.id를 저장하지 말고, data를 저장하자
      console.log(data.opponent);

      
        let matchUser = user_list.filter((datas) => {
          return datas.user_id === data.opponent
        })
        // filter는 조건이 맞는 배열 객체를 찾아 배열로 리턴해줌
        console.log("match User : ", matchUser);
        delete data.socketId
        console.log(data);

      let { user_id, user_name, user_grade, opponent, message } = data;
      await Chat.create(
        {
          chater: user_id,
          chater_name: user_name,
          grade: user_grade,
          opponent: opponent,
          message
        }
      )
      console.log("user_id : ", user_id);
      console.log("opponent : ", opponent);
      const findData = await Chat.findAll({
        where: {
          chater: user_id,
          opponent
        }
      })
      console.log("find Data : ", findData);
      try {
        io.to(matchUser[0].socket_id).emit("receive_message", findData)
      } catch (error) {
        console.log("유저 오프라인");
      }
      console.log('성공 !');
    });
  } catch (error) {

  }
  socket.on("disconnect", () => {
    socket.disconnect()

  });

});

server.listen(3001, () => { // 겹치지 않는 서버
  console.log("SERVER IS RUNNING");
});

router.post('/', async (req, res) => {
  // Id찾기 
  try {
    let { chater,opponent } = req.body
    console.log('반응옴');
    console.log(chater);
    console.log(opponent);
    const findData = await Chat.findAll({
      where: {
        [Op.or] : [{ chater, opponent } , { "chater" : opponent , "opponent" : chater}],
      },
      order : [ ["created_at" , 'DESC'] ]
    })
    console.log(findData);
    res.send(findData)
  } catch (error) {
    console.log(error);
    res.send('error')
  }
}
)

module.exports = router;