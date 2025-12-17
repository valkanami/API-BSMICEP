const { DataTypes } = require("sequelize");
const { sequelize } = require("./database");

const DatosDia = sequelize.define("Datos_Dia", {
    Zafra: { type: DataTypes.STRING, primaryKey: true },
    Fecha: { type: DataTypes.DATE, primaryKey: true },
    dia: { type: DataTypes.STRING, primaryKey: true },
    Apartado: { type: DataTypes.STRING },
    Dato: { type: DataTypes.STRING },
    Valor: { type: DataTypes.FLOAT }
}, {
    tableName: "Datos_Dia",
    timestamps: false,
    freezeTableName: true
});

module.exports = DatosDia;
