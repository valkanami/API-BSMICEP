const express = require('express');
const router = express.Router();
const DextranasBrix = require('../models/dextranasBrix');


router.get('/', async (req, res) => {
  try {
    const data = await DextranasBrix.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const result = await DextranasBrix.create(req.body);
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
    
    const result = await DextranasBrix.update(id, req.body);
    
    if (!result.success) {
      return res.status(404).json(result);
    }
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;