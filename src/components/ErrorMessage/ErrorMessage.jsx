import React from 'react';
import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className={`${styles.errorContainer} animate-slide-up`}>
      <div className={styles.errorCard}>
        <div className={styles.iconWrapper}>
          {/* Warning/Alert Icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>Error Occurred</h3>
          <p className={styles.message}>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
