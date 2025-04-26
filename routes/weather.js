
const express = require('express');
const router = express.Router();
const WeatherService = require('../models/weatherService');


router.get('/current/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const weatherData = await WeatherService.getCurrentWeather(city);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/forecast/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const forecastData = await WeatherService.getForecast(city);
    res.json(forecastData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/current/multiple', async (req, res) => {
  try {
    const { cities } = req.body;
    if (!Array.isArray(cities)) {
      return res.status(400).json({ error: 'Se esperaba un array de ciudades' });
    }
    
    const promises = cities.map(city => WeatherService.getCurrentWeather(city));
    const results = await Promise.all(promises);
    
    const weatherData = {};
    cities.forEach((city, index) => {
      weatherData[city] = results[index];
    });
    
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/forecast/multiple', async (req, res) => {
  try {
    const { cities } = req.body;
    if (!Array.isArray(cities)) {
      return res.status(400).json({ error: 'Se esperaba un array de ciudades' });
    }
    
    const promises = cities.map(city => WeatherService.getForecast(city));
    const results = await Promise.all(promises);
    
    const forecastData = {};
    cities.forEach((city, index) => {
      forecastData[city] = results[index];
    });
    
    res.json(forecastData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/current/coords/:lat/:lon', async (req, res) => {
  try {
    const { lat, lon } = req.params;
    const weatherData = await WeatherService.getWeatherByCoords(lat, lon);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;