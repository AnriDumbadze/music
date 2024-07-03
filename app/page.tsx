import React from "react";
import AsideMenu from "./Components/Aside/Aside";
import styles from "./page.module.scss";
import Navigation from "./Components/AdminNavigation/Nav";
import Header from "./Components/Header/Header";

const Home = () => {
  return (
    <div className={styles.mainContent}>
      <AsideMenu />
      <Header/>
    </div>
  );
};

export default Home;
