"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";
import Aside, { getCookie } from "./Components/Aside/Aside";
import TopChart from "./Components/TopChart/TopChart";
import Header from "./Components/Header/Header";
import MusicWrapper from "./Components/MusicWrapper/MusicWrapper";
import MusicCard from "./Components/MusicCard/Musiccard";
import ArtistCard from "./Components/ArtistCard/ArtistCard";
import { RecoilRoot } from "recoil";
import axios from "axios";
import BurgerMenuMobile from "./Components/burgermenumobile/burgetmobile";
import Icon from "./Components/Icon/Icon";
import MusicListItem from "./Components/MusicList/MusicListItem";

interface Artist {
  id: number;
  firstName: string;
  lastName: string;
  biography: string;
  image: Image[];
}

interface Image {
  id: number;
  fileName: string;
  bucketName: string;
  key: string;
  url: string;
}

interface Music {
  id: number;
  name: string;
  artist: Artist;
  image: Image[];
  mp3: { url: string }; // Ensure mp3 field is included
}

const Home = () => {
  const [query, setQuery] = useState<string>("");
  const [themeColor, setThemeColor] = useState<string>(getCookie("theme") || "");
  const [artistData, setArtistData] = useState<Artist[]>([]);
  const [musicData, setMusicData] = useState<Music[]>([]);
  const [showPlayer, setShowPlayer] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTrackTime, setCurrentTrackTime] = useState(0);

  // Fetch artist data
  useEffect(() => {
    const userToken = getCookie("userToken");
    axios
      .get("https://music-back-1s59.onrender.com/artist", {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        setArtistData(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch artists:", error);
      });
  }, []);

  // Fetch music data
  useEffect(() => {
    const userToken = getCookie("userToken");
    axios
      .get("https://music-back-1s59.onrender.com/music", {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        setMusicData(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch music:", error);
      });
  }, []);




  const videoRef = useRef<HTMLVideoElement | null>(null);
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % musicData.length); // Increment index and wrap around
    setCurrentTrackTime(0); // Reset track time
  };

  const handleBack = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1) % musicData.length)
    setCurrentTrackTime(0);
  }

  const addMusic = (musicProps: Music) => {
    setMusicData([musicProps, ...musicData])
  }


  useEffect(() => {
    if (musicData.length > 0) {
      const currentSong = musicData[currentIndex]; // Get the current song based on the index
      if (videoRef.current) {
        videoRef.current.src = currentSong.mp3.url; // Update the video source
        videoRef.current.load(); // Load the new source
        videoRef.current.play(); // Play the new track
      }
    }
  }, [currentIndex, musicData]); // Run when currentIndex or musicData changes


  const currentSong = musicData[currentIndex];


  if (currentSong) {
    console.log(currentSong.mp3.url);
  }

  return (
    <RecoilRoot>
      <div className={styles.mainContent}>
        <div className={styles.burger}>
          <Icon width="72px" name="FAZER" isActive={false} onClick={() => { }} />
          <BurgerMenuMobile />
        </div>
        <div className={styles.mainAside}>
          <Aside />
        </div>
        <div className={`${styles.static} ${themeColor === "dark" ? styles.darkStatic : ""}`}>
          <Header />
          <div className={styles.staticFlex}>
            <div className={styles.wrapperContainer}>
              <MusicWrapper cards={artistData.map((artist) => (
                <ArtistCard
                  key={artist.id}
                  artistImg={artist.image[artist.image.length - 1]?.url || "/Images/artist.png"}
                  artistName={artist.firstName}
                  artistType="Artist"
                  biography={artist.biography}
                />
              ))} name="Popular artists" />
              <MusicWrapper
                cards={musicData.map((item) => (
                  <div key={item.id}  onClick={() => addMusic({id: item.id, name: item.name, artist: item.artist, image: item.image, mp3: {url: item.mp3.url}})}>
                    <MusicCard
                      url={item.image[item.image.length - 1]?.url || "/Images/popHit.png"}
                      author={item.artist.firstName}
                      songTitle={item.name}
                      id={item.id}
                      
                    />
                  </div>
                ))}
                
                name="Popular hits of the week"
              />

            </div>
            <div className={styles.mainContent}>
              <div className="App">
                {showPlayer && currentSong ? (
                  <>
                    <div className={styles.trackInfo}>
                      <img src={currentSong.image[0]?.url || "default-album-art.jpg"} alt="Album Art" className={styles.albumArt} />
                      <div className={styles.trackDetails}>
                        <h3 className={styles.track}>{currentSong.name}</h3>
                        <p>{currentSong.artist.firstName}</p>
                      </div>
                    </div>
                    <div className={styles.videoContainer}>
                      <video ref={videoRef} className={styles.lineVideo} controls>
                        <source src={currentSong.mp3.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <div onClick={handleNext} className={styles.controllerbutton}>
                        <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.8507 8.37869L18.648 14.8574C19.5107 15.3747 19.5107 16.6267 18.648 17.144L7.8507 23.6227C6.9627 24.1547 5.83203 23.5147 5.83203 22.4787V9.52135C5.83203 8.48535 6.9627 7.84535 7.8507 8.37869Z" fill="#292929" stroke="#292929" stroke-linecap="round" stroke-linejoin="round" />
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M25.168 24C24.064 24 23.168 23.104 23.168 22V10C23.168 8.896 24.064 8 25.168 8C26.272 8 27.168 8.896 27.168 10V22C27.168 23.104 26.272 24 25.168 24Z" fill="#292929" stroke="#292929" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </div>
                      <div onClick={handleBack} className={styles.controllerbutton}>
                        <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M25.1493 8.37869L14.352 14.8574C13.4893 15.3747 13.4893 16.6267 14.352 17.144L25.1493 23.6227C26.0373 24.1547 27.168 23.5147 27.168 22.4787V9.52135C27.168 8.48535 26.0373 7.84535 25.1493 8.37869Z" fill="#292929" stroke="#292929" stroke-linecap="round" stroke-linejoin="round" />
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.83203 24C8.93603 24 9.83203 23.104 9.83203 22V10C9.83203 8.896 8.93603 8 7.83203 8C6.72803 8 5.83203 8.896 5.83203 10V22C5.83203 23.104 6.72803 24 7.83203 24Z" fill="#292929" stroke="#292929" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </>
                ) : (
                  <p>No music available</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.secondAside}>
          <Aside />
        </div>
      </div>
    </RecoilRoot>
  );
};

export default Home;
