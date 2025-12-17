const express = require("express");
const router = express.Router();
const { sequelize } = require("../models/database");

router.get("/apartados", async (req, res) => {
  try {
    const [result] = await sequelize.query(`
      SELECT DISTINCT Apartado
      FROM vw_DatosUnificados
      ORDER BY Apartado
    `);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/datos-por-apartado/:apartado", async (req, res) => {
  try {
    const apartado = req.params.apartado;

    const [result] = await sequelize.query(`
      SELECT *
      FROM vw_DatosUnificados
      WHERE Apartado = :apartado
      ORDER BY Fecha DESC
    `, {
      replacements: { apartado }
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
