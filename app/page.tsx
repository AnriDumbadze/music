"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import Aside from "./Components/Aside/Aside";
import LibraryItem from "./Components/LibraryItem/LibraryItem";
import MobileFooter from "./Components/MobileFooter/MobileFooter";
import TopChart from "./Components/TopChart/TopChart";
import Search from "./Components/SearchComponent/Search";

const Home = () => {

  const [query, setQuery] = useState<string>('');

  const handleInputChange = (newQuery: string) => {
    setQuery(newQuery);
    console.log('Search query:', newQuery);
  }
  
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
      <div>
      <Search 
      onChange={handleInputChange}/>
      </div>
    </div>
  );
};

export default Home;
