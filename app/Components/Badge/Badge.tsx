import styles from "./Badge.module.scss";
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Badge = (props: Props) => {
  const { children } = props;

  return (
    <div className={styles.badge}>
      <div className={styles.badgeContent}>
        {children}
      </div>
    </div>
  );
};

export default Badge;
