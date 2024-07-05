import React from "react";
import AsideMenu from "./Components/Aside/Aside";
import styles from "./page.module.scss";

const Home = () => {
  return (
    <div className={styles.mainContent}>
      <AsideMenu />
      <div className={styles.mainContent__container}>
        <Header />
        <div className={styles.content}>

          {/* FOR TESTING */}


          
          {/* FOR TESTING */}

        </div>
      </div>
    </div>
  );
};

export default Home;
