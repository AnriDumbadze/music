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
  mp3Link: string;
};

const PlayerController = (props: PlayerControllerProps) => {
  const {
    albumTitle,
    mp3Link,
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

  

  return (
<div className={styles.playerController}>
  {true ? (
    <>
   <audio ref={audioRef} src={mp3Link} />

      <div className={styles.arrow} onClick={onToggleView}>
        <img src={dropdown} alt="Dropdown" />
      </div>
      <p className={styles.albumName}>{albumTitle || "Unknown Album"}</p>
      <div className={styles.trackInfo}>
        <img
          src={ "default-album-art.jpg"}
          alt="Album Art"
          className={styles.albumArt}
        />
        <div className={styles.trackDetails}>
          <h3 className={styles.track}>{ "Unknown Track"}</h3>
          <p>{"Unknown Artist"}</p>
        </div>
        <div className={styles.icons}>
          <img src="icons/plus.svg" alt="Add" />
          <Icon name={"heart"}  isActive={isActive} />
        </div>
      </div>
      <div className={styles.progress}>
        <div className={styles.current}>
          {/* Display current time */}
          {currentTrackTime || "0:00"}
        </div>
        <input
          type="range"
          className={styles.playInput}
          min="0"
          max={duration || 100}
          value={currentTrackTime || 0}
       
        />
        <div className={styles.duration}>
          <span>{duration || "0:00"}</span>
        </div>
        <div className={styles.controls}>
          <button onClick={onRepeat} className={styles.repeat}>
            <img src="icons/repeat.svg" alt="Repeat" />
          </button>
          <button >
            <img src="icons/previous.svg" alt="Previous" />
          </button>
          <button onClick={onPlayPause}>
  {isPlaying ? (
    <img src="icons/pause.svg" alt="Pause" />
  ) : (
    <img src="icons/play.svg" alt="Play" />
  )}
</button>

        
          <button >
            <img src="icons/next.svg" alt="Next" />
          </button>
          <button onClick={onShuffle} className={styles.shuffle}>
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
              src={"default-queue-image.jpg"}
              alt="Queue Image"
              width={48}
              height={48}
            />
            <div className={styles.names}>
              <span className={styles.queueTrack}>
                {"Next Track"}
              </span>
              <span className={styles.queueArtist}>
                { "Unknown Artist"}
              </span>
            </div>
            <div className={styles.image}>
              <img src="icons/plus.svg" alt="Add" width={15} />
              <Icon
                name={"heart"}

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
