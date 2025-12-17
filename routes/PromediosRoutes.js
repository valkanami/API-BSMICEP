const express = require("express");
const router = express.Router();
const Promedios = require("../models/Promedios");

router.get("/promedios", async (req, res) => {
  try {
    const datos = await Promedios.findAll();
    res.json(datos);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/promedios", async (req, res) => {
  const nuevo = await Promedios.create({
    Zafra: "2025-2026",
    Fecha: new Date(),
    Apartado: req.body.Apartado,
    Dato: req.body.Dato,
    Promedio: req.body.Promedio
  });
  res.json(nuevo);
});

module.exports = router;
