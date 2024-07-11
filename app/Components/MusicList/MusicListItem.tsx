import React from 'react';
import styles from "./MusicListItem.module.scss";

type Props = {
  image: string;
  songName: string;
  artistName: string;
  rank: string;
  button: string;
  onPlay: () => void;
}

const MusicListItem = (props: Props) => {
  return (
    <div className={styles.musiclistitem}>
      <img src={props.image} alt={`${props.songName} cover`} className={styles.musicimage} />
      <div className={styles.musicinfo}>
        <h3 className={styles.songname}>{props.songName}</h3>
        <p className={styles.artistname}>{props.artistName}</p>
        <p className={styles.rank}>Top {props.rank}</p>
      </div>
      <button className={styles.playbutton} onClick={props.onPlay}>
        <img src={props.button} alt="Play" className={styles.playicon} />
      </button>
    </div>
  );
};

export default MusicListItem;
