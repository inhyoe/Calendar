const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          // user id
          type: Sequelize.STRING(300),
          primaryKey: true,
          allowNull: false,
          unique: true,
          comment: "user id",
        },
        passwd: {
          // user password
          type: Sequelize.STRING(300),
          allowNull: false,
        },
        name: {
          // user Nickname
          type: Sequelize.STRING(100),
          unique: true,
          allowNull: false,
        },
        tel: {
          // user tel
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        grade: {
          // user grade (등급)
          type: Sequelize.STRING(200),
          allowNull: false,
          defaultValue: 1,
        },
        email: {
          // user email
          type: Sequelize.STRING(300),
          isEmail: true,
          allowNull: false,
          unique: true,
        },
        github: {
          // user github주소
          type: Sequelize.STRING(300),
          allowNull: true,
          unique: true,
        },
        instagram: {
          // user instagram주소
          type: Sequelize.STRING(300),
          allowNull: true,
          unique: true,
        },
        kakao: {
          // user kakao주소
          type: Sequelize.STRING(300),
          allowNull: true,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "User",
        tableName: "user",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    // 클럽 유저
    db.User.hasMany(db.Club , { foreignKey: "cluber" , sourceKey : "id"})
    db.User.hasMany(db.Notice , { foreignKey: "NoticerId" , sourceKey : "id"})
    db.User.hasMany(db.Chat , { foreignKey: "chater" , sourceKey : "id"})
    db.User.hasMany(db.AddChat , { foreignKey: "addUser" , sourceKey : "name"})
    db.User.hasMany(db.AddChat , { foreignKey: "addedUser" , sourceKey : "name"})
    db.User.hasMany(db.StartEndClub , { foreignKey: "cluber" , sourceKey : "id"})
    
    
   
  }
};
