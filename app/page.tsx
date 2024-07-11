"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import Navigation from "./Components/Navigation/Nav";
import AsideMenu from "./Components/Aside/Aside";

const Home = () => {
  return (
    <div className={styles.mainContent}>
      <AsideMenu />
      <Navigation />
    </div>
  );
};

export default Home;
