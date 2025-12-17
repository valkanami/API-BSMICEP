const express = require("express");
const router = express.Router();
const RegistroZafra = require("../models/RegistroZafra");

router.get("/registro_zafra", async (req, res) => {
  try {
    const datos = await RegistroZafra.findAll();
    res.json(datos);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/registro_zafra", async (req, res) => {
  const nuevo = await RegistroZafra.create({
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
