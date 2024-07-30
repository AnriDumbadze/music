"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import Aside from "./Components/Aside/Aside";
import LibraryItem from "./Components/LibraryItem/LibraryItem";
import MobileFooter from "./Components/MobileFooter/MobileFooter";
import TopChart from "./Components/TopChart/TopChart";

const Home = () => {
  return (
    <div className={styles.mainContent}>
      <Aside />
      <LibraryItem title={"Lursman del rey"} songQuantity={"1221"} onClick={function (value: number): void {
        throw new Error("Function not implemented.");
      } } id={0}/>
      <TopChart 
      image={"images/topImage.png"}
      artistName="SZA"
      songName="SOS!"
      rank="12"
      />
    </div>
  );
};

export default Home;
