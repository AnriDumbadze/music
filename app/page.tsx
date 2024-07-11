"use client";

import React from "react";
import AsideMenu from "./Components/Aside/Aside";
import styles from "./page.module.scss";
import style from "../app/Components/Badge/Badge.module.scss";
import BadgeComponent from "./Components/Badge/BadgeElements/BadgeElements";

const Home = () => {
  const [activeBadge, setActiveBadge] = useState(null);

  return (
    <div className={styles.mainContent}>
        <BadgeComponent/>
    </div>
  );
};

export default Home;
