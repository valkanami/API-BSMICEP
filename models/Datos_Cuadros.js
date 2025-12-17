const { DataTypes } = require("sequelize");
const { sequelize } = require("./database");

const DatosCuadros = sequelize.define("Datos_Cuadros", {
    Zafra: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    Fecha: {
        type: DataTypes.DATE,
        primaryKey: true
    },
    Apartado: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    Categoria: {
        type: DataTypes.STRING
    },
    Dato: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    Valor: {
        type: DataTypes.FLOAT
    }
},
{
    tableName: "Datos_Cuadros",
    timestamps: false,
    freezeTableName: true
});

module.exports = DatosCuadros;
