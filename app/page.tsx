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
import Cookies from "js-cookie";
import { log } from "console";
import ComputerPlayer from "./Components/ComputerPlayer/ComputerPlayer";

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
  const [themeColor, setThemeColor] = useState<string>(
    Cookies.get("theme") || ""
  );
  const [artistData, setArtistData] = useState<Artist[]>([]);
  const [musicData, setMusicData] = useState<Music[]>([]);
  const [showPlayer, setShowPlayer] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTrackTime, setCurrentTrackTime] = useState(0);
  const [searchedMusic, setSearchedMusic] = useState<any>(undefined);
  const [albumMusic, setAlbumMusic] = useState<any>(undefined)

  useEffect(() => {
    const searched_music = localStorage.getItem("Searched_Music");
    const album_music = localStorage.getItem("albumItem");
    if (searched_music) {
      const music = JSON.parse(searched_music);
      setSearchedMusic(music.musics);  // This will trigger a re-render
      localStorage.removeItem("Searched_Music")
    } else if(album_music){
      const music = JSON.parse(album_music);
      setAlbumMusic(music.musics)
      localStorage.removeItem("albumItem")
    }
  }, []);
  
  // Log the updated searchedMusic when it changes
  useEffect(() => {
    if (searchedMusic) {
      console.log(searchedMusic); // This will now log after it's updated
    } else if(albumMusic) {
      console.log(albumMusic); //undefined
    }
  }, [searchedMusic, albumMusic]);
  
 

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
// Fetch music data
useEffect(() => {
  const userToken = getCookie("userToken");
  
  const fetchMusicData = async () => {
    try {
      const response = await axios.get("https://music-back-1s59.onrender.com/music", {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      // Start with the fetched music data
      const musicArr: any[] = response.data;

      // If searchedMusic exists, check for duplicates
      if (searchedMusic) {
        // Filter out any music that has the same ID as searchedMusic
        const filteredMusicArr = musicArr.filter(music => music.id !== searchedMusic.id);
        
        // Combine the searchedMusic with the filtered music array
        const finalMusicArr = [searchedMusic, ...filteredMusicArr];
        setMusicData(finalMusicArr);
      } else if(albumMusic) {
        console.log("albumId: " + albumMusic);
        
        // If no searchedMusic, just set the fetched music data
        const filteredMusicArr = musicArr.filter(music => music.id !== albumMusic.id);
        const finalMusicArr = [albumMusic, ...filteredMusicArr];
        setMusicData(finalMusicArr)

      } else  {
        console.log("nothing")
        setMusicData(musicArr);
      }

      console.log(musicArr);
      
    } catch (error) {
      console.error("Failed to fetch music:", error);
    }
  };
  
  fetchMusicData();
}, [searchedMusic, albumMusic]);
; // Add searchedMusic as a dependency to run this effect when it changes


  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Handle track change
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % musicData.length); // Increment index and wrap around
    setCurrentTrackTime(0); // Reset track time
  };

  const handleBack = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + musicData.length) % musicData.length
    ); // Handle negative index wrap
    setCurrentTrackTime(0);
  };

  // Handle selecting a song from the music list without modifying the musicData array
  const handleMusicSelect = (musicId: number) => {
    const selectedMusicIndex = musicData.findIndex(
      (music) => music.id === musicId
    );
    if (selectedMusicIndex !== -1) {
      setCurrentIndex(selectedMusicIndex); // Set the selected song index without altering the array
    }
  };

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
  return (
    <RecoilRoot>
      <div className={styles.mainContent}>
        <div className={styles.burger}>
          <Icon width="72px" name="FAZER" isActive={false} onClick={() => {}} />
          <BurgerMenuMobile />
        </div>
        <div className={styles.mainAside}>
          <Aside />
        </div>
        <div
          className={`${styles.static} ${
            themeColor === "dark" ? styles.darkStatic : ""
          }`}
        >
          <Header />
          <div className={styles.staticFlex}>
            <div className={styles.wrapperContainer}>
              <MusicWrapper
                cards={artistData.map((artist) => (
                  <ArtistCard
                    key={artist.id}
                    artistImg={
                      artist.image[artist.image.length - 1]?.url ||
                      "/Images/artist.png"
                    }
                    artistName={artist.firstName}
                    artistType="Artist"
                    biography={artist.biography}
                  />
                ))}
                name="Popular artists"
              />
              <MusicWrapper
                cards={musicData.map((item) => (
                  <div key={item.id} onClick={() => handleMusicSelect(item.id)}>
                    <MusicCard
                      url={
                        item.image[item.image.length - 1]?.url ||
                        "/Images/popHit.png"
                      }
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
              <div className={styles.app}>
                {showPlayer && currentSong ? (
                  <>
                    <div className={styles.trackInfo}>
                      <img
                        src={
                          currentSong.image[0]?.url || "default-album-art.jpg"
                        }
                        alt="Album Art"
                        className={styles.albumArt}
                      />
                      <div className={styles.trackDetails}>
                        <h3 className={styles.track}>{currentSong.name}</h3>
                        <p>{currentSong.artist.firstName}</p>
                      </div>
                    </div>
                    <div className={styles.videoContainer}>
                      <div
                        onClick={handleBack}
                        className={styles.controllerbutton}
                      >
                        <Icon name={"previous"} />
                      </div>
                      <video
                        ref={videoRef}
                        className={styles.lineVideo}
                        controls
                      >
                        <source src={currentSong.mp3.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <div
                        onClick={handleNext}
                        className={styles.controllerbutton}
                      >
                        <Icon name={"next"} />
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
        <div className={styles.computerPlayer}>
          <ComputerPlayer/>
        </div>

        <div className={styles.secondAside}>
          <Aside />
        </div>
      </div>
    </RecoilRoot>
  );
};

export default Home;
