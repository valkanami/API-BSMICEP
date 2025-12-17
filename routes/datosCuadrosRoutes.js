const express = require("express");
const router = express.Router();
const DatosCuadros = require("../models/Datos_Cuadros");

// GET todo
router.get("/datos_cuadros", async (req, res) => {
  try {
    const datos = await DatosCuadros.findAll();
    res.json(datos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// POST
router.post("/datos_cuadros", async (req, res) => {
  const nuevo = await DatosCuadros.create({
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


module.exports = router;
