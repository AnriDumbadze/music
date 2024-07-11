import styles from "./Badge.module.scss";
import React from "react";

type Props = {
  children: React.ReactNode;
  id: number;
  onClick: (value: number) => void;
  isActive: boolean;
};

const Badge = (props: Props) => {
  const { children } = props;

  return (
    <div
      className={props.isActive ? styles.active : styles.badgeContent}
      onClick={() => props.onClick(props.id)}
    >
      <div className={styles.badgeContent}>{children}</div>
    </div>
  );
};

export default Badge;
