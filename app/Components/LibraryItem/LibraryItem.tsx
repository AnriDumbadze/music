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
  onClick: (value: number) => void;
};

const LibraryItem = (props: Props) => {
  const [activeBadge, setActiveBadge] = useState<number | null>(null);

  const handleBadgeClick = (id: number) => {
    setActiveBadge(id);
  };

  return (
    <div className={styles.content}>
      <div className={styles.leftPart}>
        <div className={styles.item__image}>
          <Icon src="./Images/image.png" width="80px" height="80px" />
        </div>
        <div className={styles.itemInfo}>
          <span className={styles.itemInfo__title}>{props.title}</span>
          <span className={styles.songQuantity}>{props.songQuantity}</span>
        </div>
      </div>
      <div
        className={styles.downloadContainer}
      >
        <BadgeIcon
          src={activeBadge === props.id ? "./Icons/DownloadActive.svg" : "./Icons/Download.svg"}
          name="Download"
          isActive={activeBadge === props.id}
          onClick={() => handleBadgeClick(props.id)}
        />
        <Icon src="./Icons/More.svg" />
      </div>
     
    </div>
  );
};

export default LibraryItem;
