const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "exam",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue:() => new Date()
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "1"
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf"
      },
    },
    { timestamps: false }
  );
};
