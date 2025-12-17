const { DataTypes } = require('sequelize');
const { sequelize } = require('./database');

const DatosSQL = sequelize.define('DatosSQL', {
  Zafra: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Dia: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Apartado: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Dato: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Valor: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Justificacion: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'DatosSQL',
  timestamps: false
});


DatosSQL.removeAttribute('id');

module.exports = DatosSQL;
