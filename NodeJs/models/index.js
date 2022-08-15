const Sequelize = require('sequelize');

const User = require('./user');
const Club = require('./club');
const Notice = require('./notice');
const Chat = require('./chat');

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
db.Club = Club;
db.Notice = Notice;
db.Chat = Chat;

User.init(sequelize);
Club.init(sequelize);
Notice.init(sequelize);
Chat.init(sequelize);

User.associate(db);
Notice.associate(db);
Club.associate(db);
Chat.associate(db);


module.exports = db;