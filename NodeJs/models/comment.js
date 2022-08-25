const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {

            comment_idx: {
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
            commenter:{
               type: Sequelize.DataTypes.STRING(20),
               allowNull: false,
            },
            grade: {
               // user grade (등급)
               type: Sequelize.STRING(20),
               allowNull: false,
               defaultValue: 1,
            },
            sub_text: {
               type: Sequelize.STRING(4000),
               allowNull: false,
            },
         },
         {
            sequelize,
            timestamps: false,
            modelName: "Comment",
            tableName: "Comment",
            paranoid: false,
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
         }
      );
   }

   static associate(db) {
      db.Comment.belongsTo(db.Notice, { foreignKey: "Notice_idx", targetKey: "idx" })
   }
};