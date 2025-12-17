const { DataTypes } = require("sequelize");
const { sequelize } = require("./database");

const Promedios = sequelize.define("Promedios", {
    zafra: { type: DataTypes.STRING, primaryKey: true },
    fecha: { type: DataTypes.DATE, primaryKey: true },
    apartado: { type: DataTypes.STRING, primaryKey: true },
    dato: { type: DataTypes.STRING, primaryKey: true },
    promedio: { type: DataTypes.FLOAT }
}, {
    tableName: "Promedios",
    timestamps: false,
    freezeTableName: true
});

module.exports = Promedios;
