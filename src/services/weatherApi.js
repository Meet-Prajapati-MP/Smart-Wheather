import axios from 'axios';

/**
 * Fetches current weather data for a given city.
 * Uses the Node.js backend proxy by default, and falls back to a direct OpenWeatherMap API call if
 * VITE_WEATHER_API_KEY is defined in the frontend environment.
 * 
 * @param {string} city - The name of the city to search for
 * @returns {Promise<object>} The formatted weather data
 */
export const fetchWeather = async (city) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  // If VITE_WEATHER_API_KEY is provided in frontend .env, we can make a direct call
  // This is a great fallback for frontend-only deployments
  if (apiKey) {
    console.log('[Weather Service] Fetching directly from OpenWeatherMap API...');
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric',
      },
    });
    
    const data = response.data;
    return {
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
  }

  // Default: call the Node.js backend proxy
  console.log('[Weather Service] Fetching via Backend Express Proxy...');
  const response = await axios.get('/api/weather', {
    params: { city },
  });
  return response.data;
};
