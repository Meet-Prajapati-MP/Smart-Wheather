import React from 'react';
import styles from './Loader.module.css';

const Loader = ({ type = 'page' }) => {
  // 1. Full Page Loader
  if (type === 'page') {
    return (
      <div className={styles.pageLoaderContainer}>
        <div className={styles.loaderContent}>
          <div className={styles.doubleSpinner}>
            <div className={styles.spinnerOuter}></div>
            <div className={styles.spinnerInner}></div>
          </div>
          <span className={styles.loadingText}>Fetching meteorological & regional data...</span>
        </div>
      </div>
    );
  }

  // 2. Small button spinner
  if (type === 'spinner') {
    return <div className={styles.buttonSpinner}></div>;
  }

  // 3. Skeleton Loader for cards
  if (type === 'skeleton') {
    return (
      <div className={styles.skeletonGrid}>
        {/* Weather Card Skeleton */}
        <div className={`${styles.skeletonCard} ${styles.weatherSkeleton}`}>
          <div className={styles.headerSkeleton}>
            <div className={`${styles.shimmer} ${styles.lineSmall}`}></div>
            <div className={`${styles.shimmer} ${styles.lineLarge}`}></div>
          </div>
          <div className={styles.mainSkeleton}>
            <div className={styles.tempGroup}>
              <div className={`${styles.shimmer} ${styles.circleLarge}`}></div>
              <div className={styles.textGroup}>
                <div className={`${styles.shimmer} ${styles.lineMedium}`}></div>
                <div className={`${styles.shimmer} ${styles.lineSmall}`}></div>
              </div>
            </div>
            <div className={`${styles.shimmer} ${styles.circleMedium}`}></div>
          </div>
          <div className={styles.gridSkeleton}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={styles.gridItemSkeleton}>
                <div className={`${styles.shimmer} ${styles.lineTiny}`}></div>
                <div className={`${styles.shimmer} ${styles.lineSmall}`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Country Card Skeleton */}
        <div className={`${styles.skeletonCard} ${styles.countrySkeleton}`}>
          <div className={styles.headerSkeleton}>
            <div>
              <div className={`${styles.shimmer} ${styles.lineSmall}`}></div>
              <div className={`${styles.shimmer} ${styles.lineLarge}`}></div>
              <div className={`${styles.shimmer} ${styles.lineMedium}`} style={{ marginTop: '6px' }}></div>
            </div>
            <div className={`${styles.shimmer} ${styles.rectFlag}`}></div>
          </div>
          <div className={styles.gridSkeleton} style={{ marginTop: 'auto' }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={styles.gridItemSkeleton}>
                <div className={`${styles.shimmer} ${styles.lineTiny}`}></div>
                <div className={`${styles.shimmer} ${styles.lineSmall}`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Suggestion Skeleton (spans full width on desktop) */}
        <div className={`${styles.skeletonCard} ${styles.travelSkeleton}`}>
          <div className={styles.headerSkeleton}>
            <div className={`${styles.shimmer} ${styles.circleSmall}`}></div>
            <div className={styles.textGroup}>
              <div className={`${styles.shimmer} ${styles.lineSmall}`}></div>
              <div className={`${styles.shimmer} ${styles.lineLarge}`}></div>
            </div>
          </div>
          <div className={`${styles.shimmer} ${styles.lineParagraph}`} style={{ margin: '1rem 0 2rem 0' }}></div>
          <div className={styles.timelineSkeleton}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className={styles.timelineItemSkeleton}>
                <div className={`${styles.shimmer} ${styles.lineBadge}`}></div>
                <div className={styles.timelineContentSkeleton}>
                  <div className={`${styles.shimmer} ${styles.lineFull}`}></div>
                  <div className={`${styles.shimmer} ${styles.lineFull}`} style={{ marginTop: '8px', width: '80%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Loader;
