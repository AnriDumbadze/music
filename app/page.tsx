"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import Aside from "./Components/Aside/Aside";
import TopChart from "./Components/TopChart/TopChart";
import Header from "./Components/Header/Header";
import MusicWrapper from "./Components/MusicWrapper/MusicWrapper";
import MusicCard from "./Components/MusicCard/Musiccard";
import ArtistCard from "./Components/ArtistCard/ArtistCard";
import Player from "./Components/ComputerPlayer/ComputerPlayer";

const Home = () => {
  const [query, setQuery] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const artistCards = [
    <ArtistCard artistImg={"popArtist"} artistName={"Travis Scott"} artistType={"Artist"} />,
    <ArtistCard artistImg={"popArtist"} artistName={"Billie Eilish"} artistType={"Artist"} />,
    <ArtistCard artistImg={"popArtist"} artistName={"Drake"} artistType={"Artist"} />,
    <ArtistCard artistImg={"popArtist"} artistName={"Drake"} artistType={"Artist"} />,
    <ArtistCard artistImg={"popArtist"} artistName={"Drake"} artistType={"Artist"} />,
    <ArtistCard artistImg={"popArtist"} artistName={"Drake"} artistType={"Artist"} />,
  ];

  const popularHits = [
    <MusicCard albumCover={"popHit"} author={"Juice WRLD"} songTitle={"Robbery"} />,
    <MusicCard albumCover={"popHit"} author={"The Weeknd"} songTitle={"Blinding Lights"} />,
    <MusicCard albumCover={"popHit"} author={"Doja Cat"} songTitle={"Say So"} />,
    <MusicCard albumCover={"popHit"} author={"Doja Cat"} songTitle={"Say So"} />,
    <MusicCard albumCover={"popHit"} author={"Doja Cat"} songTitle={"Say So"} />,
    <MusicCard albumCover={"popHit"} author={"Doja Cat"} songTitle={"Say So"} />,
  ];

  const popularCharts = [
    <TopChart image={"topChart"} songName={"Good Days"} artistName={"SZA"} rank={"1"} />,
    <TopChart image={"topChart"} songName={"Montero"} artistName={"Lil Nas X"} rank={"2"} />,
    <TopChart image={"topChart"} songName={"Montero"} artistName={"Lil Nas X"} rank={"2"} />,
    <TopChart image={"topChart"} songName={"Montero"} artistName={"Lil Nas X"} rank={"2"} />,
    <TopChart image={"topChart"} songName={"Montero"} artistName={"Lil Nas X"} rank={"2"} />,
    <TopChart image={"topChart"} songName={"Montero"} artistName={"Lil Nas X"} rank={"2"} />,
  ];

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
