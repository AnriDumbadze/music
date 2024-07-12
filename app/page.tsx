"use client";

import React, { useState } from "react";
import styles from "./page.module.scss";

const Home = () => {
  const [activeBadge, setActiveBadge] = useState<number | null>(null);

  return (
    <div className={styles.mainContent}>
    </div>
  );
};

export default Home;
