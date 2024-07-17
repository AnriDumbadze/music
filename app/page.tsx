import React from "react";
import AsideMenu from "./Components/Aside/Aside";
import styles from "./page.module.scss";
import Navigation from "./Components/Navigation/Nav";
import Icon from "./Components/Icon/Icon";
import MusicCard from "./Components/MusicCard/Musiccard";

const Home = () => {
  return (
    <div className={styles.mainContent}>
      <AsideMenu />
      <Navigation />
    </div>
  );
};

export default Home;
