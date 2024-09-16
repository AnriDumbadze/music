"use client"
import React, { useState, useEffect } from 'react';
import styles from './Aside.module.scss';
import Icon from '../Icon/Icon';
import MenuItem from '../MenuItem/MenuItem';
import LightDark from '../LightDark/LightDark';
import Cookie from 'js-cookie';

export const getCookie = (key: string) => {
  return Cookie.get(key);
};

const AsideMenu = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [themeColor, setThemeColor] = useState<string | undefined>(getCookie("theme")); // Store theme in state

  const handleMenuItemClick = (name: string) => {
    setActiveItem(name);
  };

  useEffect(() => {
    const updateTheme = () => {
      const newTheme = getCookie("theme");
      setThemeColor(newTheme);
    };

    updateTheme();

    const themeInterval = setInterval(updateTheme, 1000); // Check every second

    return () => clearInterval(themeInterval);
  }, []);


  return (
    <div className={`${styles.aside} ${themeColor === 'dark' ? styles.darkAside : ''}`}>
      <div className={styles.siderContent}>
        <div className={styles.logo}>
          <Icon name={"FAZER"} isActive={false} onClick={() => {}} />
        </div>
        <div className={styles.menuItems}>
          <MenuItem name={"home"} isActive={activeItem === "home"} onClick={() => handleMenuItemClick("home")} />
          <MenuItem  name={"search"} isActive={activeItem === "settings"} onClick={() => handleMenuItemClick("settings")} />
        </div>
      </div>
      
      <div className={styles.lightDarkContainer}>
        <LightDark />
      </div>
    </div>
  );
};

export default AsideMenu;
