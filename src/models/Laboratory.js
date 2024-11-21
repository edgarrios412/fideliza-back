const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "laboratory",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"Clinica X"
      },
      direction: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"Cra 2 # 8-68, Zipaquirá"
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"311-8268264"
      },
      lat: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 5.0215614,
      },
      lon: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: -73.9920667 
      }
    },
    { timestamps: false }
  );
};
