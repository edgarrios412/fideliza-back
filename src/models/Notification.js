const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "notification",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"Titulo"
      },
      message: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"Texto por defecto"
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"notification"
      },
      date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue:() => new Date()
      },
    },
    { timestamps: false }
  );
};
