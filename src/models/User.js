const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('user', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    name:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastname:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    password:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    code:{
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },{timestamps:false});
};