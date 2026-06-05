import React from 'react';
import styles from './TravelSuggestion.module.css';

const TravelSuggestion = ({ city, weather }) => {
  if (!weather) return null;

  const getItinerary = (city, temp, condition) => {
    const cond = condition.toLowerCase();
    
    // 1. Rainy/Stormy/Drizzle
    if (cond.includes('rain') || cond.includes('drizzle') || cond.includes('thunderstorm') || cond.includes('storm')) {
      return {
        theme: 'Cozy & Indoor Sightseeing',
        description: `It's currently rainy in ${city}. Here is a perfect indoor itinerary to keep you dry and entertained!`,
        morning: `Start your day at ${city}'s premier national museum or historical art gallery. It's the perfect time to explore cultural exhibits without worrying about the weather.`,
        afternoon: `Seek comfort in a historic indoor market or food hall. Grab a warm lunch, taste local pastries, and relax with a hot cup of specialty coffee or tea in a cozy local café.`,
        evening: `Head to an iconic indoor shopping arcade, bookstore, or aquarium. Alternatively, catch a matinee performance or explore an indoor botanical glasshouse.`,
        night: `Indulge in a hearty dinner at a highly recommended cellar bistro, followed by live music at a local jazz club or a cozy speakeasy to experience ${city}'s evening culture.`
      };
    }
    
    // 2. Snowy
    if (cond.includes('snow') || temp < 0) {
      return {
        theme: 'Winter Wonderland Experience',
        description: `It's freezing cold or snowing in ${city}! Wrap up warm and enjoy these cozy winter activities.`,
        morning: `Take a brisk walk to see ${city}'s main landmarks covered in snow (or beautiful winter light). Warm up immediately with a hot chocolate from an artisan chocolatier.`,
        afternoon: `Visit a prestigious history museum or science center to escape the cold. For lunch, treat yourself to a comforting local soup or a hot-pot meal.`,
        evening: `If available, visit a festive outdoor ice rink under the lights, or browse a winter boutique market. Otherwise, explore a cozy library or bookstore cafe.`,
        night: `Have dinner at a traditional tavern or pub with a fireplace. Try the local comfort food and enjoy a warm mulled wine or craft brew.`
      };
    }

    // 3. Hot (above 28°C)
    if (temp > 28) {
      return {
        theme: 'Sunny Outdoor & Cool Escapes',
        description: `It's quite warm in ${city} today. Stay hydrated and blend outdoor sights with cool, indoor escapes!`,
        morning: `Embark on an early morning walk in ${city}'s most famous public park, garden, or botanical reserve before the sun gets too strong.`,
        afternoon: `Escape the midday heat by visiting a cool, air-conditioned art museum or historic cathedral. Keep yourself refreshed with a gourmet gelato or iced local drink.`,
        evening: `As the temperature drops, head to a waterfront promenade, bridge, or historical harbor. Enjoy the refreshing breeze and watch the sunset.`,
        night: `Dine at an open-air rooftop restaurant or a lively outdoor terrace. Try local seafood or light summer dishes and enjoy ${city}'s nightlife.`
      };
    }

    // 4. Default: Pleasant / Mild / Cloudy / Clear
    return {
      theme: 'Perfect Sightseeing & Exploration',
      description: `The weather in ${city} is perfect for active exploration! Here is a curated itinerary to make the most of your day.`,
      morning: `Begin with a guided walking tour or rent a bicycle to explore ${city}'s historic old town and major public plazas. The mild weather makes it ideal to be outdoors.`,
      afternoon: `Visit an open-air market, try local street food, and sit by a lively central plaza to people-watch. Visit a famous monument or historic tower afterward.`,
      evening: `Catch the sunset from a popular scenic overlook, high-altitude viewpoint, or famous bridge. Take in the panoramic views of the city.`,
      night: `Enjoy dinner at a local culinary hotspot, trying authentic regional dishes. Cap off your day with a stroll through a vibrant night market or a illuminated city square.`
    };
  };

  const itinerary = getItinerary(city || weather.name, weather.temp, weather.condition);

  return (
    <div className={`glass-card ${styles.suggestionCard} animate-slide-up`}>
      <div className={styles.header}>
        <div className={styles.iconBadge}>
          {/* Sparkles AI Icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
        </div>
        <div>
          <span className={styles.cardLabel}>AI Travel Suggestion (Bonus)</span>
          <h2 className={styles.themeTitle}>{itinerary.theme}</h2>
        </div>
      </div>
      
      <p className={styles.descriptionText}>{itinerary.description}</p>

      <div className={styles.timeline}>
        <div className={styles.timelineItem}>
          <div className={styles.timeBadge}>Morning</div>
          <div className={styles.timelineContent}>
            <p>{itinerary.morning}</p>
          </div>
        </div>

        <div className={styles.timelineItem}>
          <div className={styles.timeBadge}>Afternoon</div>
          <div className={styles.timelineContent}>
            <p>{itinerary.afternoon}</p>
          </div>
        </div>

        <div className={styles.timelineItem}>
          <div className={styles.timeBadge}>Evening</div>
          <div className={styles.timelineContent}>
            <p>{itinerary.evening}</p>
          </div>
        </div>

        <div className={styles.timelineItem}>
          <div className={styles.timeBadge}>Night</div>
          <div className={styles.timelineContent}>
            <p>{itinerary.night}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelSuggestion;
