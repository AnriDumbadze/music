"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import Navigation from "./Components/Navigation/Nav";
import Aside from "./Components/Aside/Aside";
import LibraryItem from "./Components/LibraryItem/LibraryItem";
import MobileFooter from "./Components/MobileFooter/MobileFooter";
import TopChart from "./Components/TopChart/TopChart";
import Search from "./Components/SearchComponent/Search";
import ButtonIcon from "./Components/ButtonIcon/ButtonIcon";
import ButtonArrows from "./Components/ButtonArrows/ButtonArrows";
import { ButtonStyle } from "./Components/ButtonStyles";


const Home = () => {
  const [query, setQuery] = useState<string>('');

  return (
    <div className={styles.mainContent}>
      <Aside />
      <Navigation />
      <LibraryItem 
        title={"Lursman del rey"} 
        songQuantity={"1221"} 
        onClick={function (value: number): void {
          throw new Error("Function not implemented.");
        }} 
        id={0}
      />
      <TopChart 
        image={"images/topImage.png"}
        artistName="SZA"
        songName="SOS!"
        rank="12"
        />
        <Search onChange={setQuery} />
        <div>
        <ButtonIcon 
        title={""}
        icon={"icons/music.svg"}
        onClick={function ():void {} } 
        style={ButtonStyle.Black} 
        />
        </div>
        <ButtonArrows 
        direction={"left"} 
        onClick={function (): void {} } 
        icon="icons/leftarr.svg"
        />
    </div>
  );
};

export default Home;