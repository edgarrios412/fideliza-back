const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('negocio', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    name:{
      type: DataTypes.INTEGER,
      primaryKey:true,
    },
    description:{
      type: DataTypes.INTEGER,
      primaryKey:true,
    }
  },{timestamps:false});
};