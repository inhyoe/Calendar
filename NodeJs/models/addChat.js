const Sequelize = require("sequelize");

module.exports = class AddChat extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
         addUser :{
            type : Sequelize.DataTypes.STRING(20),
            allowNull : false,
            primaryKey : true,
         },
         addedUser : {
            type : Sequelize.DataTypes.STRING(20),
            allowNull : false,
            primaryKey : true
         }
         ,
        
      },
      {
        sequelize,
        timestamps: false,
        modelName: "addChat",
        tableName: "addChat",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.AddChat.belongsTo(db.User , { foreignKey: "addUser" , targetKey : "name"})
    db.AddChat.belongsTo(db.User , { foreignKey: "addedUser" , targetKey : "name"})
  }
};