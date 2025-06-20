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

  
  router.get('/por-apartado/:apartado', async (req, res) => {
    try {
      const { apartado } = req.params;
      
      if (!apartado) {
        return res.status(400).json({ 
          message: 'Se requiere el parámetro apartado' 
        });
      }
      
      const data = await model.getByApartado(apartado);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  
  router.get('/por-apartado/:apartado/fecha', async (req, res) => {
    try {
      const { apartado } = req.params;
      const { startDate, endDate } = req.query;
      
      if (!apartado) {
        return res.status(400).json({ 
          message: 'Se requiere el parámetro apartado' 
        });
      }
      
      if (!startDate || !endDate) {
        return res.status(400).json({ 
          message: 'Se requieren los parámetros startDate y endDate' 
        });
      }
      
      const data = await model.getByApartadoAndDateRange(
        apartado, 
        new Date(startDate), 
        new Date(endDate)
      );
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  
  router.get('/apartados', async (req, res) => {
    try {
      const apartados = await model.getApartados();
      res.json(apartados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  
  router.get('/por-apartado/:apartado/dato/:dato', async (req, res) => {
    try {
      const { apartado, dato } = req.params;
      
      if (!apartado || !dato) {
        return res.status(400).json({ 
          message: 'Se requieren los parámetros apartado y dato' 
        });
      }
      
      const data = await model.getByApartadoAndDato(apartado, dato);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  
  router.get('/datos', async (req, res) => {
    try {
      const datos = await model.getDatos();
      res.json(datos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  
  router.get('/por-zafra/:zafra', async (req, res) => {
    try {
      const { zafra } = req.params;
      
      if (!zafra) {
        return res.status(400).json({ 
          message: 'Se requiere el parámetro zafra' 
        });
      }
      
      const data = await model.getByZafra(zafra);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  
  router.get('/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          message: 'El ID debe ser un número válido' 
        });
      }
      
      const data = await model.getById(id);
      
      if (!data) {
        return res.status(404).json({ 
          message: `No se encontró ningún registro con el ID ${id}` 
        });
      }
      
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
          getById: `/api/${routePath}/{id}`,
          getByDateRange: `/api/${routePath}/por-fecha?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`,
          getByApartado: `/api/${routePath}/por-apartado/{apartado}`,
          getByApartadoAndDate: `/api/${routePath}/por-apartado/{apartado}/fecha?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`,
          getByApartadoAndDato: `/api/${routePath}/por-apartado/{apartado}/dato/{dato}`,
          getByZafra: `/api/${routePath}/por-zafra/{zafra}`,
          getApartados: `/api/${routePath}/apartados`,
          getDatos: `/api/${routePath}/datos`
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