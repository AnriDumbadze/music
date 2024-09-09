import React from "react";
import styles from "./MusicCard.module.scss";
import Icon from "../Icon/Icon";

interface Props {
  albumCover: string;
  author: string;
  songTitle: string;
}

function MusicCard(props: Props) {
  return (
    <div className={styles.musicCard}>
      <div className={styles.musicPhoto}>
        <img src={`/Images/${props.albumCover}.png`} alt="artist" height={"176px"} width={"168px"}/>

        <div className={styles.musicInfo}>
          <p className={styles.songTitle}>{props.songTitle}</p>
          <p className={styles.author}>{props.author}</p>
        </div>
      </div>
    </div>
  );
}

export default MusicCard;
