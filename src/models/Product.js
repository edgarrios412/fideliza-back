const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"Iphone XR 256GB"
      },
      desc: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue:"Descripcion del producto"
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue:412
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue:20000
      },
      onlyClaimable: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue:false
      },
      image:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"https://drive.usercontent.google.com/download?id=1KucYa0X8N_Y739-me8tPWHsEe4RPNYzP"
      }
    },
    { timestamps: false }
  );
};
