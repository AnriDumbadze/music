import React from "react";
import AsideMenu from "./Components/Aside/Aside";
import styles from "./page.module.scss";
import MusicCardWrapper from "./Components/MusicCardWrapper/MusicCardWrapper";

const Home = () => {
  return (
    <div className={styles.mainContent}>
      <AsideMenu />
      <div className={styles.mainContent__container}>
        <div className={styles.content}>

          {/* FOR TESTING */}

          <MusicCardWrapper/>
          
          {/* FOR TESTING */}

        </div>
      </div>
    </div>
  );
};

export default Home;
