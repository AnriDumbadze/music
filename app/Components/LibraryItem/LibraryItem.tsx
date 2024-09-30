import React, { useState } from "react";
import styles from "./LibraryItem.module.scss";
import Icon from "../Icon/Icon";
import BadgeIcon from "../BadgeIcon/BadgeIcon";

// Define a type for BadgeItem if used
interface BadgeItem {
  // Add properties based on your requirements
}

type Props = {
  badgeItem?: BadgeItem; // Use a specific type here
  title: string;
  songQuantity: string;
  id: number;
  imageUrl?: string; // Optional image URL prop
};

const LibraryItem = (props: Props) => {
  const [isActive, setIsActive] = useState(false);

  const handleIconClick = () => {
    setIsActive((prev) => !prev);
  };

  const handleMoreClick = () => {
    // Implement functionality for the "More" icon
    console.log("More options clicked for:", props.title);
  };

  return (
    <div className={styles.content}>
      <div className={styles.leftPart}>
        <div className={styles.item__image}>
          <img src={props.imageUrl || "./Images/image.png"} width="80px" height="80px" alt={props.title} />
        </div>
        <div className={styles.itemInfo}>
          <span className={styles.itemInfo__title}>{props.title}</span>
          <span className={styles.songQuantity}>{props.songQuantity}</span>
        </div>
      </div>
      <div className={styles.downloadContainer}>
        <div className={styles.downloadCursor}>
          <Icon name={"Download"} onClick={handleIconClick} isActive={isActive} />
        </div>

        <Icon name={"More"} isActive={false} onClick={handleMoreClick} />
      </div>
    </div>
  );
};

export default LibraryItem;
