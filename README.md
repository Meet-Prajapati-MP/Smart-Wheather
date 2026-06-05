# Smart Weather & City Dashboard

An elegant, Apple-inspired minimalist web application that integrates real-time meteorological data and geographical analytics into a professional dashboard. It provides current weather statistics, detailed country information, and weather-contextual AI travel suggestions for any city in the world.

Built as a production-grade full-stack JavaScript application using **React (Vite)** on the frontend and **Node.js (Express)** on the backend.

---

## Features

### 1. City Search & Input Validation
- Live city lookup using a search bar with an integrated search icon.
- Triggers searches on clicking the search button or pressing **Enter**.
- Keeps a persistent history of the last 5 unique searches (badges can be clicked to quickly query the city again).
- Form validation preventing blank queries with animated inline errors.

### 2. Meteorological Analytics (Weather Card)
- Displays current temperature, weather conditions, humidity levels, and wind speed.
- Premium features: Feels-like temperature, timezone-adjusted local sunrise/sunset times, wind angle, dynamic weather icons, and a last-updated time indicator.

### 3. Regional Demographics (Country Card)
- Fetches demographic details using the REST Countries API based on the city's country code.
- Displays the country name, official name, population (formatted with commas), currency (name and symbol), and the country flag.
- Additional details: Capital city, geographical region, active languages, and timezone offset.

### 4. AI Travel Suggestion (Bonus Feature)
- Generates a weather-contextual, one-day travel suggestion for the selected city.
- Segments the day into **Morning**, **Afternoon**, **Evening**, and **Night** blocks.
- Suggests appropriate indoor/outdoor activities depending on weather states (rainy, snowy, hot, or mild).

### 5. Production-Ready Technical Details
- **Apple Minimalist White Theme**: Styled using Vanilla CSS and CSS Modules with custom variables. Designed with glassmorphism backdrops, soft diffused shadows, high-quality typography (Inter), and smooth micro-animations.
- **Node.js Express Proxy API**: Prevents exposing the OpenWeatherMap API key on the client side, mitigating CORS issues and securing backend configurations.
- **In-Memory Cache**: The backend caches API results for 10 minutes (configurable TTL) to optimize server speed, avoid hitting rate limits, and provide a lightning-fast user experience.
- **Robust Loading States**: Shows beautiful shimmering skeleton cards while fetching data, along with button spinners and page-loading animations.
- **Responsive Layout**: Designed with a mobile-first approach, displaying beautifully on Mobile (320px+), Tablet (768px+), and Desktop (1440px+) screen widths.

---

## Folder Structure

```text
Smart Weather & City Dashboard/
├── .env                  # Project environment file (git-ignored)
├── .env.example          # Template for environment variables
├── eslint.config.js      # ESLint configuration
├── index.html            # Entry HTML page
├── package.json          # Root package.json (dev manager)
├── vite.config.js        # Vite config with dev API proxy settings
├── answers.md            # Written assignment answers
│
├── server/
│   ├── .env              # Server environment file (git-ignored)
│   ├── package.json      # Express dependencies & scripts
│   └── server.js         # Node/Express API server & in-memory cache
│
└── src/
    ├── App.css           # Global layout & responsive navbar
    ├── App.jsx           # Application wrapper
    ├── index.css         # Theme color tokens & keyframe animations
    ├── main.jsx          # React app mounting root
    │
    ├── components/
    │   ├── SearchBar/
    │   │   ├── SearchBar.jsx
    │   │   └── SearchBar.module.css
    │   ├── WeatherCard/
    │   │   ├── WeatherCard.jsx
    │   │   └── WeatherCard.module.css
    │   ├── CountryCard/
    │   │   ├── CountryCard.jsx
    │   │   └── CountryCard.module.css
    │   ├── TravelSuggestion/
    │   │   ├── TravelSuggestion.jsx
    │   │   └── TravelSuggestion.module.css
    │   ├── Loader/
    │   │   ├── Loader.jsx
    │   │   └── Loader.module.css
    │   └── ErrorMessage/
    │       ├── ErrorMessage.jsx
    │       └── ErrorMessage.module.css
    │
    ├── hooks/
    │   └── useWeather.js # Custom hook managing API orchestrations & state
    │
    ├── pages/
    │   └── Dashboard/
    │       ├── Dashboard.jsx
    │       └── Dashboard.module.css
    │
    ├── services/
    │   ├── weatherApi.js # Weather retrieval service
    │   └── countryApi.js # Country demographics retrieval service
    │
    └── utils/
        └── dateFormatter.js # Translates timestamps into timezone-adjusted times
```

---

## Setup & Local Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### 1. Clone & Set Up Configuration
Ensure the project is in your workspace directory. Create the `.env` file at the root of the project (and inside the `server/` directory) and populate it with your OpenWeatherMap API key:

**Root `.env` Configuration:**
```env
PORT=5000
WEATHER_API_KEY=your_openweathermap_api_key_here
```

*Note: If you wish to test client-side requests directly without the backend proxy running, you can add `VITE_WEATHER_API_KEY=your_key` to the root `.env` file.*

**Server `server/.env` Configuration:**
```env
PORT=5000
WEATHER_API_KEY=your_openweathermap_api_key_here
```

### 2. Install Dependencies
Install packages for both the React frontend and the Express backend.

```bash
# Install frontend packages (at project root)
npm install

# Install backend packages (inside server directory)
npm install --prefix server
```

### 3. Run the Development Server
You can start both the frontend Vite dev server and the backend Express proxy server simultaneously using a single command:

```bash
npm run dev
```

This runs:
- Frontend on: [http://localhost:5173](http://localhost:5173) (automatically proxied to backend via `/api`)
- Backend API on: [http://localhost:5000](http://localhost:5000)

---

## Deployment & Production Build

To build the project for production and bundle the frontend into optimized static files:

1. Compile the React application:
   ```bash
   npm run build
   ```
   This will output production-ready static assets to the `/dist` directory.

2. Start the Express server in production mode:
   ```bash
   NODE_ENV=production npm --prefix server start
   ```
   When `NODE_ENV=production` is set, the Express backend will automatically serve the static assets in the `/dist` directory and proxy API calls locally, providing a single self-contained server.

---

## API References
- **Weather Details**: [OpenWeatherMap Current Weather API](https://openweathermap.org/current)
- **Demographics**: [REST Countries API V3.1](https://restcountries.com)
