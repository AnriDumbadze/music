"use client";
import React, { Component, useState } from "react";
import styles from "./page.module.scss";
import PlayerController from "./Components/PlayerController/PlayerController";
import MusicListItem from "./Components/MusicList/MusicListItem";
import songs from "@/public/Consts/songs"; 
import { RecoilRoot } from "recoil";

const Home = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showPlayer, setShowPlayer] = useState(true);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const toggleView = () => {
    setShowPlayer((prevShowPlayer) => !prevShowPlayer);
  };

  const handleSongChange = (index: number) => {
    setCurrentSongIndex(index);
    setShowPlayer(true);
  };

  return (
    <RecoilRoot>
    <div className={styles.mainContent}>
      <div className="App">
        {showPlayer ? (
          <PlayerController
            albumTitle="Born To Die"
            dropdown="icons/arrowdown.svg"
            image={songs[currentSongIndex].src}
            currentTrack={songs[currentSongIndex].title}
            currentArtist={songs[currentSongIndex].artist}
            currentTime={currentTime}
            duration={212}
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onRepeat={() => {}}
            onShuffle={() => {}}
            queueTrack={songs[currentSongIndex].queueSong}
            queueArtist={songs[currentSongIndex].queueName}
            photo={songs[currentSongIndex].src}
            onToggleView={toggleView}
            currentSongIndex={currentSongIndex}
            setCurrentSongIndex={setCurrentSongIndex} 
          />
        ) : (
          <MusicListItem
            image={songs[currentSongIndex].src}
            songName={songs[currentSongIndex].title}
            artistName={songs[currentSongIndex].artist}
            rank={""}
            button={"./icons/playbtn.svg"}
            onPlay={() => handleSongChange(currentSongIndex)}
          />
        )}
      </div>
    </div>
    </RecoilRoot>
  );
};

export default Home;
