import React, { useState } from "react";
import styles from "./LibraryItem.module.scss";
import Icon from "../Icon/Icon";
import FooterItems from "@/public/Consts/FooterImage";
import BadgeIcon from "../BadgeIcon/BadgeIcon";

type Props = {
  badgeItem?: any;
  title: string;
  songQuantity: string;
  id: number;
};

const LibraryItem = (props: Props) => {
  const [isActive, setIsActive] = useState(false);



  const handleIconClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={styles.content}>
      <div className={styles.leftPart}>
        <div className={styles.item__image}>
          <img src="./Images/image.png" width="80px" height="80px" />
        </div>
        <div className={styles.itemInfo}>
          <span className={styles.itemInfo__title}>{props.title}</span>
          <span className={styles.songQuantity}>{props.songQuantity}</span>
        </div>
      </div>
      <div className={styles.downloadContainer}>
        <div className={styles.downloadCursor}>
          
        <Icon name={"Download"}  onClick={handleIconClick} isActive={isActive} />
        </div>

        <Icon name={"More"} isActive={false} onClick={function (): void {
          throw new Error("Function not implemented.");
        } }  />
      </div> 
    </div>
  );
};

export default LibraryItem;
