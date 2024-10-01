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

const Home = () => {
  const [query, setQuery] = useState<string>("");
  const [themeColor, setThemeColor] = useState(getCookie("theme") || "");
  const [artistData, setArtistData] = useState([]);
  const [topChatData, setTopChatData] = useState([])
  const [data1, setData1] = useState([])

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
    axios.get("https://music-back-1s59.onrender.com/artist",{
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    }).then((data) => {
        setArtistData(data.data)
    })
    .catch(() => {
        console.log('ratom gavixade?');
    })
},[])

useEffect(() => {
  const userToken = getCookie("userToken");
  axios.get("https://music-back-1s59.onrender.com/music",{
      headers: {
          Authorization: `Bearer ${userToken}`,
      },
  }).then((data) => {
      setData1(data.data)
  })
  .catch(() => {
      console.log('ratom gavixade?');
  })
},[])

   
  const artistCards = artistData.map((artist) => (
    <ArtistCard 
        key={artist.id} 
        artistImg={"artist"} 
        artistName={artist.firstName} 
        artistType={"Artist"} 
    />
));



const popularCharts = data1.map((chart) => (
  <TopChart 
      key={chart.id} 
      image={"topChart"} 
      songName={chart.name} 
      artistName={artistData.firstName} 
      rank={'rank'} 
  />
));


const popularHits = data1.map((item) => (
  <MusicCard 
    key={item.id} // Add a unique key for each item
    albumCover={"popHit"} 
    author={item.artist.firstName} // Access the artist's first name
    songTitle={item.name} // Use the song name from your data
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
