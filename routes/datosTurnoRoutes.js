const express = require("express");
const router = express.Router();
const DatosTurno = require("../models/Datos_Turno");

router.get("/datos_turno", async (req, res) => {
  try {
    const datos = await DatosTurno.findAll();
    res.json(datos);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/datos_turno", async (req, res) => {
  const nuevo = await DatosTurno.create({
    Zafra: "2025-2026",
    Fecha: new Date(),
    Turno: req.body.Turno,
    Apartado: req.body.Apartado,
    Dato: req.body.Dato,
    Valor: req.body.Valor,
    Justificacion: req.body.Justificacion
  });
  res.json(nuevo);
});

module.exports = router;
