"use client"
import { useEffect, useState } from "react";
import { getCookie } from "../Aside/Aside";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import { ButtonStyle } from "../ButtonStyles";
import styles from "./TopChart.module.scss";
import Image from "next/image";

interface Props {
  image: string;
  songName: string;
  artistName: string;
  rank: string;
}

const TopChart = (props: Props) => {
  const [themeColor, setThemeColor] = useState<string | null>(getCookie("theme"));
  useEffect(() => {
    const updateTheme = () => {
      const newTheme = getCookie("theme");
      setThemeColor(newTheme);
    };

    updateTheme();

    const themeInterval = setInterval(updateTheme, 0); // Adjust interval as needed

    return () => clearInterval(themeInterval); 
  }, []);
  const containerClassName = themeColor === 'dark' ? `${styles.mainContainer} ${styles.darkMainContainer}` : styles.mainContainer;
  return (
    <div className={containerClassName}>
      <div className={styles.imageContainer}>
        <img
          src={`/Images/${props.image}.png`}
          alt="image"
          className={styles.topImage}
        />
      </div>
      <div className={styles.chartInfo}>
        <div className={styles.container}>
          <p className={styles.song}>{props.songName}</p>
          <p className={styles.artist}>{props.artistName}</p>
        </div>
        <div className={styles.bottom}>
          <p className={styles.rank}>Top {props.rank}</p>
          <ButtonIcon
            icon="triangle"
            onClick={() => console.log("jigar damklikes")}
            style={ButtonStyle.Red}
          />
        </div>
      </div>
    </div>
  );
};

export default TopChart;
