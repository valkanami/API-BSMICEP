const express = require("express");
const router = express.Router();
const DatosTablas = require("../models/Datos_Tablas");

router.get("/datos_tablas", async (req, res) => {
  try {
    const datos = await DatosTablas.findAll();
    res.json(datos);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/datos_tablas", async (req, res) => {
  const nuevo = await DatosTablas.create({
    Zafra: "2025-2026",
    Fecha: new Date(),
    Apartado: req.body.Apartado,
    Categoria: req.body.Categoria,
    Dato: req.body.Dato,
    Valor: req.body.Valor
  });
  res.json(nuevo);
});

module.exports = router;
