"use client";

import React, { useState } from "react";
import AsideMenu from "./Components/Aside/Aside";
import styles from "./page.module.scss";
import Navigation from "./Components/Navigation/Nav";
import MusicListItem from "./Components/MusicList/MusicListItem";
import PlayerController from "./Components/PlayerController/PlayerController";

const Home = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeBadge, setActiveBadge] = useState<number | null>(null);

    setIsPlaying(!isPlaying);

    setCurrentTime(currentTime + 10);

    setCurrentTime(currentTime - 10);

  return (
    <div className={styles.mainContent}>
      <AsideMenu />
      <Navigation />
      <MusicListItem
        image={"images/image.svg"}
        songName={"Robbery"}
        artistName={"Juice World"}
        rank={"1"}
        onPlay={function (): void { }}
        button={"icons/playbtn.svg"}
      />
      <div className="App">
        <PlayerController
          albumTitle="Born To Die"
          dropdown="icons/arrowdown.svg"
          image="images/musicImage.png"
          currentTrack="Video Game"
          currentArtist="Lana Del Rey"
          currentTime={currentTime}
          duration={272}
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onSkipForward={() => setCurrentTime(currentTime + 10)}
          onSkipBackward={() => setCurrentTime(currentTime - 10)}
          onRepeat={() => { }}
          onShuffle={() => { }}
          queueTrack={"Video Game"}
          queueArtist={"Lana Del Rey"}
          photo={"images/musicImage.png"}
        />
      </div>
    </div>
  );
};

export default Home;
