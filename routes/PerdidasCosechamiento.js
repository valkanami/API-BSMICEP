const express = require('express');
const router = express.Router();
const PerdidasCosechamiento = require('../models/PerdidasCosechamiento');


router.get('/', async (req, res) => {
  try {
    const data = await PerdidasCosechamiento.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/stats', async (req, res) => {
  try {
    const stats = await PerdidasCosechamiento.getStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/latest', async (req, res) => {
  try {
    const data = await PerdidasCosechamiento.getLatest();
    if (!data) {
      return res.status(404).json({ message: 'No hay registros disponibles' });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    
    const data = await PerdidasCosechamiento.getById(id);
    if (!data) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/dia/:dia', async (req, res) => {
  try {
    const dia = req.params.dia;
    const data = await PerdidasCosechamiento.getByDia(dia);
    
    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'No se encontraron registros para el día especificado' });
    }
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/', async (req, res) => {
  try {
    
    const { Dia, PerdidaxCosecha, PolFabrica } = req.body;
    if (!Dia || PerdidaxCosecha === undefined || PolFabrica === undefined) {
      return res.status(400).json({ 
        error: 'Se requieren los campos Dia, PerdidaxCosecha y PolFabrica' 
      });
    }
    
    const result = await PerdidasCosechamiento.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    
    const result = await PerdidasCosechamiento.update(id, req.body);
    
    if (!result.success) {
      return res.status(404).json(result);
    }
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    
    const result = await PerdidasCosechamiento.delete(id);
    
    if (!result.success) {
      return res.status(404).json(result);
    }
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;