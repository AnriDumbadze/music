// MenuItem.js
import React from 'react';
import styles from './MenuItem.module.scss';
import Icon from '../Icon/Icon';

type Props = {
  name: string;
  isActive: boolean;
  onClick: () => void;
};

const MenuItem = ({ name, isActive, onClick }: Props) => {
  return (
    <div
      className={`${styles.menuItem} ${isActive ? styles.active : ''}`}
      onClick={onClick}
    >
      <div className={styles.itemContent}>
        <Icon name={name} isActive={isActive} onClick={onClick} />
        <span className={`${styles.menuText} ${isActive ? styles.activeText : ''}`}>
          {name}
        </span>
      </div>
    </div>
  );
};

export default MenuItem;
