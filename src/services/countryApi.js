import axios from 'axios';

/**
 * Fetches country information for a given ISO country code (e.g. "US", "IN").
 * Uses the Node.js backend proxy by default, and falls back to a direct REST Countries API call if necessary.
 * 
 * @param {string} code - The ISO 2-letter country code
 * @returns {Promise<object>} The formatted country data
 */
export const fetchCountry = async (code) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  // If we are calling the API directly because of VITE_WEATHER_API_KEY (frontend-only mode)
  if (apiKey) {
    console.log('[Country Service] Fetching directly from REST Countries API...');
    const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
    const data = response.data?.[0];

    if (!data) {
      throw new Error(`Country data not found for code: ${code}`);
    }

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

    return {
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
  }

  // Default: call the Node.js backend proxy
  console.log('[Country Service] Fetching via Backend Express Proxy...');
  const response = await axios.get('/api/country', {
    params: { code },
  });
  
  const data = response.data;
  if (typeof data === 'string' && (data.includes('<!DOCTYPE html>') || data.includes('<html'))) {
    throw new Error('Received HTML response instead of JSON. The backend server proxy is not running.');
  }
  
  return data;
};
