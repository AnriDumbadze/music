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

const Home = () => {
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className={styles.mainContent}>
      <Aside />
      <div className={styles.static}>
        <Header />
        <MusicWrapper cards={artistCards} name={"Popular artists"} />
        <MusicWrapper cards={popularHits} name={"Popular hits of the week"} />
        <MusicWrapper cards={popularCharts} name={"Popular Charts"} />
      </div>
    </div>
  );
};

export default Home;