import styles from "./Badge.module.scss";
import React from "react";
import { BadgeItem } from "@/public/Interfaces/inter";

type Props = {
  badgeItem: BadgeItem;
  id: number;
  onClick: (value: number) => void;
  isActive: boolean;
};

const Badge = (props: Props) => {
  const { badgeItem, id, onClick, isActive } = props;

  return (
    <div
      className={isActive ? styles.active : styles.badgeContent}
      onClick={() => onClick(id)} // Change color/path on click
    >
      {badgeItem.name} {/* Display only the name */}
    </div>
  );
};

export default Badge;
