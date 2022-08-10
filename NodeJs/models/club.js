const Sequelize = require("sequelize");

module.exports = class Club extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        key_number :{
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          unique: true,
          autoIncrement: true,
        }
        ,        
         cluber: {
          type: Sequelize.STRING(300),
          primaryKey: true,
          allowNull: false,
          comment: "user id",
        },
        date : {
           primaryKey: true,
           type: Sequelize.STRING(200),
           allowNull: false,
        }
        ,
        name: {
          // user name
          type: Sequelize.STRING(200),
          allowNull: false,
        }
      ,
        
        grade: {
          // user grade (등급)
          type: Sequelize.STRING(200),
          allowNull: false,
          defaultValue: 2,
        },
    
        todo :{
         type: Sequelize.STRING(200),
         allowNull: false,
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
   db.Club.belongsTo(db.User , { foreignKey: "cluber" , targetKey: "id"})
  }
};