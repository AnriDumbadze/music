import React, { useEffect, useRef, useState } from "react";
import styles from "./PlayerController.module.scss";
import songs from "@/public/Consts/songs";
import Icon from "../Icon/Icon";

type PlayerControllerProps = {
  albumTitle: string;
  dropdown: string;
  queueTrack: string;
  queueArtist: string;
  photo: string;
  image: string;
  duration: number;
  isPlaying: boolean;
  onPlayPause: () => void;
  onSkipForward: () => void;
  onSkipBackward: () => void;
  onRepeat: () => void;
  onShuffle: () => void;
  onToggleView: () => void;
  currentSongId: number;
  setCurrentSongId: React.Dispatch<React.SetStateAction<number>>;
};

const PlayerController = (props: PlayerControllerProps) => {
  const {
    albumTitle,
    dropdown,
    queueTrack,
    queueArtist,
    photo,
    image,
    duration,
    isPlaying,
    onPlayPause,
    onSkipForward,
    onSkipBackward,
    onRepeat,
    onShuffle,
    onToggleView,
    currentSongId,
    setCurrentSongId,
  } = props;

  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrackTime, setCurrentTrackTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isQueueHeartActive, setIsQueueHeartActive] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const currentSong = songs.find(song => song.id === currentSongId);

  // Effect to play or pause the audio based on isPlaying state
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && currentSong) {
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
    const handleSongEnd = () => {
      handleSkipForward(); 
    };
    const audio = audioRef.current;

    if (audio) {
      audio.addEventListener("ended", handleSongEnd);
      return () => audio.removeEventListener("ended", handleSongEnd);
    }
  }, [currentSongId]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTrackTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleSkipForward = () => {
    setCurrentSongId(prevId => {
      let nextId;
      if (shuffle) {
        nextId = songs[Math.floor(Math.random() * songs.length)].id;
        while (nextId === prevId && songs.length > 1) {
          nextId = songs[Math.floor(Math.random() * songs.length)].id;
        }
      } else {
        const currentIndex = songs.findIndex(song => song.id === prevId);
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
    setCurrentSongId(prevId => {
      const currentIndex = songs.findIndex(song => song.id === prevId);
      const newId = songs[(currentIndex - 1 + songs.length) % songs.length].id;
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      return newId;
    });
  };

  const handleShuffle = () => {
    setShuffle(prevShuffle => !prevShuffle);
  };

  const handleRepeat = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleIconClick = () => {
    setIsActive(!isActive);
  };

  const handleIconClickQueue = () => {
    setIsQueueHeartActive(!isQueueHeartActive);
  };
  

  return (
    <div className={styles.playerController}>
      {currentSong ? (
        <>
          <audio ref={audioRef} src={currentSong.url} />
          <div className={styles.arrow} onClick={onToggleView}>
            <img src={dropdown} alt="Dropdown" />
          </div>
          <p className={styles.albumName}>{albumTitle}</p>
          <div className={styles.trackInfo}>
            <img
              src={currentSong.src}
              alt="Album Art"
              className={styles.albumArt}
            />
            <div className={styles.trackDetails}>
              <h3 className={styles.track}>{currentSong.title}</h3>
              <p>{currentSong.artist}</p>
            </div>
            <div className={styles.icons}>
              <img src="icons/plus.svg" alt="Add" />
              <Icon name={"heart"} onClick={handleIconClick} isActive={isActive} />
            </div>
          </div>
          <div className={styles.progress}>
            <div className={styles.current}>
              <span>{formatTime(currentTrackTime)}</span>
            </div>
            <input
              type="range"
              className={styles.playInput}
              min="0"
              max={duration}
              value={currentTrackTime}
              onChange={handleTimeChange}
            />
            <div className={styles.duration}>
              <span>{currentSong.songDuration}</span>
            </div>
            <div className={styles.controls}>
              <button onClick={handleRepeat} className={styles.repeat}>
                <img src="icons/repeat.svg" alt="Repeat" />
              </button>
              <button onClick={handleSkipBackward}>
                <img src="icons/previous.svg" alt="Previous" />
              </button>
              <button onClick={onPlayPause}>
                {isPlaying ? (
                  <img src="icons/pause.svg" alt="Pause" />
                ) : (
                  <img src="icons/play.svg" alt="Play" />
                )}
              </button>
              <button onClick={handleSkipForward}>
                <img src="icons/next.svg" alt="Next" />
              </button>
              <button onClick={handleShuffle} className={styles.shuffle}>
                <img
                  src={`icons/shuffle${shuffle ? "Active" : ""}.svg`}
                  alt="Shuffle"
                />
              </button>
            </div>
            <div className={styles.queue}>
              <p>In Queue</p>
              <div className={styles.next}>
                <img
                  src={currentSong.queueImg}
                  alt="Queue Image"
                  width={48}
                  height={48}
                />
                <div className={styles.names}>
                  <span className={styles.queueTrack}>
                    {currentSong.queueSong}
                  </span>
                  <span className={styles.queueArtist}>
                    {currentSong.queueName}
                  </span>
                </div>
                <div className={styles.image}>
                  <img src="icons/plus.svg" alt="Add" width={15} />
                  <Icon
                    name={"heart"}
                    onClick={handleIconClickQueue}
                    isActive={isQueueHeartActive}
                  />
                  <img src="icons/dots.svg" alt="More Options" width={24} />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>No song selected</p>
      )}
    </div>
  );
};

export default PlayerController;
