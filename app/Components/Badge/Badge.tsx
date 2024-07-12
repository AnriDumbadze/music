import styles from "./Badge.module.scss";
import React from "react";

type Props = {
  children: React.ReactNode;
  id: number;
  onClick: (value: number) => void;
  isActive: boolean;
};

const Badge = (props: Props) => {
  const { children, id, onClick, isActive } = props;

  return (
    <div
      className={isActive ? styles.active : styles.badgeContent}
      onClick={() => onClick(id)}
    >
      {children}
    </div>
  );
};

export default Badge;
