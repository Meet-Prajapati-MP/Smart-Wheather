import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors({
  origin: '*', // Allow all origins for simplicity, but can be restricted in production
}));

app.use(express.json());

// In-memory caches with 10 minutes TTL
const weatherCache = new Map();
const countryCache = new Map();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes in milliseconds

const cleanOldCache = () => {
  const now = Date.now();
  for (const [key, value] of weatherCache.entries()) {
    if (now - value.timestamp > CACHE_TTL) {
      weatherCache.delete(key);
    }
  }
  for (const [key, value] of countryCache.entries()) {
    if (now - value.timestamp > CACHE_TTL) {
      countryCache.delete(key);
    }
  }
};

// Clean caches every 10 minutes
setInterval(cleanOldCache, CACHE_TTL);

/**
 * GET /api/weather
 * Query: city (string)
 */
app.get('/api/weather', async (req, res) => {
  const city = req.query.city?.trim();

  if (!city) {
    return res.status(400).json({ error: 'City name is required.' });
  }

  const cacheKey = city.toLowerCase();
  const cachedData = weatherCache.get(cacheKey);
  const now = Date.now();

  if (cachedData && (now - cachedData.timestamp < CACHE_TTL)) {
    console.log(`[Cache Hit] Weather data for: ${city}`);
    return res.json(cachedData.data);
  }

  const apiKey = process.env.WEATHER_API_KEY || process.env.VITE_WEATHER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ 
      error: 'Weather API key is not configured on the server. Please check environment variables.' 
    });
  }

  try {
    console.log(`[API Fetch] Fetching weather for: ${city}`);
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric'
      }
    });

    const data = response.data;
    const formattedData = {
      name: data.name,
      country: data.sys?.country || 'N/A',
      temp: data.main?.temp,
      feels_like: data.main?.feels_like,
      humidity: data.main?.humidity,
      condition: data.weather?.[0]?.main || 'Unknown',
      description: data.weather?.[0]?.description || 'No description',
      icon: data.weather?.[0]?.icon || '01d',
      wind_speed: data.wind?.speed,
      sunrise: data.sys?.sunrise,
      sunset: data.sys?.sunset,
      timezone: data.timezone,
      dt: data.dt || Math.floor(Date.now() / 1000)
    };

    // Cache the successful result
    weatherCache.set(cacheKey, {
      timestamp: now,
      data: formattedData
    });

    res.json(formattedData);
  } catch (error) {
    console.error(`[Weather API Error] ${error.message}`);
    
    if (error.response) {
      const status = error.response.status;
      if (status === 404) {
        return res.status(404).json({ error: `City '${city}' not found. Please verify spelling.` });
      } else if (status === 401) {
        return res.status(401).json({ error: 'Invalid API Key. Please contact administrator.' });
      } else if (status === 429) {
        return res.status(429).json({ error: 'Weather API rate limit exceeded. Please try again later.' });
      }
      return res.status(status).json({ error: error.response.data.message || 'Error fetching weather data.' });
    }
    
    res.status(500).json({ error: 'Network or internal server error fetching weather data.' });
  }
});

/**
 * GET /api/country
 * Query: code (string, ISO 2-letter country code)
 */
app.get('/api/country', async (req, res) => {
  const code = req.query.code?.trim().toUpperCase();

  if (!code) {
    return res.status(400).json({ error: 'Country code is required.' });
  }

  const cachedData = countryCache.get(code);
  const now = Date.now();

  if (cachedData && (now - cachedData.timestamp < CACHE_TTL)) {
    console.log(`[Cache Hit] Country data for: ${code}`);
    return res.json(cachedData.data);
  }

  try {
    console.log(`[API Fetch] Fetching country details for code: ${code}`);
    const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
    const data = response.data?.[0];

    if (!data) {
      return res.status(404).json({ error: `Country details for code '${code}' not found.` });
    }

    // Process currency
    let currencyInfo = { code: 'N/A', name: 'N/A', symbol: '' };
    if (data.currencies) {
      const curKey = Object.keys(data.currencies)[0];
      if (curKey) {
        currencyInfo = {
          code: curKey,
          name: data.currencies[curKey].name || 'N/A',
          symbol: data.currencies[curKey].symbol || ''
        };
      }
    }

    const formattedData = {
      name: data.name?.common || 'N/A',
      officialName: data.name?.official || 'N/A',
      population: data.population || 0,
      currency: currencyInfo,
      flag: data.flags?.png || data.flags?.svg || '',
      capital: data.capital?.[0] || 'N/A',
      region: data.region || 'N/A',
      subregion: data.subregion || 'N/A',
      languages: data.languages ? Object.values(data.languages) : [],
      timezone: data.timezones?.[0] || 'N/A'
    };

    // Cache the result
    countryCache.set(code, {
      timestamp: now,
      data: formattedData
    });

    res.json(formattedData);
  } catch (error) {
    console.error(`[Country API Error] ${error.message}`);
    
    if (error.response) {
      return res.status(error.response.status).json({ 
        error: `Error retrieving country data (${error.response.status}).` 
      });
    }
    
    res.status(500).json({ error: 'Network or internal server error fetching country data.' });
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
