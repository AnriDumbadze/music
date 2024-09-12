"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./ComputerPlayer.module.scss";
import { Slider } from "antd";
import songs from "@/public/Consts/songs"; // Assuming you have a songs array
import Icon from "../Icon/Icon";
import { getCookie } from "../Aside/Aside";

export default function Player() {
  const [disabled, setDisabled] = useState(false);
  const [musicVolume, setMusicVolume] = useState(50); // Music volume state
  const [voiceVolume, setVoiceVolume] = useState(50); // Voice volume state
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [currentSongId, setCurrentSongId] = useState(1); // Current song ID
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrackTime, setCurrentTrackTime] = useState(0);
  const [songEnded, setSongEnded] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const currentSong = songs.find((song) => song.id === currentSongId);

  useEffect(() => {
    const savedMusicVolume = localStorage.getItem("music");
    const savedVoiceVolume = localStorage.getItem("voice");
    if (savedMusicVolume) setMusicVolume(Number(savedMusicVolume));
    if (savedVoiceVolume) setVoiceVolume(Number(savedVoiceVolume));
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && currentSong) {
      audio.src = currentSong.url;
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [currentSongId, isPlaying]);

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

  useEffect(() => {
    if (songEnded) {
      handleSkipForward();
      setSongEnded(false);
    }
  }, [songEnded]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSkipForward = () => {
    setCurrentSongId((prevId) => {
      let nextId;
      if (shuffle) {
        nextId = songs[Math.floor(Math.random() * songs.length)].id;
        while (nextId === prevId && songs.length > 1) {
          nextId = songs[Math.floor(Math.random() * songs.length)].id;
        }
      } else {
        const currentIndex = songs.findIndex((song) => song.id === prevId);
        nextId = songs[(currentIndex + 1) % songs.length].id;
      }
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      return nextId;
    });
  };

  const handleSkipBackward = () => {
    setCurrentSongId((prevId) => {
      const currentIndex = songs.findIndex((song) => song.id === prevId);
      const newId = songs[(currentIndex - 1 + songs.length) % songs.length].id;
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      return newId;
    });
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTrackTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleShuffle = () => {
    setShuffle(!shuffle);
  };

  const handleRepeat = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleMusicVolumeChange = (value: number) => {
    setMusicVolume(value);
    localStorage.setItem("music", value.toString());
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
  };

  const handleVoiceVolumeChange = (value: number) => {
    setVoiceVolume(value);
    localStorage.setItem("voice", value.toString());
  };

  const handleIconClick = () => {
    setIsActive(!isActive);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const [themeColor, setThemeColor] = useState<string | null>(getCookie("theme"));
  useEffect(() => {
    const updateTheme = () => {
      const newTheme = getCookie("theme");
      setThemeColor(newTheme);
    };

    updateTheme();

    const themeInterval = setInterval(updateTheme, 0);

    return () => clearInterval(themeInterval);
  }, []);

  const getIconPath = (iconName: string) => {
    return `icons/${iconName}${themeColor === 'light' ? 'Light' : ''}.svg`;
  };

  return (
    <div className={`${styles.computerPlayer} ${themeColor === 'light' ? styles.lightPlayer : ''}`}>
      <audio ref={audioRef} />
      <div className={styles.Player}>
        <div className={styles.container}>
          <div className={styles.textContainer}>
            <div className={styles.textGrid}>
              <img className={styles.img} />
              <div className={styles.artistInfo}>
                <h3 className={`${styles.Text} ${themeColor === 'light' ? styles.lightText : ''}`}>Sour!</h3>
                <p className={styles.Text2}>Olivia Rodrigo</p>
              </div>
              <div className={styles.icon}>
              <Icon
                name={"heart"}
                onClick={handleIconClick}
                isActive={isActive}
              />
              </div>
            </div>
            <div className={styles.controls}>
              <div className={styles.controlBTN}>
                <img
                  src={getIconPath('previous')}
                  alt="Previous"
                  onClick={handleSkipBackward}
                />
              </div>
              <div className={styles.controlBTN} onClick={handlePlayPause}>
                {isPlaying ? (
                  <img src={getIconPath('pause')} alt="Pause" />
                ) : (
                  <img src={getIconPath('play')} alt="Play" />
                )}
              </div>
              <div className={styles.controlBTN} onClick={handleSkipForward}>
                <img
                  src={getIconPath('next')}
                  alt="Next"
                  onClick={handleSkipForward}
                />
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
              <div className={styles.voiceControl}>
                <div className={styles.volume}>
                  <div className={styles.voice}></div>
                  <Slider
                    onChange={handleMusicVolumeChange}
                    className={styles.inputRadio2}
                    value={musicVolume}
                    disabled={disabled}
                  />
                </div>
                <div className={styles.switchBox}>
                  <div className={styles.refresh}></div>
                  <div className={styles.shuffle}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
