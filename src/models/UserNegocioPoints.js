const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('userNegocioPoints', {
    puntos: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
  },{timestamps:false});
};