const express = require("express");
const router = express.Router();
const DatosHora = require("../models/Datos_Hora");

router.get("/datos_hora", async (req, res) => {
  try {
    const datos = await DatosHora.findAll();
    res.json(datos);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/datos_hora", async (req, res) => {
  const nuevo = await DatosHora.create({
    Zafra: "2025-2026",
    Fecha: new Date(),
    Hora: req.body.Hora,
    Apartado: req.body.Apartado,
    Dato: req.body.Dato,
    Valor: req.body.Valor,
    Justificacion: req.body.Justificacion
  });
  res.json(nuevo);
});

module.exports = router;
