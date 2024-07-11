"use client"

import React from "react";
import styles from "./page.module.scss";
import Navigation from "./Components/Navigation/Nav";
import MusicListItem from "./Components/MusicList/MusicListItem";

const Home = () => {
  const badgeItems = ["All", "Album", "Playlists", "Artists", "Downloaded"];
  const activeBadge = "album";  

  const activeIndex = badgeItems.indexOf(activeBadge.charAt(0).toUpperCase() + activeBadge.slice(1));
  const badgeElements = badgeItems.map((item, index) => (
    <span key={index} className={index === activeIndex ? styles.active : ''}>
      {item}
    </span>
  ));
  return (
    <div className={styles.mainContent}>
      <Badge badgeItems={badgeItems} activeIndex={activeIndex} />
    </div>
  );
};

export default Home;
