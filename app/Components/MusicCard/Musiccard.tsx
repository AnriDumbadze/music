"use client"
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import styles from "./MusicCard.module.scss";
import Icon from "../Icon/Icon";
import { getCookie } from "../Aside/Aside";
import axios from "axios";

interface Props {
  albumCover: string;
  author: string;
  songTitle: string;
}

function MusicCard(props: Props) {
  const [themeColor, setThemeColor] = useState<string | null>(getCookie("theme")); // Store theme in state
  const [getData, setGetData] = useState([])
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

  useEffect(() => {
    const userToken = Cookies.get("userToken");

    axios.get('https://music-back-1s59.onrender.com/music', {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }).then((r) => {
      setGetData(r.data)
    })
  }, [])
  return (
    <div className={cardClassName}>
      <div className={styles.musicPhoto1}>
      {getData.map((music) => (
          <div key={music.id} className={styles.musicPhoto}>
             <img src={`/Images/${props.albumCover}.png`} alt="artist" height={"176px"} width={"168px"}/>
            <div className={styles.musicInfo}>
              <p className={styles.songTitle}>{music.name}</p>
              <p className={styles.author}>{music.artist.firstName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MusicCard;
