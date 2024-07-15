"use client";

import React from "react";
import styles from "./page.module.scss";
import ArtistCard from "./Components/ArtistCard/ArtistCard";

const Home = () => {
  const [activeBadge, setActiveBadge] = useState<number | null>(null);

  return (
    <div className={styles.mainContent}>

    </div>
  );
};

export default Home;
