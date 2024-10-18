"use client";

import { useState, useEffect } from "react";
import Header from "../Components/Header/Header";
import Aside from "../Components/Aside/Aside";
import PlaylistCard from "../Components/playlistCard/playlsitCard";
import styles from "./playlist.module.scss";
import Icon from "../Components/Icon/Icon";
import axios from "axios";
import { getCookie } from "../Components/Aside/Aside";

export default function Playlist() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isFormVisible, setFormVisible] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [playlists, setPlaylists] = useState<any[]>([]); // Storing both backend and new static playlists

  // Fetch playlists from the backend on component mount
  useEffect(() => {
    const userToken = getCookie("userToken");

    axios
      .get("https://music-back-1s59.onrender.com/users/me", {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        if (response.data && response.data.playlists) {
          setPlaylists(response.data.playlists); // Set playlists fetched from backend
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
    setFormVisible(false);
  };

  const handleYesClick = () => {
    setFormVisible(true);
  };

  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Add the new playlist to the local state along with the backend playlists
    const newPlaylist = {
      id: playlists.length + 1, // Generate a simple id
      name: playlistName,
      createdAt: new Date().toLocaleDateString(), // Format the date as needed
    };

    // Update the playlists state with the new static playlist
    setPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist]);

    // Reset the form and close the popup
    setPlaylistName("");
    setPopupVisible(false);
    setFormVisible(false);
  };

  return (
    <>
      <div className={styles.mainContent}>
        <Aside />
        <div className={`${styles.darkStatic}`}>
          <Header />
          <div className={styles.backgroundPlaylist}>
            <div
              className={`${styles.background} ${
                isPopupVisible ? styles.blurred : ""
              }`}
            >
              <div className={styles.playlistTitle}>
                <img src="./images/playlist.png" alt="Playlist Cover" />
                <div className={styles.text}>
                  <h1 className={styles.title}>Playlist #1</h1>
                  <p className={styles.description}>
                    4 Artists · 15 Songs · 52 Minutes And 12 Seconds
                  </p>
                  <div className={styles.iconGroup}>
                    <Icon width="49" height="49" name={"playlistpause"} />
                    <Icon width="32" height="32" name={"playlistHeart"} />
                    <Icon width="32" height="32" name={"playlistshuffle"} />
                    <Icon width="32" height="32" name={"options"} />
                  </div>
                </div>
              </div>
              <div className={styles.lists}>
                <div className={styles.line}></div>
                <div className={styles.listTitle}>
                  <p className={styles.titleTextP}>#</p>
                  <p className={styles.titleTextP}>Music</p>
                  <p className={styles.titleTextP}>Album</p>
                  <p className={styles.titleTextP}>Time Added</p>
                  <button className={styles.btn1} onClick={togglePopup}>
                    Add Playlist
                  </button>
                </div>
              </div>
              <PlaylistCard playlists={playlists} /> {/* Pass both backend and new playlists as a prop */}
            </div>
            {isPopupVisible && !isFormVisible && (
              <>
                <div className={styles.overlay} onClick={togglePopup} />
                <div className={styles.popupContainer}>
                  <h2>Do you want to create a playlist?</h2>
                  <div className={styles.buttonContainer}>
                    <button
                      className={styles.yesButton}
                      onClick={handleYesClick}
                    >
                      Yes
                    </button>
                    <button className={styles.noButton} onClick={togglePopup}>
                      No
                    </button>
                  </div>
                </div>
              </>
            )}
            {isFormVisible && (
              <>
                <div className={styles.overlay} onClick={togglePopup} />
                <div className={styles.popupContainer}>
                  <h2>Enter Playlist Name</h2>
                  <form
                    onSubmit={handleFormSubmit}
                    className={styles.playlistForm}
                  >
                    <div className={styles.playListName}>
                      <div className={styles.infoHolder}>
                        <input
                          type="text"
                          className={styles.input}
                          value={playlistName}
                          onChange={(e) => setPlaylistName(e.target.value)}
                          placeholder="Playlist Name"
                          required
                        />
                      </div>
                      <div className={styles.formButtons}>
                        <button type="submit" className={styles.submitButton}>
                          Create
                        </button>
                        <button
                          type="button"
                          onClick={togglePopup}
                          className={styles.cancelButton}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
