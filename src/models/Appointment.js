const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "appointment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue:() => new Date()
      },
    },
    { timestamps: false }
  );
};
