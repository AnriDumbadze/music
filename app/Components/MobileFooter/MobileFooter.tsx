import React from "react";
import styles from "./MobileFooter.module.scss";

interface BadgeItem {
  name: string;
  photo: string;
  activePhoto: string;
}

interface FooterProps {
  badgeItems: BadgeItem[];
  activeIndex: number;
}

const Footer = ({ badgeItems, activeIndex }: FooterProps) => {
  return (
    <div className={styles.footer}>
      <div className={styles.badgePhotos}>
        {badgeItems.map((item, index) => (
          <img
            key={index}
            src={index === activeIndex ? item.activePhoto : item.photo}
            alt={item.name}
            className={index === activeIndex ? styles.active : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default Footer;
