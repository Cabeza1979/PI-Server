const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('country', {
      
      id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
          },
      nombre: {  
                type: DataTypes.STRING, 
                allowNull: false
              },
      bandera: {
                type: DataTypes.TEXT,
                allowNull: false
              },
      googlemap:{
                type: DataTypes.TEXT, 
              },
      escudo:{
                type: DataTypes.TEXT, 
              },
      continente: {
                  type: DataTypes.STRING,
                  allowNull: false
                },
      capital: {
                type: DataTypes.STRING,
                allowNull: false
              },
      subregion: {
                  type: DataTypes.STRING
                },
      area: {
              type: DataTypes.DOUBLE
            },
      poblacion: {
                  type: DataTypes.INTEGER
                }
  },{timestamps: false});
};

