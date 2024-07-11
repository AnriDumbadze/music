"use client";

import React from "react";
import AsideMenu from "./Components/Aside/Aside";
import styles from "./page.module.scss";
import Navigation from "./Components/Navigation/Nav";
import MusicListItem from "./Components/MusicList/MusicListItem";
import Badge from "./Components/Badge/Badge";

const Home = () => {
  const badgeItems = ["All", "Album", "Playlists", "Artists", "Downloaded"];
  const [activeBadge, setActiveBadge] = useState("All");

  const activeIndex = badgeItems.indexOf(activeBadge);

  const badgeElements = badgeItems.map((item, index) => (
    <span
      key={index}
      className={index === activeIndex ? style.active : ""}
      onClick={() => setActiveBadge(item)}
    >
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
