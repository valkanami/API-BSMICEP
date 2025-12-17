const { DataTypes } = require("sequelize");
const { sequelize } = require("./database");

const DatosTurno = sequelize.define("Datos_Turno", {
    Zafra: { type: DataTypes.STRING, primaryKey: true },
    Fecha: { type: DataTypes.DATE, primaryKey: true },
    turno: { type: DataTypes.STRING, primaryKey: true },
    Apartado: { type: DataTypes.STRING },
    Dato: { type: DataTypes.STRING },
    Valor: { type: DataTypes.FLOAT }
}, {
    tableName: "Datos_Turno",
    timestamps: false,
    freezeTableName: true
});

module.exports = DatosTurno;
