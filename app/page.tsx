"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import Footer from "./Components/MobileFooter/MobileFooter";

interface BadgeItem {
  name: string;
  photo: string;
  activePhoto: string;
}

const badgeItems: BadgeItem[] = [
  { name: "Home", photo: "./home.svg", activePhoto: "./activeHome.svg" },
  { name: "Library", photo: "./home.svg", activePhoto: "./activeHome.svg" },
  { name: "Search", photo: "./home.svg", activePhoto: "./activeHome.svg" }
];

const Home = () => {
  const [activeBadge, setActiveBadge] = useState<string>(badgeItems[0].name);
  const activeIndex = badgeItems.findIndex(item => item.name === activeBadge);

  const badgeElements = badgeItems.map((item, index) => (
    <span
      key={index}
      className={index === activeIndex ? styles.active : ""}
      onClick={() => setActiveBadge(item.name)}
    >
      {item.name}
    </span>
  ));

  return (
    
    <div className={styles.mainContent}>
      <div className={styles.badgeContainer}>
        <div className={styles.badgeNames}>
          {badgeElements}
        </div>
        <div className={styles.badgePhoto}>
          <Footer badgeItems={badgeItems} activeIndex={activeIndex} />

        </div>
      </div>
      
    </div>
  );
};

export default Home;
