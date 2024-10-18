"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import styles from "./ComputerPlayer.module.scss";
import { Slider } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import Image from 'next/image';
import Icon from "../Icon/Icon";

interface Song {
  id: number;
  title: string;
  artist: string;
  url: string;
  coverUrl: string;
}

export default function Player() {
  const [disabled, setDisabled] = useState(false);
  const [musicVolume, setMusicVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [currentSongId, setCurrentSongId] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrackTime, setCurrentTrackTime] = useState(0);
  const [songEnded, setSongEnded] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState<Song[]>([]);
  const [themeColor, setThemeColor] = useState<string | null>(null);
  
  // Fetch songs from the backend
  useEffect(() => {
    const userToken = Cookies.get("userToken");
    
    axios
      .get("https://music-back-1s59.onrender.com/music", {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        console.log(response.data); // Log the response to see the structure
        const musicData = response.data.map((musicItem: any) => ({
          id: musicItem.id,
          title: musicItem.name,
          artist: musicItem.artist.firstName || 'Unknown Artist', // Access artist name
          url: musicItem.mp3.url,
          coverUrl: musicItem.image[0]?.url || "./images/default.png", // Default cover image
        }));
        setData(musicData);
      })
      .catch(() => {
        console.error("Error fetching music data");
      });
  }, []);

  const currentSong = data.find((song) => song.id === currentSongId);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMusicVolume = localStorage.getItem("music");
      const savedTheme = localStorage.getItem("theme");

      if (savedMusicVolume) setMusicVolume(Number(savedMusicVolume));
      if (savedTheme) setThemeColor(savedTheme);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && currentSong) {
      audio.src = currentSong.url;
      isPlaying ? audio.play() : audio.pause();
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && isPlaying) {
        setCurrentTrackTime(audioRef.current.currentTime);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    const handleSongEnd = () => setSongEnded(true);
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("ended", handleSongEnd);
      return () => audio.removeEventListener("ended", handleSongEnd);
    }
  }, [currentSongId]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSkipForward = useCallback(() => {
    setCurrentSongId((prevId) => {
      let nextId;
      if (shuffle) {
        nextId = data[Math.floor(Math.random() * data.length)].id;
        while (nextId === prevId && data.length > 1) {
          nextId = data[Math.floor(Math.random() * data.length)].id;
        }
      } else {
        const currentIndex = data.findIndex((song) => song.id === prevId);
        nextId = data[(currentIndex + 1) % data.length].id;
      }
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      return nextId;
    });
  }, [shuffle, data]);

  const handleSkipBackward = () => {
    setCurrentSongId((prevId) => {
      const currentIndex = data.findIndex((song) => song.id === prevId);
      const newId = data[(currentIndex - 1 + data.length) % data.length].id;
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      return newId;
    });
  };

  useEffect(() => {
    if (songEnded) {
      handleSkipForward();
      setSongEnded(false);
    }
  }, [songEnded, handleSkipForward]);

  const debounce = useCallback((func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  }, []);

  const handleTimeChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTrackTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  }, 300);

  const handleMusicVolumeChange = (value: number) => {
    setMusicVolume(value);
    if (typeof window !== "undefined") {
      localStorage.setItem("music", value.toString());
    }
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
  };

  const handleIconClick = () => {
    setIsActive(!isActive);
    const userToken = Cookies.get("userToken");

    if (!isActive && userToken) {
      axios
        .post(
          "https://music-back-1s59.onrender.com/playlist",
          { name: "s", description: "s", musicIds: [1] },
          { headers: { Authorization: `Bearer ${userToken}` } }
        )
        .catch(() => {
          console.log("Error adding to playlist");
        });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const getIconPath = (iconName: string) => {
    return `icons/${iconName}${themeColor === "light" ? "Light" : ""}.svg`;
  };

  return (
    <div className={`${styles.computerPlayer} ${themeColor === 'light' ? styles.lightPlayer : ''}`}>
      <audio ref={audioRef} />
      <div className={styles.Player}>
        <div className={styles.container}>
          <div className={styles.textContainer}>
            <div className={styles.textGrid}>
              <Image
                className={styles.img}
                src={currentSong?.coverUrl || '/path/to/default/image.png'}
                alt={currentSong?.title || 'Unknown Title'}
                width={50}
                height={50}
              />
              <div className={styles.artistInfo}>
                <h3 className={`${styles.Text} ${themeColor === 'light' ? styles.lightText : ''}`}>
                  {currentSong?.title || 'Unknown Title'}
                </h3>
                <p className={styles.Text2}>{currentSong?.artist || 'Unknown Artist'}</p>
              </div>
              <div className={styles.icon}>
                <Icon name="heart" onClick={handleIconClick} isActive={isActive} />
              </div>
            </div>
            <div className={styles.controls}>
              <div className={styles.controlBTN} onClick={handleSkipBackward}>
                <img src={getIconPath('previous')} alt="Previous" />
              </div>
              <div className={styles.controlBTN} onClick={handlePlayPause}>
                {isPlaying ? (
                  <img src={getIconPath('pause')} alt="Pause" />
                ) : (
                  <img src={getIconPath('play')} alt="Play" />
                )}
              </div>
              <div className={styles.controlBTN} onClick={handleSkipForward}>
                <img src={getIconPath('next')} alt="Next" />
              </div>
            </div>
            <div className={styles.iconContainer}>
              <div className={styles.scroll}>
                <div className={`${styles.current} ${themeColor === 'light' ? styles.lightCurrent : ''}`}>
                  <span>{formatTime(currentTrackTime)}</span>
                </div>
                <input
                  type="range"
                  className={styles.playInput}
                  min="0"
                  value={currentTrackTime}
                  onChange={handleTimeChange}
                />
              </div>
              <Slider
                className={styles.slider}
                value={musicVolume}
                onChange={handleMusicVolumeChange}
              />
              <span>{musicVolume}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
