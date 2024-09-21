"use client"
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { getCookie } from "../Aside/Aside";
import Icon from "../Icon/Icon";
import styles from "./ArtistCard.module.scss";
import axios from "axios";

type Props = {
  artistImg: string;
  artistName: string;
  artistType: string;
};
const ArtistCard = (props: Props) => {
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

  const cardClassName = themeColor === 'dark' ? `${styles.artistCard} ${styles.darkArtistCard}` : styles.artistCard;

  useEffect(() => {
    const userToken = Cookies.get("userToken");

    axios.get('https://music-back-1s59.onrender.com/artist', {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }).then((r) => {
      setGetData(r.data)
    })
  }, [])

  return (
    <div className={cardClassName}>
      <div className={styles.cardContent}>
        {getData.map((artist) => (
          <div className={styles.artistInfo}>
            <img src={`/Images/${props.artistImg}.png`} alt="artist" />
            <div className={styles.artistName}>{artist.firstName}</div>
            <div className={styles.artistType}>{artist.biography}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistCard;
