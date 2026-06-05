import { useState, useEffect } from 'react';
import { fetchWeather } from '../services/weatherApi';
import { fetchCountry } from '../services/countryApi';

export const useWeather = () => {
  // Initialize states to null as standard React practice to avoid undefined access issues
  const [weather, setWeather] = useState(null);
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  // Load search history from localStorage on mount
  useEffect(() => {
    const history = localStorage.getItem('weather_search_history');
    if (history) {
      try {
        setSearchHistory(JSON.parse(history));
      } catch (e) {
        console.error('Error parsing search history from localStorage:', e);
        setSearchHistory([]);
      }
    }
  }, []);

  const saveHistory = (city) => {
    if (!city) return;
    const formattedCity = city.trim();
    
    setSearchHistory((prevHistory) => {
      // Filter out existing occurrence, then put the new search at the front
      const filtered = prevHistory.filter(
        (item) => item.toLowerCase() !== formattedCity.toLowerCase()
      );
      const updated = [formattedCity, ...filtered].slice(0, 5); // Keep last 5 searches
      localStorage.setItem('weather_search_history', JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    localStorage.removeItem('weather_search_history');
    setSearchHistory([]);
  };

  const searchCity = async (city) => {
    const trimmedCity = city?.trim();
    
    // Validation: Empty city is not allowed
    if (!trimmedCity) {
      setError('Please enter a city name.');
      return;
    }

    setLoading(true);
    setError(null);
    // Important: Clear previous results during loading to show fresh state
    setWeather(null);
    setCountry(null);

    try {
      // 1. Fetch current weather for the city
      const weatherData = await fetchWeather(trimmedCity);
      setWeather(weatherData);

      // Save to history only after a successful weather fetch
      saveHistory(weatherData.name);

      // 2. Fetch country information using the 2-letter country code (sys.country)
      if (weatherData.country && weatherData.country !== 'N/A') {
        try {
          const countryData = await fetchCountry(weatherData.country);
          setCountry(countryData);
        } catch (countryErr) {
          console.error('Failed to fetch country details:', countryErr);
          // Don't fail the whole request if country data fails, but note it
          setCountry({
            name: weatherData.country,
            officialName: weatherData.country,
            population: 0,
            currency: { code: 'N/A', name: 'N/A', symbol: '' },
            flag: '',
            capital: 'N/A',
            region: 'N/A',
            languages: [],
            timezone: 'N/A',
            error: 'Could not load country details.'
          });
        }
      }
    } catch (err) {
      console.error('Search error:', err);
      // Extract clean error message
      const errorMsg = err.response?.data?.error || err.message || 'An unexpected error occurred.';
      setError(errorMsg);
      setWeather(null);
      setCountry(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    weather,
    country,
    loading,
    error,
    searchHistory,
    searchCity,
    clearHistory,
  };
};
