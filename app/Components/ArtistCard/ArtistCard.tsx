"use client"
import { useState, useEffect } from "react";
import { getCookie } from "../Aside/Aside";
import Icon from "../Icon/Icon";
import styles from "./ArtistCard.module.scss";

type Props = {
  artistImg: string;
  artistName: string;
  artistType: string;
};
const ArtistCard = (props: Props) => {
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
  const cardClassName = themeColor === 'dark' ? `${styles.artistCard} ${styles.darkArtistCard}` : styles.artistCard;
  return (
    <div className={cardClassName}>
      <div className={styles.cardContent}>
        <img src={`/Images/${props.artistImg}.png`} alt="artist" />
        <div className={styles.artistInfo}>
          <div className={styles.artistName}>{props.artistName}</div>
          <div className={styles.artistType}>{props.artistType}</div>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
