const { DataTypes } = require("sequelize");
const { sequelize } = require("./database");

const RegistroZafra = sequelize.define("RegistroZafra", {
    Zafra: { type: DataTypes.STRING, primaryKey: true },
    Fecha: { type: DataTypes.DATE, primaryKey: true },
    hora: { type: DataTypes.STRING, primaryKey: true },
    Apartado: { type: DataTypes.STRING },
    Dato: { type: DataTypes.STRING },
    Valor: { type: DataTypes.FLOAT }
}, {
    tableName: "RegistroZafra",
    timestamps: false,
    freezeTableName: true
});

module.exports = RegistroZafra;
