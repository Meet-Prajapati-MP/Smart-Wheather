import React from 'react';
import styles from './WeatherCard.module.css';
import { formatLocalTime, formatLastUpdated } from '../../utils/dateFormatter';

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const {
    name,
    country,
    temp,
    feels_like,
    humidity,
    condition,
    description,
    icon,
    wind_speed,
    sunrise,
    sunset,
    timezone,
    dt,
  } = weather;

  const iconUrl = icon ? `https://openweathermap.org/img/wn/${icon}@4x.png` : '';
  const displayTemp = temp !== undefined && temp !== null ? Math.round(temp) : 'N/A';
  const displayFeelsLike = feels_like !== undefined && feels_like !== null ? Math.round(feels_like) : 'N/A';

  return (
    <div className={`glass-card ${styles.weatherCard} animate-slide-up`}>
      <div className={styles.header}>
        <div>
          <span className={styles.cardLabel}>Current Weather</span>
          <h2 className={styles.cityName}>
            {name}, <span className={styles.countryCode}>{country}</span>
          </h2>
        </div>
        <div className={styles.updatedTime}>
          Updated: {formatLastUpdated(dt)}
        </div>
      </div>

      <div className={styles.mainInfo}>
        <div className={styles.tempContainer}>
          <span className={styles.temperature}>{displayTemp}°</span>
          <div className={styles.conditionContainer}>
            <span className={styles.condition}>{condition}</span>
            <span className={styles.description}>{description}</span>
          </div>
        </div>
        <div className={styles.iconWrapper}>
          <img src={iconUrl} alt={condition} className={styles.weatherIcon} />
        </div>
      </div>

      <div className={styles.detailsGrid}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Feels Like</span>
          <span className={styles.detailValue}>{displayFeelsLike}°C</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Humidity</span>
          <span className={styles.detailValue}>{humidity}%</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Wind Speed</span>
          <span className={styles.detailValue}>{wind_speed} m/s</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Sunrise</span>
          <span className={styles.detailValue}>
            {formatLocalTime(sunrise, timezone)}
          </span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Sunset</span>
          <span className={styles.detailValue}>
            {formatLocalTime(sunset, timezone)}
          </span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Wind Angle</span>
          <span className={styles.detailValue}>
            {weather.wind_deg !== undefined ? `${weather.wind_deg}°` : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
