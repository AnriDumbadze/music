import React from "react";
import AsideMenu from "./Components/Aside/Aside";
import styles from "./page.module.scss";
import Navigation from "./Components/AdminNavigation/Nav";
import Header from "./Components/Header/Header";
import MusicCard from "./Components/MusicCard/MusicCard";
import Badge from "./Components/Badge/Badge";
import AdminPanel from "./Components/AddAlbum/AddAlbum";

const Home = () => {
  return (
    <div className={styles.mainContent}>
      <AsideMenu />
      <div className={styles.mainContent__container}>
        <Header />
        <div className={styles.content}>

          {/* FOR TESTING */}

<AdminPanel/>

          
          {/* FOR TESTING */}

        </div>
      </div>
    </div>
  );
};

export default Home;
