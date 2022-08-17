const Sequelize = require("sequelize");

module.exports = class Chat extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
         created_at: {
            type: Sequelize.DataTypes.DATE,
            defaultValue: Sequelize.literal("now()"),
            timestamps: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
            comment: "올린 날짜"
         },
         chater :{
            type : Sequelize.DataTypes.STRING(20),
            primaryKey : true,
         },
         chater_name : {
            type : Sequelize.DataTypes.STRING(20),
            allowNull : false,
         }
         ,
         grade: {
            // user grade (등급)
            type: Sequelize.STRING(20),
            allowNull: false,
            defaultValue: 1,
         },
         opponent: {
            type: Sequelize.STRING(20),
            allowNull: false,
         },
         message: {
            type: Sequelize.STRING(200),
            allowNull: false,
         },
        
      },
      {
        sequelize,
        timestamps: false,
        modelName: "chat",
        tableName: "chat",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
   db.Chat.belongsTo(db.User , { foreignKey: "chater" , targetKey: "id"})
  }
};