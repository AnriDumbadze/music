"use client"

import React from "react";
import AsideMenu from "./Components/Aside/Aside";
import styles from "./page.module.scss";
import Navigation from "./Components/Navigation/Nav";
import MusicListItem from "./Components/MusicList/MusicListItem";

const Home = () => {
  return (
    <>
    <div className={styles.mainContent}>
      <AsideMenu />
      <Navigation />
      <MusicListItem 
        image={"image.svg"}
        songName={"Robbery"}
        artistName={"Juice World"}
        rank={"1"}
        onPlay={function (): void {} }
        button={"playbtn.svg"}
      />
    </div>
    
    </>
  );
};

export default Home;
