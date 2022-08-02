const Sequelize = require("sequelize");

module.exports = class Club extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        
         id: {
          type: Sequelize.STRING(300),
          primaryKey: true,
          allowNull: false,
          unique: true,
          comment: "user id",
        },
        name: {
          // user name
          type: Sequelize.STRING(200),
          primaryKey : true,
          allowNull: false,
        }
      ,
        date : {
           type: Sequelize.STRING(200),
           allowNull: false,
        }
        ,
        
        grade: {
          // user grade (등급)
          type: Sequelize.STRING(200),
          allowNull: false,
          defaultValue: 1,
        },
        
        todo :{
         type: Sequelize.STRING(200),
         allowNull: false,
         defaultValue : "일정 없음",
        }
         ,
        
      },
      {
        sequelize,
        timestamps: false,
        modelName: "club",
        tableName: "club",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
   db.Club.belongsTo(db.User , { foreignKey: "cluber" , targetKey: "grade"})
  }
};