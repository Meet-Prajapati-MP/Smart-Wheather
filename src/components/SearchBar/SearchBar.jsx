import React, { useState, useEffect, useRef } from 'react';
import styles from './SearchBar.module.css';
import { POPULAR_CITIES } from '../../utils/cities';

const SearchBar = ({ onSearch, history, loading }) => {
  const [city, setCity] = useState('');
  const [validationError, setValidationError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchContainerRef = useRef(null);

  // Close suggestions dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = city.trim();
    if (!trimmed) {
      setValidationError('Please enter a city name to search.');
      return;
    }
    setValidationError('');
    setShowSuggestions(false);
    onSearch(trimmed);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCity(value);
    
    if (value.trim()) {
      setValidationError('');
      
      // Filter popular cities
      const query = value.toLowerCase();
      const filtered = POPULAR_CITIES.filter(c => 
        c.toLowerCase().includes(query)
      ).sort((a, b) => {
        // Boost cities that start with the query
        const aStarts = a.toLowerCase().startsWith(query);
        const bStarts = b.toLowerCase().startsWith(query);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return a.localeCompare(b);
      }).slice(0, 6); // limit to 6 suggestions

      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setActiveIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (selectedCity) => {
    setCity(selectedCity);
    setValidationError('');
    setShowSuggestions(false);
    onSearch(selectedCity);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prevIndex) => 
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prevIndex) => 
        prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
      );
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        e.preventDefault();
        handleSuggestionClick(suggestions[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleHistoryClick = (searchCity) => {
    setCity(searchCity);
    setValidationError('');
    setShowSuggestions(false);
    onSearch(searchCity);
  };

  const highlightMatch = (text, query) => {
    if (!query) return <span>{text}</span>;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <strong key={index} className={styles.highlight}>{part}</strong>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div className={styles.searchContainer} ref={searchContainerRef}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <div className={styles.inputWrapper}>
          {/* Search Icon inside Input */}
          <svg
            className={styles.searchIcon}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className={`${styles.searchInput} ${validationError ? styles.inputError : ''}`}
            placeholder="Search for any city (e.g. London, Tokyo, Paris)..."
            value={city}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (city.trim() && suggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
            disabled={loading}
          />

          {/* Autocomplete Suggestions Dropdown */}
          {showSuggestions && (
            <ul className={styles.suggestionsList}>
              {suggestions.map((suggestion, index) => (
                <li
                  key={suggestion}
                  className={`${styles.suggestionItem} ${
                    index === activeIndex ? styles.suggestionActive : ''
                  }`}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={styles.suggestionIcon}
                  >
                    <path d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {highlightMatch(suggestion, city)}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit" className={styles.searchButton} disabled={loading}>
          {loading ? (
            <div className={styles.spinner}></div>
          ) : (
            <span>Search</span>
          )}
        </button>
      </form>

      {validationError && (
        <div className={styles.validationMessage}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{validationError}</span>
        </div>
      )}

      {history && history.length > 0 && (
        <div className={styles.historyContainer}>
          <span className={styles.historyLabel}>Recent Searches:</span>
          <div className={styles.historyList}>
            {history.map((item, index) => (
              <button
                key={index}
                className={styles.historyBadge}
                onClick={() => handleHistoryClick(item)}
                disabled={loading}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
