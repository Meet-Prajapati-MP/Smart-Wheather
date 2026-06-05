import React from 'react';
import styles from './CountryCard.module.css';

const CountryCard = ({ country }) => {
  if (!country) return null;

  const {
    name,
    officialName,
    population,
    currency,
    flag,
    capital,
    region,
    languages,
    timezone,
    error,
  } = country;

  // Format population nicely, e.g., 67,886,011
  const formattedPopulation = new Intl.NumberFormat().format(population);

  // Join languages array
  const displayLanguages = languages && languages.length > 0
    ? languages.slice(0, 3).join(', ') // Display up to 3 languages
    : 'N/A';

  if (error) {
    return (
      <div className={`glass-card ${styles.countryCard} ${styles.errorCard} animate-slide-up`}>
        <span className={styles.cardLabel}>Country Information</span>
        <p className={styles.errorMessage}>{error}</p>
      </div>
    );
  }

  return (
    <div className={`glass-card ${styles.countryCard} animate-slide-up`}>
      <div className={styles.header}>
        <div>
          <span className={styles.cardLabel}>Country Details</span>
          <h2 className={styles.countryName}>{name}</h2>
          <span className={styles.officialName}>{officialName}</span>
        </div>
        <div className={styles.flagWrapper}>
          <img src={flag} alt={`Flag of ${name}`} className={styles.flagImage} />
        </div>
      </div>

      <div className={styles.detailsGrid}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Population</span>
          <span className={styles.detailValue}>{formattedPopulation}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Currency</span>
          <span className={styles.detailValue}>
            {currency.name} {currency.symbol ? `(${currency.symbol})` : ''}
          </span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Capital</span>
          <span className={styles.detailValue}>{capital}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Region</span>
          <span className={styles.detailValue}>{region}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Languages</span>
          <span className={styles.detailValue} title={languages?.join(', ')}>
            {displayLanguages}
          </span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Timezone</span>
          <span className={styles.detailValue}>{timezone}</span>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
