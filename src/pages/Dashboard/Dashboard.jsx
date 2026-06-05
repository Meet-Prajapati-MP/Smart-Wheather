import React, { useEffect } from 'react';
import styles from './Dashboard.module.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import CountryCard from '../../components/CountryCard/CountryCard';
import TravelSuggestion from '../../components/TravelSuggestion/TravelSuggestion';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useWeather } from '../../hooks/useWeather';

const Dashboard = () => {
  const {
    weather,
    country,
    loading,
    error,
    searchHistory,
    searchCity,
  } = useWeather();

  // Search a default city on mount to make the dashboard look alive and premium right away
  useEffect(() => {
    searchCity('Ahmedabad');
  }, []);

  const handleSearch = (city) => {
    searchCity(city);
  };

  const quickCities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'];

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.dashboardHeader}>
        <div className={styles.headerBadge}>Meteorological & Regional Explorer</div>
        <h1 className={styles.heroHeading}>Smart Weather & City Dashboard</h1>
        <p className={styles.subtext}>
          Explore real-time weather analytics, geographical insights, and AI-curated travel guides for any city globally.
        </p>
      </header>

      {/* Main Search Section */}
      <section className={styles.searchSection}>
        <SearchBar
          onSearch={handleSearch}
          history={searchHistory}
          loading={loading}
        />
      </section>

      {/* Error state */}
      {error && <ErrorMessage message={error} />}

      {/* Loading Skeleton state */}
      {loading && !weather && (
        <div className={styles.loaderWrapper}>
          <Loader type="skeleton" />
        </div>
      )}

      {/* Data presentation layout */}
      {!loading && weather && (
        <main className={`${styles.dashboardContent} animate-fade-in`}>
          <div className={styles.cardsGrid}>
            <div className={styles.gridColumn}>
              <WeatherCard weather={weather} />
            </div>
            <div className={styles.gridColumn}>
              <CountryCard country={country} />
            </div>
          </div>
          <div className={styles.fullWidthRow}>
            <TravelSuggestion city={weather.name} weather={weather} />
          </div>
        </main>
      )}

      {/* Quick Search Recommendation Badges (visible when not loading) */}
      {!loading && (
        <section className={styles.quickLinksSection}>
          <span className={styles.quickLinksTitle}>Popular Destinations:</span>
          <div className={styles.quickLinks}>
            {quickCities.map((city) => (
              <button
                key={city}
                className={styles.quickCityButton}
                onClick={() => handleSearch(city)}
                disabled={loading}
              >
                <span>{city}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
