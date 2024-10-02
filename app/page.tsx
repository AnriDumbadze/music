"use client";

import React, { useEffect, useState } from "react";
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
import PlayerController from "./Components/PlayerController/PlayerController";
import songs from "@/public/Consts/songs";
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
  songDuration?: string; // Assuming songDuration is part of the Music interface
}

const convertDurationToSeconds = (duration: string | undefined): number => {
  if (!duration) {
    console.error("Invalid duration:", duration);
    return 0; // Default value
  }

  const [minutes, seconds] = duration.split(":").map(Number);
  return isNaN(minutes) || isNaN(seconds) ? 0 : minutes * 60 + seconds;
};

const Home = () => {
  const [query, setQuery] = useState<string>("");
  const [themeColor, setThemeColor] = useState<string>(
    getCookie("theme") || ""
  );
  const [artistData, setArtistData] = useState<Artist[]>([]);
  const [musicData, setMusicData] = useState<Music[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime] = useState(0);
  const [showPlayer, setShowPlayer] = useState(true);
  const [currentSongId, setCurrentSongId] = useState<number | null>(
    songs.length > 0 ? songs[0].id : null
  );

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

  // Update theme
  useEffect(() => {
    const updateTheme = () => {
      const newTheme = getCookie("theme");
      setThemeColor(newTheme || "");
    };

    updateTheme();
    const themeInterval = setInterval(updateTheme, 0);
    return () => clearInterval(themeInterval);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const toggleView = () => {
    setShowPlayer((prevShowPlayer) => !prevShowPlayer);
  };

  const handleSongChange = (id: number) => {
    if (songs.some((song) => song.id === id)) {
      setCurrentSongId(id);
      setShowPlayer(true);
    }
  };

  const currentSong = songs.find((song) => song.id === currentSongId);

  const artistCards = artistData.map((artist) => (
    <ArtistCard
      key={artist.id}
      artistImg={
        artist.image[artist.image.length - 1]?.url || "/Images/artist.png"
      }
      artistName={artist.firstName}
      artistType="Artist"
      biography={artist.biography}
    />
  ));

  const popularCharts = musicData.map((chart) => {
    const artist = artistData.find((a) => a.id === chart.artist.id);
    return (
      <TopChart
        image={
          chart.image[chart.image.length - 1]?.url ||
          "https://musicappbacket.s3.eu-north-1.amazonaws.com/271247016_1261196094379214_756297623613666142_n"
        }
        key={chart.id}
        songName={chart.name}
        artistName={artist ? artist.firstName : "Unknown Artist"}
        rank="rank"
      />
    );
  });

  const popularHits = musicData.map((item) => (
    <MusicCard
      url={item.image[item.image.length - 1]?.url || "/Images/popHit.png"}
      key={item.id}
      author={item.artist.firstName}
      songTitle={item.name}
      id={item.id}
    />
  ));

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
        <div
          className={`${styles.static} ${themeColor === "dark" ? styles.darkStatic : ""
            }`}
        >
          <Header />
          <div className={styles.staticFlex}>
            <div className={styles.wrapperContainer}>

              <MusicWrapper cards={artistCards} name="Popular artists" />
              <MusicWrapper cards={popularHits} name="Popular hits of the week" />
              <MusicWrapper cards={popularCharts} name="Popular Charts" />
            </div>
            <div className={styles.mainContent}>
              <div className="App">
                {showPlayer ? (
                  currentSong ? (
                    <PlayerController
                      albumTitle="Born To Die"
                      dropdown="icons/arrowdown.svg"
                      image={currentSong.src}
                      currentTrack={currentSong.title}
                      currentArtist={currentSong.artist}
                      currentTime={currentTime}
                      duration={convertDurationToSeconds(currentSong.songDuration)}
                      isPlaying={isPlaying}
                      onPlayPause={() => setIsPlaying((prev) => !prev)}
                      onRepeat={() => { }}
                      onShuffle={() => { }}
                      queueTrack={currentSong.queueSong}
                      queueArtist={currentSong.queueName}
                      photo={currentSong.src}
                      onToggleView={toggleView}
                      currentSongId={currentSongId !== null ? currentSongId : 0} // Handle null case
                      setCurrentSongId={setCurrentSongId}
                    />

                  ) : (
                    <p>Song not found</p>
                  )
                ) : (
                  currentSong && (
                    <MusicListItem
                      image={currentSong.src}
                      songName={currentSong.title}
                      artistName={currentSong.artist}
                      rank=""
                      button="./icons/playbtn.svg"
                      onPlay={() => handleSongChange(currentSongId as number)}
                    />
                  )
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
