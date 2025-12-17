const express = require("express");
const router = express.Router();

const RegistroZafra = require("../models/RegistroZafra");
const DatosHora = require("../models/Datos_Hora");
const DatosDia = require("../models/Datos_Dia");
const DatosTurno = require("../models/Datos_Turno");
const DatosTablas = require("../models/Datos_Tablas");
const DatosCuadros = require("../models/Datos_Cuadros");
const Promedios = require("../models/Promedios");
const DatosSQL = require("../models/DatosSQL");

router.post("/insertar", async (req, res) => {
    try {
        const { tabla, apartado, categoria, dato, valor, hora, turno, dia, promedio } = req.body;

        const Zafra = "2025-2026";
        const Fecha = new Date();

        let respuesta;

        switch (tabla) {

            case "RegistroZafra":
                respuesta = await RegistroZafra.create({
                    Zafra, Fecha, Apartado: apartado, Dato: dato, Hora: hora, Valor: valor
                });
                break;

            case "Datos_Hora":
                respuesta = await DatosHora.create({
                    Zafra, Fecha, Apartado: apartado, Dato: dato, Hora: hora, Valor: valor
                });
                break;

            case "Datos_Dia":
                respuesta = await DatosDia.create({
                    Zafra, Fecha, Apartado: apartado, Dato: dato, Dia: dia, Valor: valor
                });
                break;

            case "Datos_Turno":
                respuesta = await DatosTurno.create({
                    Zafra, Fecha, Apartado: apartado, Dato: dato, Turno: turno, Valor: valor
                });
                break;

            case "Datos_Tablas":
                respuesta = await DatosTablas.create({
                    Zafra, Fecha, Apartado: apartado, Categoria: categoria, Dato: dato, Valor: valor
                });
                break;

            case "Datos_Cuadros":
                respuesta = await DatosCuadros.create({
                    Zafra, Fecha, Apartado: apartado, Categoria: categoria, Dato: dato, Valor: valor
                });
                break;

            case "Promedios":
                respuesta = await Promedios.create({
                    Zafra, Fecha, Apartado: apartado, Dato: dato, Promedio: promedio
                });
                break;

            case "DatosSQL":
                respuesta = await DatosSQL.create({
                    Zafra, Fecha, Apartado: apartado, Dato: dato, Dia: dia, Valor: valor
                });
                break;

            default:
                return res.status(400).json({ error: "Tabla no reconocida" });
        }

        res.json({ mensaje: "Insertado correctamente", info: respuesta });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al insertar datos" });
    }
});

module.exports = router;
