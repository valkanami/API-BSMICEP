const { DataTypes } = require("sequelize");
const { sequelize } = require("./database");

const DatosHora = sequelize.define("Datos_Hora", {
    Zafra: { type: DataTypes.STRING, primaryKey: true },
    Fecha: { type: DataTypes.DATE, primaryKey: true },
    hora: { type: DataTypes.STRING, primaryKey: true },
    Apartado: { type: DataTypes.STRING },
    Dato: { type: DataTypes.STRING },
    Valor: { type: DataTypes.FLOAT }
}, {
    tableName: "Datos_Hora",
    timestamps: false,
    freezeTableName: true
});

module.exports = DatosHora;
