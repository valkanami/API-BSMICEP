const axios = require('axios');

class WeatherService {
  static async getCurrentWeather(city) {
    try {
      
      const currentResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: `${city},mx`,
          appid: process.env.OPENWEATHER_API_KEY,
          lang: 'es',
          units: 'metric'
        }
      });
      
      
      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
        params: {
          q: `${city},mx`,
          appid: process.env.OPENWEATHER_API_KEY,
          lang: 'es',
          units: 'metric'
        }
      });
      
      const currentWeather = {
        city: currentResponse.data.name,
        country: currentResponse.data.sys.country,
        temperature: parseFloat(currentResponse.data.main.temp.toFixed(1)),
        feelsLike: parseFloat(currentResponse.data.main.feels_like.toFixed(1)),
        humidity: Math.round(currentResponse.data.main.humidity),
        pressure: Math.round(currentResponse.data.main.pressure),
        windSpeed: parseFloat(currentResponse.data.wind.speed.toFixed(1)),
        description: currentResponse.data.weather[0].description,
        icon: currentResponse.data.weather[0].icon,
        timestamp: new Date(currentResponse.data.dt * 1000)
      };
      
      
      const today = new Date().toISOString().split('T')[0];
      const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
      
      
      const periods = {
        madrugada: { start: 0, end: 5 },
        mañana: { start: 6, end: 11 },
        tarde: { start: 12, end: 17 },
        noche: { start: 18, end: 23 }
      };
      
      
      const dailyPeriods = {
        madrugada: null,
        mañana: null,
        tarde: null,
        noche: null
      };
      
      
      forecastResponse.data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const forecastDay = date.toISOString().split('T')[0];
        const hour = date.getHours();
        
        
        if (forecastDay !== today && forecastDay !== tomorrow) return;
        
        
        let periodName = null;
        for (const [name, period] of Object.entries(periods)) {
          if (hour >= period.start && hour <= period.end) {
            periodName = name;
            break;
          }
        }
        
        if (!periodName) return;
        
        
        if (!dailyPeriods[periodName]) {
          dailyPeriods[periodName] = {
            temperature: parseFloat(item.main.temp.toFixed(1)),
            feelsLike: parseFloat(item.main.feels_like.toFixed(1)),
            humidity: Math.round(item.main.humidity),
            windSpeed: parseFloat(item.wind.speed.toFixed(1)),
            description: item.weather[0].description,
            icon: item.weather[0].icon,
            timestamp: new Date(item.dt * 1000)
          };
        }
      });
      
      
      return {
        ...currentWeather,
        periodos: dailyPeriods
      };
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new Error(`Ciudad no encontrada: ${city}`);
      }
      throw new Error(`Error al obtener datos del clima: ${error.message}`);
    }
  }

  
  static async getForecast(city) {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
        params: {
          q: `${city},mx`,
          appid: process.env.OPENWEATHER_API_KEY,
          lang: 'es',
          units: 'metric'
        }
      });
      
      const forecast = {
        city: response.data.city.name,
        country: response.data.city.country,
        daily: {}
      };
      
      
      response.data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toISOString().split('T')[0];
        
        
        if (!forecast.daily[day]) {
          forecast.daily[day] = {
            date: day,
            temperatures: [],
            descriptions: [],
            icons: [],
            humidity: [],
            windSpeed: []
          };
        }
        
        
        forecast.daily[day].temperatures.push(item.main.temp);
        forecast.daily[day].descriptions.push(item.weather[0].description);
        forecast.daily[day].icons.push(item.weather[0].icon);
        forecast.daily[day].humidity.push(item.main.humidity);
        forecast.daily[day].windSpeed.push(item.wind.speed);
      });
      
      
      Object.keys(forecast.daily).forEach(day => {
        const dayData = forecast.daily[day];
        
        
        dayData.avgTemperature = parseFloat((dayData.temperatures.reduce((sum, temp) => sum + temp, 0) / 
          dayData.temperatures.length).toFixed(1));
        
        
        dayData.avgHumidity = Math.round(dayData.humidity.reduce((sum, hum) => sum + hum, 0) / 
          dayData.humidity.length);
        
        
        dayData.avgWindSpeed = parseFloat((dayData.windSpeed.reduce((sum, speed) => sum + speed, 0) / 
          dayData.windSpeed.length).toFixed(1));
        
        
        const descriptionCounts = {};
        dayData.descriptions.forEach(desc => {
          descriptionCounts[desc] = (descriptionCounts[desc] || 0) + 1;
        });
        
        let maxCount = 0;
        let mostCommonDesc = '';
        
        Object.entries(descriptionCounts).forEach(([desc, count]) => {
          if (count > maxCount) {
            maxCount = count;
            mostCommonDesc = desc;
          }
        });
        
        dayData.mainDescription = mostCommonDesc;
        
        
        const iconCounts = {};
        dayData.icons.forEach(icon => {
          iconCounts[icon] = (iconCounts[icon] || 0) + 1;
        });
        
        maxCount = 0;
        let mostCommonIcon = '';
        
        Object.entries(iconCounts).forEach(([icon, count]) => {
          if (count > maxCount) {
            maxCount = count;
            mostCommonIcon = icon;
          }
        });
        
        dayData.mainIcon = mostCommonIcon;
        
        
        delete dayData.temperatures;
        delete dayData.descriptions;
        delete dayData.icons;
        delete dayData.humidity;
        delete dayData.windSpeed;
      });
      
      return forecast;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new Error(`Ciudad no encontrada: ${city}`);
      }
      throw new Error(`Error al obtener pronóstico: ${error.message}`);
    }
  }

  static async getWeatherByCoords(lat, lon) {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          lat,
          lon,
          appid: process.env.OPENWEATHER_API_KEY,
          lang: 'es',
          units: 'metric'
        }
      });
      
      return {
        city: response.data.name,
        country: response.data.sys.country,
        temperature: parseFloat(response.data.main.temp.toFixed(1)),
        feelsLike: parseFloat(response.data.main.feels_like.toFixed(1)),
        humidity: Math.round(response.data.main.humidity),
        pressure: Math.round(response.data.main.pressure),
        windSpeed: parseFloat(response.data.wind.speed.toFixed(1)),
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        timestamp: new Date(response.data.dt * 1000)
      };
    } catch (error) {
      throw new Error(`Error al obtener datos por coordenadas: ${error.message}`);
    }
  }
}

module.exports = WeatherService;