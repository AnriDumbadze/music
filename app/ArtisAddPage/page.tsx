"use client"
import Aside, { getCookie } from '../Components/Aside/Aside'
import MusicWrapper from '../Components/MusicWrapper/MusicWrapper'
import RecentSearch from '../Components/recentSearch/recet'
import styles from './artist.module.scss'
import { useState, useEffect } from 'react'
import TopChart from '../Components/TopChart/TopChart'
import Header from '../Components/Header/Header'
import { ST } from 'next/dist/shared/lib/utils'
import Icon from '../Components/Icon/Icon'
import ArtistForm from '../Components/AddArtistForm/artistForm'

export default function ArtistAdd() {
    const [themeColor, setThemeColor] = useState<string | null>(getCookie("theme")); // Store theme in state
    useEffect(() => {
      const updateTheme = () => {
        const newTheme = getCookie("theme");
        setThemeColor(newTheme);
      };
  
      updateTheme();
  
      const themeInterval = setInterval(updateTheme, 0); // Adjust interval as needed
  
      return () => clearInterval(themeInterval); 
    }, []);
    const popularCharts = [
        <TopChart image={"topChart"} songName={"Good Days"} artistName={"SZA"} rank={"1"} />,
    
      ];
    return(
        <>
        <div className={styles.mainContent}>
      <Aside />
      <div className={`${styles.static} ${themeColor === 'dark' ? styles.darkStatic : ''}`}>
        <div className={styles.headerAdmin}>
            <div className={styles.containerIcon}>
            <Icon  height={"32px"} width={"32px"} name={"Arrow"} isActive={false} onClick={function (): void {
            throw new Error("Function not implemented.");
          } } />
          <Icon  height={"32px"} width={"32px"} name={"rightArr"} isActive={false} onClick={function (): void {
            throw new Error("Function not implemented.");
          } } />
            </div>
            <p className={styles.HeaderTitle}>Add Artists</p>
        </div>
        <div className={styles.line}></div>
        <ArtistForm/>
      </div>
    </div>
        </>
    )
}