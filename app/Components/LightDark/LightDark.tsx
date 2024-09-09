import React, { useState } from 'react';
import styles from './LightDark.module.scss';
import Icon from '../Icon/Icon';

type Props = {};

const LightDark = (props: Props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = (mode: 'light' | 'dark') => {
    setIsDarkMode(mode === 'dark');
  };

  return (
    <div
      className={`${styles.container} ${
        isDarkMode ? styles.darkModeActive : styles.lightModeActive
      }`}
    >
      <div
        className={`${styles.light} ${isDarkMode ? styles.noContainer : styles.active}`}
        onClick={() => handleToggle('light')}
      >
        <Icon name={'light'} isActive={!isDarkMode} onClick={function (): void {
                  throw new Error('Function not implemented.');
              } } />
        <span>Light</span>
      </div>
      <div
        className={`${styles.dark} ${isDarkMode ? styles.active : ''}`}
        onClick={() => handleToggle('dark')}
      >
        <Icon name={'dark'} isActive={isDarkMode} onClick={function (): void {
                  throw new Error('Function not implemented.');
              } } />
        <span>Dark</span>
      </div>
    </div>
  );
};

export default LightDark;
