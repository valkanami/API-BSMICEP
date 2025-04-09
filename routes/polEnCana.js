const express = require('express');
const router = express.Router();
const PolEnCana = require('../models/polEnCana');

// Obtener todos los registros
router.get('/', async (req, res) => {
  try {
    const data = await PolEnCana.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear un nuevo registro
router.post('/', async (req, res) => {
  try {
    const result = await PolEnCana.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un registro existente
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    
    const result = await PolEnCana.update(id, req.body);
    
    if (!result.success) {
      return res.status(404).json(result);
    }
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;