"use client"
import Header from "../Components/Header/Header";
import Aside, { getCookie } from '../Components/Aside/Aside'
import MusicWrapper from '../Components/MusicWrapper/MusicWrapper'
import styles from './searchPage.module.scss'
import { useState, useEffect } from 'react'
import ArtistCard from '../Components/ArtistCard/ArtistCard'
import MusicCard from '../Components/MusicCard/Musiccard'
import TopChart from '../Components/TopChart/TopChart'
import RecentSearch from "../Components/recentSearch/recet";

export default function SearchPage(){
    const [themeColor, setThemeColor] = useState<string | null>(getCookie("theme")); // Store theme in state

    useEffect(() => {
      const updateTheme = () => {
        const newTheme = getCookie("theme");
        setThemeColor(newTheme);
      };
  
      updateTheme();
  
      const themeInterval = setInterval(updateTheme, 0);
  
      return () => clearInterval(themeInterval); 
    }, []);
    const artistCards = [
        <ArtistCard artistImg={"artist"} artistName={"Travis Scott"} artistType={"Artist"} />,  
      ];

    
      const popularCharts = [
        <TopChart image={"topChart"} songName={"Good Days"} artistName={"SZA"} rank={"1"} />,
    
      ];
    return(
        <>
    <div className={styles.mainContent}>
      <Aside />
      <div className={`${styles.static} ${themeColor === 'dark' ? styles.darkStatic : ''}`}>
        <Header />
        <RecentSearch/>
        <MusicWrapper cards={popularCharts} name={"Popular Charts"} />

      </div>
    </div>
        </>
    )
}