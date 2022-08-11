const Sequelize = require("sequelize");

module.exports = class Notice extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            idx: {
               type: Sequelize.INTEGER.UNSIGNED,
               primaryKey: true,
               allowNull: false,
               unique: true,
               autoIncrement: true,
            }
            ,
            created_at: {
               type: Sequelize.DataTypes.DATE,
               defaultValue: Sequelize.literal("now()"),
               timestamps: true,
               allowNull: false,
               comment: "올린 날짜"
            }
            ,
            grade: {
               // user grade (등급)
               type: Sequelize.STRING(20),
               allowNull: false,
               defaultValue: 1,
            },

            title: {
               type: Sequelize.STRING(50),
               allowNull: false,
            },
            main_text: {
               type: Sequelize.STRING(4000),
               allowNull: false,
            },
            view_count:{
               type : Sequelize.INTEGER.UNSIGNED,
               defaultValue : 0,
            }
         },
         {
            sequelize,
            timestamps: false,
            modelName: "Notice",
            tableName: "Notice",
            paranoid: false,
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
         }
      );
   }

   static associate(db) {
      db.Notice.belongsTo(db.User, { foreignKey: "NoticerId", targetKey: "id" })
   }
};