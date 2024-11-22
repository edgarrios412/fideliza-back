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
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      document: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastname1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastname2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      birthDate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bloodType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      municipalityCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      departmentCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fullName: {
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
