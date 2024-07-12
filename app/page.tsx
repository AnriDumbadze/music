"use client";

import React from "react";
import AsideMenu from "./Components/Aside/Aside";
import styles from "./page.module.scss";
import style from "../app/Components/Badge/Badge.module.scss";
import BadgeComponent from "./Components/Badge/BadgeElements/BadgeElements";

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
