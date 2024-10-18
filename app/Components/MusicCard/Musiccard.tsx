import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import styles from "./MusicCard.module.scss";
import { getCookie } from "../Aside/Aside";
import axios from "axios";
import Image from "next/image";
import Icon from "../Icon/Icon";

interface Music {
  id: number; // or string based on your API response
  name: string;
  artist: {
    firstName: string; // Ensure this matches your API response
  };
}

interface Props {
  url: string;
  author: string;
  songTitle: string;
  id: number;
}

function MusicCard({ url, author, songTitle, id }: Props) {
  const [getData, setGetData] = useState<Music[]>([]);
  const [themeColor, setThemeColor] = useState<string | null>(getCookie("theme") ?? null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showPlaylistInput, setShowPlaylistInput] = useState<boolean>(false); // State for input visibility
  const [playlistName, setPlaylistName] = useState<string>("");

  const cardClassName = themeColor === "dark" 
    ? `${styles.musicCard} ${styles.darkMusicCard}` 
    : styles.musicCard;

  useEffect(() => {
    const userToken = Cookies.get("userToken");

    axios
      .get("https://music-back-1s59.onrender.com/music", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setGetData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching music data:", error);
      });
  }, []);

  const handleDotsClick = () => {
    setShowPopup(!showPopup); // Toggle popup visibility
  };

  const handleAddToPlaylist = () => {
    setShowPlaylistInput(true); // Show the input field when "Add to Playlist" is clicked
  };

  const handleCreatePlaylist = () => {
    console.log(`Playlist Name: ${playlistName}`);
    setPlaylistName(""); // Clear the input after handling
    setShowPlaylistInput(false); // Close the input field
    setShowPopup(false); // Close the popup
  };

  return (
    <div className={cardClassName}>
      <div className={styles.musicPhoto1}>
        <div key={id} className={styles.musicWrap}>
          <div className={styles.musicPhoto}>
            <Image
              className={styles.img}
              src={url}
              alt={songTitle}
              height={176}
              width={168}
              layout="intrinsic"
            />
            <div className={styles.musicInfo}>
              <div className={styles.right}>
                <p className={styles.songTitle}>{songTitle}</p>
                <p className={styles.author}>{author}</p>
              </div>
              <div className={styles.left}>
                <Icon name={"3dots"} onClick={handleDotsClick} />
              </div>
            </div>
          </div>
        </div>
        {showPopup && (
          <div className={styles.popup}>
            <button className={styles.playlist} onClick={handleAddToPlaylist}>Add to Playlist</button>
            {showPlaylistInput && (
              <div>
                <input 
                  type="text" 
                  value={playlistName} 
                  onChange={(e) => setPlaylistName(e.target.value)} 
                  placeholder="Enter Playlist Name"
                />
                <button className={styles.playlistButton} onClick={handleCreatePlaylist}>Create Playlist</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MusicCard;
