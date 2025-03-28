"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cv extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Post
      Cv.belongsTo(models.Post, {
        foreignKey: "postId",
        targetKey: "id",
        as: "postCvData",
      });

      //User
      Cv.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "userCvData",
      });

      // 🛠 Thêm liên kết Cv với Company (mới thêm)
      Cv.belongsTo(models.Company, {
        foreignKey: "companyId",
        targetKey: "id",
        as: "companyData",
      });
    }
  }
  Cv.init(
    {
      userId: DataTypes.INTEGER,
      file: DataTypes.BLOB("long"),
      postId: DataTypes.INTEGER,
      isChecked: DataTypes.TINYINT,
      description: DataTypes.STRING,
      companyId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cv",
    }
  );
  return Cv;
};
