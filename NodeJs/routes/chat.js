const Chat = require('../models/chat');
const AddChat = require('../models/addChat')
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
// ioサーバーを活性化するためのrequire
app.use(cors());

const router = express.Router();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",// 接続するreactサーバー名
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
  })

  try {
    socket.on("send_message", async (data) => {
      data["socketId"] = socket.id
      console.log("user_list 는 :", user_list);

      // もし相手が接続してない時は？
      // DBに単にsocket.idを保存するのではなく、chatを保存しましょう。

      let matchUser = user_list.filter((datas) => {
        return datas.user_id === data.opponent
      })
      let matchUser2 = user_list.filter((datas) => {
        return datas.user_id === data.user_id
      })
      // filterは条件に合う配列オブジェクトを探して配列で返します。
      console.log("match User : ", matchUser);
      console.log("match User2 : ", matchUser2);
      delete data.socketId


      let { user_id, user_name, user_grade, opponent, message } = data;
      await Chat.create(
        {
          chater: user_id,
          chater_name: user_name,
          grade: user_grade,
          opponent,
          message
        }
      )
      console.log("user_id : ", user_id);
      console.log("opponent : ", opponent);
      console.log("user_name : ", user_name);
      console.log(" object : ", { user_name, message });
      try {
        io.to(matchUser[0].socket_id).emit("receive_message", { user_name, chater: user_id, message })
        io.to(matchUser2[0].socket_id).emit("receive_message", { user_name, chater: user_id, message })
      } catch (error) {
        io.to(matchUser2[0].socket_id).emit("receive_message", { user_name, chater: user_id, message })
        console.log("ユーザーオフライン");
      }
      console.log('成功!');
    });
  } catch (error) {
    //! 예외처리를 해주어야함 React에서 맞지않는 유저를 넣었을 때 에러를 발생하도록
    return error.message;
  }
  socket.on("disconnect", () => {
    socket.disconnect()
  });

});

server.listen(3001, () => { // 重複しないサーバー
  console.log("SERVER IS RUNNING");
});

router.post('/', async (req, res) => {
  // Id探す
  try {
    let { chater, opponent } = req.body

    const findData = await Chat.findAll({
      where: {
        [Op.or]: [{ chater, opponent }, { "chater": opponent, "opponent": chater }],
      },
      order: [["created_at"]]
    })
    console.log(findData);
    res.send(findData)
  } catch (error) {
    console.log(error);
    res.send('error')
  }
}
)
// ユーザーとユーザーが検索した相手を探す
router.post('/create', async (req, res) => {
  try {
    const { user_id, opponent } = req.body
    const createdChat = await AddChat.create(
      {
        addUser: user_id,
        addedUser: opponent
      }
    )
    console.log(createdChat)
    res.send(true)
  } catch (error) {
    console.log("에러 발생!")
    res.send(error)
    console.log(error)
  }
})

router.post('/bringdata', async (req, res) => {
  let addUser = []
  const { user_id } = req.body
  let searchData = await AddChat.findAll({
    where: {
      // ユーザーが追加されたか追加されたものを探すDBクエリ文
      [Op.or]: [{ addUser: user_id }, { addedUser: user_id }],
    }
  })
  searchData.map((result, i) => {
    if (result.dataValues.addUser === user_id) {
      addUser.push(result.dataValues.addedUser)
    } else {
      addUser.push(result.dataValues.addUser)
    }

  })
  res.send(addUser)
})

module.exports = router;