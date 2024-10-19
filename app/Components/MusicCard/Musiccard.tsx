import React, { useState } from "react";
import styles from "./MusicCard.module.scss";
import Image from "next/image";
import Icon from "../Icon/Icon";
import axios from "axios";
import { getCookie } from "../Aside/Aside";

interface Music {
  id: number;
  name: string;
  artist: {
    firstName: string;
  };
}

interface Props {
  url: string;
  author: string;
  songTitle: string;
  id: number;
  playlists: any[];
}

function MusicCard(props: Props) {
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddToPlaylist = async (playlistId: number) => {
    try {
      const userToken = getCookie("userToken"); 
      const response = await axios.patch(
        `https://music-back-1s59.onrender.com/playlist/${playlistId}`,  // Include playlistId in the URL
        { musicIds: [props.id] }, 
        { headers: { Authorization: `Bearer ${userToken}` } }
      );  

      setMessage(`Added to playlist: ${response.data.playlistName}`);
      setShowPlaylistMenu(false);
    } catch (error) {
      console.error("Error adding to playlist:", error);
      setMessage("Failed to add to playlist");
    }
  };

  return (
    <div className={styles.musicCard}>
      <div className={styles.musicPhoto}>
        <Image
          className={styles.img}
          src={props.url}
          alt={props.songTitle}
          height={176}
          width={168}
        />
        <div className={styles.musicInfo}>
          <div className={styles.right}>
            <p className={styles.songTitle}>{props.songTitle}</p>
            <p className={styles.author}>{props.author}</p>
            {message && <p className={styles.message}>{message}</p>} 
          </div>
          <div className={styles.left}>
            <Icon name={"3dots"} onClick={() => setShowPlaylistMenu(!showPlaylistMenu)} />
            {showPlaylistMenu && (
              <div className={styles.playlistMenu}>
                <span className={styles.playlistHeader}>Add to Playlist</span>
                {props.playlists.map((playlist) => (
                  <div key={playlist.id} onClick={() => handleAddToPlaylist(playlist.id)}>
                    {playlist.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicCard;
