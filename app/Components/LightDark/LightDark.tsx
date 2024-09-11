import React, { useState, useEffect } from 'react';
import styles from './LightDark.module.scss';
import Icon from '../Icon/Icon';

const LightDark = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check for the stored theme in localStorage
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    // Apply theme to the document root
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    // Save the theme to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleToggle = (mode: 'light' | 'dark') => {
    setIsDarkMode(mode === 'dark');
  };

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.darkModeActive : styles.lightModeActive}`}>
      <div
        className={`${styles.light} ${isDarkMode ? styles.noContainer : styles.active}`}
        onClick={() => handleToggle('light')}
      >
        <Icon name={'light'} isActive={!isDarkMode} />
        <span>Light</span>
      </div>
      <div
        className={`${styles.dark} ${isDarkMode ? styles.active : ''}`}
        onClick={() => handleToggle('dark')}
      >
        <Icon name={'dark'} isActive={isDarkMode} />
        <span>Dark</span>
      </div>
    </div>
  );
};

export default LightDark;
