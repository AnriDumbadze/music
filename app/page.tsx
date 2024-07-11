"use client";

import React from "react";
import AsideMenu from "./Components/Aside/Aside";
import styles from "./page.module.scss";
import Badge from "./Components/Badge/Badge";
import style from "../app/Components/Badge/Badge.module.scss";

const Home = () => {

  return (
    <div className={styles.mainContent}>
      <Badge>{badgeElements}</Badge>
    </div>
  );
};
export default Home;
