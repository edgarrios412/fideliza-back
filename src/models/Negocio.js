const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "negocio",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"Pastelitos Papichis"
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"Gastronomía"
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
      countryCode: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"57",
      },
      lat: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 5.031827549639227,
      },
      lon: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: -73.99492566470295 
      },
      image:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"https://drive.usercontent.google.com/download?id=1KucYa0X8N_Y739-me8tPWHsEe4RPNYzP"
      },
      background:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"#ffffff"
      }
    },
    { timestamps: false }
  );
};
