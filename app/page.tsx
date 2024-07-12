"use client";

import React from "react";
import styles from "./page.module.scss";
import ArtistCard from "./Components/ArtistCard/ArtistCard";
import MusicWrapper from "./Components/MusicWrapper/MusicWrapper";

const Home = () => {

  return (
    <div className={styles.mainContent}>
<MusicWrapper/>
    </div>
  );
};

export default Home;
