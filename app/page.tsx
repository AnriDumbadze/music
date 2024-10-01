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

interface Artist {
  id: number;
  firstName: string;
  lastName: string;
  biography: string;
}

interface Music {
  id: number;
  name: string;
  artist: Artist; // Assuming each music item has an artist
}

const Home = () => {
  const [query, setQuery] = useState<string>("");
  const [themeColor, setThemeColor] = useState<string>(getCookie("theme") || "");
  const [artistData, setArtistData] = useState<Artist[]>([]);
  const [topChatData, setTopChatData] = useState<any[]>([]); // Specify a type if known
  const [data1, setData1] = useState<Music[]>([]);

  useEffect(() => {
    const updateTheme = () => {
      const newTheme = getCookie("theme");
      setThemeColor(String(newTheme));
    };

    updateTheme();

    const themeInterval = setInterval(updateTheme, 0); // Adjust interval as needed

    return () => clearInterval(themeInterval);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    const userToken = getCookie("userToken");
    axios
      .get("https://music-back-1s59.onrender.com/artist", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setArtistData(response.data);
      })
      .catch(() => {
        console.log("ratom gavixade?");
      });
  }, []);

  useEffect(() => {
    const userToken = getCookie("userToken");
    axios
      .get("https://music-back-1s59.onrender.com/music", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setData1(response.data);
      })
      .catch(() => {
        console.log("ratom gavixade?");
      });
  }, []);

  const artistCards = artistData.map((artist) => (
    <ArtistCard
      key={artist.id}
      artistImg={"artist"}
      artistName={artist.firstName}
      artistType={"Artist"}
    />
  ));

  const popularCharts = data1.map((chart) => {
    const artist = artistData.find((a) => a.id === chart.artist.id); // Find artist for the current chart
    return (
      <TopChart
        key={chart.id}
        image={"topChart"}
        songName={chart.name}
        artistName={artist ? artist.firstName : "Unknown Artist"} // Use optional chaining to handle cases where artist is not found
        rank={'rank'}
      />
    );
  });

  const popularHits = data1.map((item) => (
    <MusicCard
      key={item.id}
      albumCover={"popHit"}
      author={item.artist.firstName} // Access the artist's first name
      songTitle={item.name}
    />
  ));

  return (
    <RecoilRoot>
      <div className={styles.mainContent}>
        <Aside />
        <div className={`${styles.static} ${themeColor === 'dark' ? styles.darkStatic : ''}`}>
          <Header />
          <MusicWrapper cards={artistCards} name={"Popular artists"} />
          <MusicWrapper cards={popularHits} name={"Popular hits of the week"} />
          <MusicWrapper cards={popularCharts} name={"Popular Charts"} />
        </div>
      </div>
    </RecoilRoot>
  );
};

export default Home;
