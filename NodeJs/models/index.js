const Sequelize = require('sequelize');

const User = require('./user');
const Club = require('./club');
const Notice = require('./notice');
const Chat = require('./chat');
const AddChat = require('./addChat');
const StartEndClub = require('./startEndClub');
const Comment = require('./comment');
// const Qboard = require('./qboard');
// const Qcomment = require('./qcomment');
// const Faq = require('./faq');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.User = User;
db.AddChat = AddChat;
db.Club = Club;
db.Notice = Notice;
db.Chat = Chat;
db.StartEndClub = StartEndClub;
db.Comment = Comment;

User.init(sequelize);
AddChat.init(sequelize);
Club.init(sequelize);
Notice.init(sequelize);
Chat.init(sequelize);
StartEndClub.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Notice.associate(db);
Club.associate(db);
Chat.associate(db);
AddChat.associate(db);
StartEndClub.associate(db);
Comment.associate(db);
AddChat.associate(db);

module.exports = db;