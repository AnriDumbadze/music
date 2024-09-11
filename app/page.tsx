"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import PlayerController from "./Components/PlayerController/PlayerController";
import MusicListItem from "./Components/MusicList/MusicListItem";
import songs from "@/public/Consts/songs"; 
import { RecoilRoot } from "recoil";

const convertDurationToSeconds = (duration: string): number => {
  const [minutes, seconds] = duration.split(':').map(Number);
  return (minutes * 60) + seconds;
};

const Home = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showPlayer, setShowPlayer] = useState(true);
  const [currentSongId, setCurrentSongId] = useState<number | null>(
    songs.length > 0 ? songs[0].id : null
  );

  const toggleView = () => {
    setShowPlayer(prevShowPlayer => !prevShowPlayer);
  };

  const handleSongChange = (id: number) => {
    if (songs.some(song => song.id === id)) {
      setCurrentSongId(id);
      setShowPlayer(true);
    }
  };

  const currentSong = songs.find(song => song.id === currentSongId);

  return (
    <RecoilRoot>
      <div className={styles.mainContent}>
        <div className="App">
          {showPlayer ? (
            currentSong ? (
              <PlayerController
                albumTitle="Born To Die"
                dropdown="icons/arrowdown.svg"
                image={currentSong.src}
                currentTrack={currentSong.title}
                currentArtist={currentSong.artist}
                currentTime={currentTime}
                duration={convertDurationToSeconds(currentSong.songDuration)} 
                isPlaying={isPlaying}
                onPlayPause={() => setIsPlaying(prev => !prev)}
                onRepeat={() => {}}
                onShuffle={() => {}}
                queueTrack={currentSong.queueSong}
                queueArtist={currentSong.queueName}
                photo={currentSong.src}
                onToggleView={toggleView}
                currentSongId={currentSongId}
                setCurrentSongId={setCurrentSongId}
              />
            ) : (
              <p>Song not found</p>
            )
          ) : (
            currentSong && (
              <MusicListItem
                image={currentSong.src}
                songName={currentSong.title}
                artistName={currentSong.artist}
                rank="" 
                button="./icons/playbtn.svg"
                onPlay={() => handleSongChange(currentSongId as number)}
              />
            )
          )}
        </div>
      </div>
    </RecoilRoot>
  );
};

export default Home;
