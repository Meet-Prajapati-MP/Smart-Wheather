# Technical & Problem-Solving Assignment Answers

This file contains the answers to the assignment questions and the debugging challenge from the Appsrow Full Stack Developer Task.

---

## Question 1: User Expectation Calculation
**Scenario:**
- City population = `1,000,000`
- `60%` of the population own smartphones
- `20%` of smartphone owners install the app

**Calculation:**
1. **Smartphone Users:**
   $$\text{Smartphone Users} = 1,000,000 \times 60\% = 600,000$$
2. **App Installations (Expected Users):**
   $$\text{Expected Users} = 600,000 \times 20\% = 120,000$$

**Answer:**
You would expect **120,000** users.

---

## Question 2: Investigating Production API Failure
**Scenario:** The weather API works fine locally (localhost) but fails in production.

**Investigation and Debugging Steps:**
1. **Check Environment Variables:**
   - Verify that the production environment (e.g., Render, Vercel, Heroku dashboard) has the API keys configured.
   - Ensure the server is rebuilding/restarting after keys are set, and check that `.env` files are not git-ignored (which they should be, meaning they must be manually inputted in production settings).
2. **Check for CORS Issues (Cross-Origin Resource Sharing):**
   - Check browser console for CORS error messages indicating the backend is blocking requests from the production frontend domain.
   - Verify that CORS in the Node/Express backend allows the production frontend origin.
3. **Inspect HTTPS/SSL Mixed Content Restrictions:**
   - If the production frontend is loaded over HTTPS, check that all backend calls are also made over HTTPS. Modern browsers block active mixed content (making HTTP requests from HTTPS sites).
4. **API Provider Access Restrictions:**
   - Free API keys (like OpenWeatherMap) sometimes take up to 2 hours to activate after creation.
   - Check if the API provider blocks requests coming from known cloud server IP ranges (AWS, Heroku, etc.) or requires specific headers.
5. **Analyze Server Logs:**
   - Run logs inspection (e.g., `heroku logs --tail` or `pm2 logs`) to see if the Express server is throwing error codes (like `401 Unauthorized` for bad keys, or `429 Too Many Requests` for rate limits).
6. **Inspect the Browser's Network Tab:**
   - Look at the failed request's status code (e.g., 500 Internal Server Error, 502 Bad Gateway, or 404 Not Found) to locate where the chain broke.

---

## Question 3: Low Conversion Rate Analysis
**Scenario:** Users spend an average of 10 minutes on a page, but conversions are very low.

**Possible Reasons:**
1. **Poor CTA (Call to Action) Placement or Clarity:**
   - The CTA button or form is not prominent, is hidden below the fold, or the copywriting does not clearly indicate what action the user should take. Users might be engaged in the content but do not know how to proceed.
2. **High Friction / Complicated Conversion Funnel:**
   - The path to convert requires too much effort (e.g., too many form fields, complex steps, or compulsory registration). The 10 minutes might be spent struggling with a frustrating interface rather than converting.
3. **Slow Loading Speeds or Security/Trust Deficits:**
   - A long time on page might reflect slow loading times of checkout scripts or forms. Alternatively, users may spend time reading details but ultimately leave because they don't see trust signals (like SSL badges, customer reviews, or clear refund policies).

---

## Question 4: 24-Hour Launch Prioritization
**Scenario:** Launching the application in 24 hours.

**Prioritized Features (MVP Core):**
- **City Search with Input Validation:** Essential to prevent bad requests.
- **Weather API Integration:** The primary user value proposition.
- **Country API Integration:** Core layout requirement.
- **Responsive Layout:** Must work on mobile devices immediately.
- **Proper Error Handling:** Ensures the app doesn't crash on bad inputs or network failure.

**Postponed Features:**
- **AI Travel Suggestions:** The template suggestions can be simplified or launched later.
- **Search History Badges:** Useful but not blocking user core utility.
- **Micro-animations and Advanced Transitions:** Aesthetic polishing can be done post-launch.
- **Cache Cleansing Utilities:** Simple local memory caching works fine initially.

**Reasoning:**
Focusing on the Minimum Viable Product (MVP) guarantees a stable, functional core application that handles errors safely. Postponing secondary enhancements minimizes implementation risk and ensures the product can be thoroughly tested and launched within the deadline.

---

## Debugging Challenge
**Given Code:**
```javascript
const [weather, setWeather] = useState();

useEffect(() => {
  fetchWeather();
}, []);

return <div>{weather.temp}</div>;
```

### 1. What issue can occur?
- **TypeError (Cannot read properties of undefined):** `useState()` is called with no argument, which means `weather` is initially `undefined`.
- During the first render, React executes `return <div>{weather.temp}</div>`. Because `weather` is `undefined`, accessing `.temp` will throw a runtime error: `Cannot read properties of undefined (reading 'temp')`. This crashes the entire application.
- Since `fetchWeather` is asynchronous, the component will attempt to render before `setWeather` is ever called and updates the state.

### 2. How to fix it?
To fix this, we should initialize the state to `null` (or a blank object) and use **conditional rendering** or **optional chaining** to handle the loading state:

**Fix Approach (Recommended):**
```jsx
import React, { useState, useEffect } from 'react';

function WeatherComponent() {
  // 1. Initialize state explicitly to null
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetchWeather().then(data => setWeather(data));
  }, []);

  // 2. Add a loading check before accessing properties
  if (!weather) {
    return <div>Loading weather data...</div>;
  }

  return <div>{weather.temp}°C</div>;
}
```

**Alternative Fix (Optional Chaining):**
```jsx
// Keeps the component rendering, showing a fallback text while loading
return <div>{weather?.temp ?? 'Loading...'}</div>;
```
