"use client"
import React, { useState, useEffect } from 'react';
import styles from './Aside.module.scss';
import Icon from '../Icon/Icon';
import MenuItem from '../MenuItem/MenuItem';
import LightDark from '../LightDark/LightDark';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import { cookies } from 'next/headers';

export const getCookie = (key: string) => {
  return Cookie.get(key);
};

const AsideMenu = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [themeColor, setThemeColor] = useState<string | undefined>(getCookie("theme")); // Store theme in state
  const [isAdmin, setIsadmin] = useState(false)
  const router = useRouter()

  const handleMenuItemClick = (name: string) => {
    setActiveItem(name);
    router.replace('http://localhost:3000')
  };

  const handleMenuItemClick2 = (name: string) => {
    setActiveItem(name);
    router.replace("http://localhost:3000/searchPage")
  };
  const handleMenuItemClick3 = (name: string) => {
    setActiveItem(name);
    router.replace("http://localhost:3000/Library")
  };

  const handleMenuItemClick4 = (name: string) => {
    setActiveItem(name);
    router.replace("http://localhost:3000/adminArtist")
  };
  useEffect(() => {
    const updateTheme = () => {
      const newTheme = getCookie("theme");
      setThemeColor(newTheme);
    };

    updateTheme();

    const themeInterval = setInterval(updateTheme, 0); 

    return () => clearInterval(themeInterval);
  }, []);

  const isAdminCookie = Cookie.get("isAdmin")

  useEffect(() => {
    const isAdminCookie = Cookie.get("isAdmin");
    if (isAdminCookie === 'admin') {
      setIsadmin(true); // Move this inside useEffect
    }
  }, []);


  return (
    <div className={`${styles.aside} ${themeColor === 'dark' ? styles.darkAside : ''}`}>
      <div className={styles.siderContent}>
        <div className={styles.logo}>
          <Icon name={"FAZER"} isActive={false} onClick={() => {}} />
        </div>
        <div className={styles.menuItems}>
          <MenuItem name={"home"} isActive={activeItem === "home"} onClick={() => handleMenuItemClick("home")} />
          <MenuItem  name={"search"} isActive={activeItem === "settings"} onClick={() => handleMenuItemClick2("settings")} />
          <MenuItem name={"library"} isActive={activeItem === "library"} onClick={() => handleMenuItemClick3("library")} />
        {isAdmin &&
            <MenuItem name={"artists"} isActive={activeItem === "artists"} onClick={() => handleMenuItemClick4("artists")} />
        }
        </div>
      </div>
      
      <div className={styles.lightDarkContainer}>
        <LightDark />
      </div>
    </div>
  );
};

export default AsideMenu;
