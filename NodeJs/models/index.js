const Sequelize = require('sequelize');

const User = require('./user');
const Club = require('./club');
// const Comment = require('./comment');
// const Notice = require('./notice');
// const Board = require('./board');
// const Professor = require('./professor');

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

User.init(sequelize);
Club.init(sequelize);

User.associate(db)
Club.associate(db)


module.exports = db;