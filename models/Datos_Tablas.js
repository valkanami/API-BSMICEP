const { DataTypes } = require("sequelize");
const { sequelize } = require("./database");

const DatosTablas = sequelize.define("Datos_Tablas", {
    Zafra: { type: DataTypes.STRING, primaryKey: true },
    Fecha: { type: DataTypes.DATE, primaryKey: true },
    Apartado: { type: DataTypes.STRING, primaryKey: true },
    Categoria: { type: DataTypes.STRING },
    Dato: { type: DataTypes.STRING, primaryKey: true },
    Valor: { type: DataTypes.FLOAT }
}, {
    tableName: "Datos_Tablas",
    timestamps: false,
    freezeTableName: true
});

module.exports = DatosTablas;
