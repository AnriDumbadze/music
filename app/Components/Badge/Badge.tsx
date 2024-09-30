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

  // Ensure image source is defined and valid
  const imgSrc = isActive ? badgeItem.activePhoto : badgeItem.photo;
  const altText = `${badgeItem.name} badge`;

  return (
    <div
      className={isActive ? styles.active : styles.badgeContent}
      onClick={() => onClick(id)}
    >
      {badgeItem.name}
      {imgSrc && (
        <img
          width={"24px"}
          height={"24px"}
          src={imgSrc}
          alt={altText}
        />
      )}
    </div>
  );
};

export default Badge;
