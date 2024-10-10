"use client";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import Image from "next/image"; // Import Image from next/image
import Icon from "../Icon/Icon";
import styles from "./ArtistCard.module.scss";
import axios from "axios";

type Props = {
  artistImg: string;
  artistName: string;
  artistType: string;
  biography: string;
  onClick?:() => void
};

interface Image {
  id: number;
  fileName: string;
  bucketName: string;
  key: string;
  url: string;
}

type ArtistData = {
  firstName: string;
  biography: string;
  image: Image[];
};



const ArtistCard = (props: Props) => {
  // Initialize themeColor to a string or null
  const [themeColor, setThemeColor] = useState<string | null>(Cookies.get("theme") || null); // Get initial theme from cookies
  const [getData, setGetData] = useState<ArtistData[]>([]);
  



  


  const cardClassName = themeColor === "dark" ? `${styles.artistCard} ${styles.darkArtistCard}` : styles.artistCard;

  useEffect(() => {
    const userToken = Cookies.get("userToken");

    axios
      .get("https://music-back-1s59.onrender.com/artist", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((r) => {
        setGetData(r.data);
      })
      .catch((error) => {
        console.error("Error fetching artist data:", error);
      });
  }, []);



  return (
    <div className={cardClassName}>
      <div className={styles.cardContent}>
      
          <div onClick={props.onClick} key={props.artistName} className={styles.artistInfo}>
            <Image
              src={props.artistImg} // Use a known valid image URL
              alt={props.artistName}
              width={150}
              height={150}
              className={styles.artistImage}
            />
            <div className={styles.artistName}>{props.artistName}</div>
            <div className={styles.artistType}>{props.biography}</div>
          </div>

      </div>
    </div>
  );
};

export default ArtistCard;
