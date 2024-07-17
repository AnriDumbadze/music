"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import FooterItems from "../public/Consts/FooterImage";

const Home = () => {
  const [activeBadge, setActiveBadge] = useState<number>(FooterItems[0].id);
  
  const activeItem = FooterItems.find((item) => item.id === activeBadge);

  return (
    
    <div className={styles.mainContent}>
      <div className={styles.badgeContainer}>

          {FooterItems.map((item) => (
            <div
              className={styles.badgeMap}
              key={item.id}
              onClick={() => setActiveBadge(item.id)}
            >
              <div className={styles.badgeNames}>
                <span className={item.id === activeBadge ? styles.active : ""}>
                  {item.name}
                </span>
              </div>
              <div className={styles.footer}>
                <div className={styles.badgePhotos}>
                  <img
                    src={
                      item.id === activeBadge ? item.activePhoto : item.photo
                    }
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
