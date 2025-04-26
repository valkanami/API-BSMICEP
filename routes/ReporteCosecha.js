const express = require('express');
const router = express.Router();
const ReporteCosecha = require('../models/ReporteCosecha');


router.get('/', async (req, res) => {
  try {
    const data = await ReporteCosecha.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/:concepto', async (req, res) => {
  try {
    const concepto = req.params.concepto;
    const data = await ReporteCosecha.getByConcepto(concepto);
    
    if (!data) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const result = await ReporteCosecha.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/:concepto', async (req, res) => {
  try {
    const concepto = req.params.concepto;
    
    const result = await ReporteCosecha.update(concepto, req.body);
    
    if (!result.success) {
      return res.status(404).json(result);
    }
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete('/:concepto', async (req, res) => {
  try {
    const concepto = req.params.concepto;
    
    const result = await ReporteCosecha.delete(concepto);
    
    if (!result.success) {
      return res.status(404).json(result);
    }
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;