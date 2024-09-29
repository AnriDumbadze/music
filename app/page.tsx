"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import Aside, { getCookie } from "./Components/Aside/Aside";
import TopChart from "./Components/TopChart/TopChart";
import Header from "./Components/Header/Header";
import MusicWrapper from "./Components/MusicWrapper/MusicWrapper";
import MusicCard from "./Components/MusicCard/Musiccard";
import ArtistCard from "./Components/ArtistCard/ArtistCard";
import Player from "./Components/ComputerPlayer/ComputerPlayer";
import Login from "./Login/page";

const Home = () => {
  const [query, setQuery] = useState<string>("");
  const [themeColor, setThemeColor] = useState<string | null>(getCookie("theme")); // Store theme in state

  useEffect(() => {
    const updateTheme = () => {
      const newTheme = getCookie("theme");
      setThemeColor(newTheme);
    };

    updateTheme();

    const themeInterval = setInterval(updateTheme, 0); // Adjust interval as needed

    return () => clearInterval(themeInterval); 
  }, []);
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const artistCards = [
    <ArtistCard artistImg={"artist"} artistName={"Travis Scott"} artistType={"Artist"} />,  
  ];

  const popularHits = [
    <MusicCard albumCover={"popHit"} author={"Juice WRLD"} songTitle={"Robbery"} />,
  ];

  const popularCharts = [
    <TopChart image={"topChart"} songName={"Good Days"} artistName={"SZA"} rank={"1"} />,

  ];

  return (
    <div className={styles.mainContent}>
      <Aside />
      <div className={`${styles.static} ${themeColor === 'dark' ? styles.darkStatic : ''}`}>
        <Header />
        <MusicWrapper cards={artistCards} name={"Popular artists"} />
        <MusicWrapper cards={popularHits} name={"Popular hits of the week"} />
        <MusicWrapper cards={popularCharts} name={"Popular Charts"} />
      </div>
    </div>
  );
};

export default Home;
