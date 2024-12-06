const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      countryCode: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"57",
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pushToken: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
