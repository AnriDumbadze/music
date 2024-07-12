"use client";

import React, { useState } from "react";
import styles from "./page.module.scss";
import badgeItems from "@/public/Consts/BadgeData";
import Badge from "./Components/Badge/Badge";

const Home = () => {
  const [activeBadge, setActiveBadge] = useState<number | null>(null);

  return (
    <div className={styles.mainContent}>
      <div className={styles.item}>
        {badgeItems.map((item, index) => (
          <Badge
            isActive={activeBadge === index}
            id={index}
            onClick={setActiveBadge}
          >
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default Home;
