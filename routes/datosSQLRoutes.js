const express = require("express");
const router = express.Router();
const DatosSQL = require("../models/DatosSQL");

router.get("/datos_sql", async (req, res) => {
  try {
    const datos = await DatosSQL.findAll();
    res.json(datos);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/datos_sql", async (req, res) => {
  try {
    const nuevo = await DatosSQL.create({
      Zafra: "2025-2026",
      Fecha: new Date(),
      Dia: req.body.Dia,
      Apartado: req.body.Apartado,
      Dato: req.body.Dato,
      Valor: req.body.Valor,
      Justificacion: req.body.Justificacion
    });

    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
