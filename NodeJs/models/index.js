const Sequelize = require('sequelize');

const User = require('./user');
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

User.init(sequelize);

module.exports = db;