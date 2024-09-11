"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import Navigation from "./Components/Navigation/Nav";
import Aside from "./Components/Aside/Aside";
import LibraryItem from "./Components/LibraryItem/LibraryItem";
import MobileFooter from "./Components/MobileFooter/MobileFooter";
import TopChart from "./Components/TopChart/TopChart";
import Search from "./Components/SearchComponent/Search";
import Input from "./Components/Input/input";
import ButtonIcon from "./Components/ButtonIcon/ButtonIcon";
import ButtonArrows from "./Components/ButtonArrows/ButtonArrows";
import { ButtonStyle } from "./Components/ButtonStyles";
import Header from "./Components/Header/Header";
import MusicWrapper from "./Components/MusicWrapper/MusicWrapper";
import MusicCard from "./Components/MusicCard/Musiccard";
import ArtistCard from "./Components/ArtistCard/ArtistCard";
import BurgerMenuMobile from "./Components/burgermenumobile/page";

const Home = () => {
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

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