"use client"
import React, { useEffect, useState } from "react";
import styles from "./MusicCard.module.scss";
import Icon from "../Icon/Icon";
import { getCookie } from "../Aside/Aside";

interface Props {
  albumCover: string;
  author: string;
  songTitle: string;
}

function MusicCard(props: Props) {
  const [themeColor, setThemeColor] = useState<string | null>(getCookie("theme")); // Store theme in state

  useEffect(() => {
    const updateTheme = () => {
      const newTheme = getCookie("theme");
      setThemeColor(newTheme);
    };

    updateTheme();

    const themeInterval = setInterval(updateTheme, 0); // Adjust interval as needed

    return () => clearInterval(themeInterval); 
  }, []);
  const cardClassName = themeColor === 'dark' ? `${styles.musicCard} ${styles.darkMusicCard}` : styles.musicCard;
  return (
    <div className={cardClassName}>
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
