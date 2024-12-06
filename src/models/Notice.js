const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "notice",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"Lunes a Miercoles = Más puntos!"
      },
      body: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"Multiplica 150% tus puntos obtenidos por realizar compras de Lunes a Miercoles!"
      },
      created: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: new Date()
      },
      initDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      limitDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      image:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"https://drive.usercontent.google.com/download?id=1KucYa0X8N_Y739-me8tPWHsEe4RPNYzP"
      },
      enable: {
        type: DataTypes.BOOLEAN,
        defaultValue:true,
      },
    },
    { timestamps: false }
  );
};
