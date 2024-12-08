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
        defaultValue:"https://marketplace.canva.com/EAGUiACS8TA/1/0/1600w/canva-BhvjZMXmVL4.jpg"
      },
      enable: {
        type: DataTypes.BOOLEAN,
        defaultValue:true,
      },
    },
    { timestamps: false }
  );
};
