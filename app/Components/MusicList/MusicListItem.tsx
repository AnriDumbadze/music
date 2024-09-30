import React from 'react';
import styles from "./MusicListItem.module.scss";

type Props = {
  image: string;
  songName: string;
  artistName: string;
  rank: string;
  button: string;
  onPlay: () => void;
};

const MusicListItem: React.FC<Props> = ({
  image,
  songName,
  artistName,
  rank,
  button,
  onPlay
}) => {
  return (
    <div className={styles.musiclistitem}>
      <img src={image} alt={`${songName} cover`} className={styles.musicimage} />
      <div className={styles.musicinfo}>
        <h3 className={styles.songname}>{songName}</h3>
        <p className={styles.artistname}>{artistName}</p>
        <p className={styles.rank}>Top {rank}</p>
      </div>
      <button className={styles.playbutton} onClick={onPlay} aria-label={`Play ${songName}`}>
        <img src={button} alt="Play" className={styles.playicon} />
      </button>
    </div>
  );
};

export default MusicListItem;
