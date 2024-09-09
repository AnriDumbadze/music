import React, { useState } from 'react';
import styles from './Aside.module.scss';
import Icon from '../Icon/Icon';
import MenuItem from '../MenuItem/MenuItem';
import LightDark from '../LightDark/LightDark';

const AsideMenu = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleMenuItemClick = (name: string) => {
    setActiveItem(name);
  };

  return (
    <div className={styles.aside}>
      <div className={styles.siderContent}>
        <div className={styles.logo}>
          <Icon name={"FAZER"} isActive={false} onClick={() => {}} />
        </div>
        <div className={styles.menuItems}>
          <MenuItem name={"home"} isActive={activeItem === "home"} onClick={() => handleMenuItemClick("home")} />
          <MenuItem name={"search"} isActive={activeItem === "settings"} onClick={() => handleMenuItemClick("settings")} />
        </div>
      </div>
      
      <div className={styles.lightDarkContainer}>
        <LightDark />
      </div>
    </div>
  );
};

export default AsideMenu;
