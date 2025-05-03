const express = require('express');
const models = require('../models/models');


function createRouter(model) {
  const router = express.Router();

  
  router.get('/', async (req, res) => {
    try {
      const data = await model.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  
  router.get('/por-fecha', async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      
      if (!startDate || !endDate) {
        return res.status(400).json({ 
          message: 'Se requieren los parámetros startDate y endDate' 
        });
      }
      
      const data = await model.getByDateRange(new Date(startDate), new Date(endDate));
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}


const setupRoutes = (app) => {
 
  Object.entries(models).forEach(([key, model]) => {
    
    const routePath = key
      .replace(/([A-Z])/g, '-$1')     
      .replace(/^-/, '')              
      .toLowerCase();                 
    
    app.use(`/api/${routePath}`, createRouter(model));
    console.log(`Ruta registrada: /api/${routePath}`);
  });

  
  app.get('/api', (req, res) => {
    const endpoints = Object.keys(models).map(key => {
      const routePath = key
        .replace(/([A-Z])/g, '-$1')
        .replace(/^-/, '')
        .toLowerCase();
      
      return {
        entity: key,
        endpoints: {
          getAll: `/api/${routePath}`,
          getByDateRange: `/api/${routePath}/por-fecha?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
        }
      };
    });

    res.json({
      message: 'API de BSMICEP - Endpoints disponibles',
      endpoints
    });
  });
};

module.exports = setupRoutes;