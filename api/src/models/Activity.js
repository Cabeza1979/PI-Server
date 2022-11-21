const { DataTypes, Op } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('activity', {
    id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement:true,
         },
    nombre: {
         type: DataTypes.STRING,
        // unique:true
         },
    dificultad: {
         type: DataTypes.INTEGER,
         validate:{
          min:1,
          max:5
        },
         },
    duracion: {
         type: DataTypes.INTEGER
         },
    temporada: {
         type: DataTypes.ENUM(['Summer', 'Fall', 'Spring', 'Winter']),
         defaultValue: 'Winter'
         },
  },{timestamps: false});
};