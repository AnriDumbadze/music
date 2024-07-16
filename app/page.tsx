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
  const [activeBadge, setActiveBadge] = useState<number>(FooterItems[0].id);
  
  const activeItem = FooterItems.find((item) => item.id === activeBadge);

  return (
    
    <div className={styles.mainContent}>
      <div className={styles.badgeContainer}>
        <div className={styles.badgeContent}>
          {FooterItems.map((item) => (
            <div
              className={styles.badgeMap}
              key={item.id}
              onClick={() => setActiveBadge(item.id)}
            >
              <div className={styles.badgeNames}>
                <span
                  className={item.id === activeBadge ? styles.active : ''}
                >
                  {item.name}
                </span>
              </div>
              <div className={styles.footer}>
                <div className={styles.badgePhotos}>
                  <img
                    src={item.id === activeBadge ? item.activePhoto : item.photo}
                    alt={item.name}  
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Home;
