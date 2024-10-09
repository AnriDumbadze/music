import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import styles from "./MusicCard.module.scss";
import { getCookie } from "../Aside/Aside";
import axios from "axios";
import Image from 'next/image'; 

interface Music {
  id: number; // or string based on your API response
  name: string;
  artist: {
    firstName: string; // Ensure this matches your API response
  };
}

interface Props {
  url: string;
  author: string; // Consider if you still need this prop
  songTitle: string; // Consider if you still need this prop
  id: number;
}

function MusicCard(props: Props) {
  const [getData, setGetData] = useState<Music[]>([]);
  const [themeColor, setThemeColor] = useState<string | null>(getCookie("theme") ?? null); // Set default to null

  useEffect(() => {
    const updateTheme = () => {
      const newTheme = getCookie("theme") ?? null; // Ensure it defaults to null
      setThemeColor(newTheme);
    };

    updateTheme();

    const themeInterval = setInterval(updateTheme, 5000); // Adjust interval as needed

    return () => clearInterval(themeInterval);
  }, []);

  const cardClassName = themeColor === 'dark' ? `${styles.musicCard} ${styles.darkMusicCard}` : styles.musicCard;

  useEffect(() => {
    const userToken = Cookies.get("userToken");

    axios.get('https://music-back-1s59.onrender.com/music', {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    .then((response) => {
      setGetData(response.data);
    })
    .catch((error) => {
      console.error('Error fetching music data:', error);
    });
  }, []);

  return (
    <div className={styles.cardClassName}>
      <div className={styles.musicPhoto1}>
          <div key={props.id} className={styles.musicWrap}> 
            <div className={styles.musicPhoto}>

              

            <Image 
            className={styles.img}
                src={props.url} 
                alt={props.songTitle} 
                height={172} // Use numbers for height
                width={168} // Use numbers for width
                layout="intrinsic" // Use layout for better handling
              />
              <div className={styles.musicInfo}>
                <p className={styles.songTitle}>{props.songTitle}</p>
                <p className={styles.author}>{props.author}</p>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default MusicCard;
