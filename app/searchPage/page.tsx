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
import axios from "axios";
import Cookies from "js-cookie";
export default function SearchPage(){
    const [themeColor, setThemeColor] = useState<string | null>(getCookie("theme")); // Store theme in state
    const [search,setSearch] = useState('')
    const [data, setData] = useState<[]>([]);
    useEffect(() => {
      const updateTheme = () => {
        const newTheme = getCookie("theme");
        setThemeColor(newTheme);
      };
  
      updateTheme();
  
      const themeInterval = setInterval(updateTheme, 0); // Adjust interval as needed
  
      return () => clearInterval(themeInterval); 
    }, []);
    const artistCards = [
        <ArtistCard artistImg={"artist"} artistName={"Travis Scott"} artistType={"Artist"} />,  
      ];

    
      const popularCharts = [
        <TopChart image={"topChart"} songName={"Good Days"} artistName={"SZA"} rank={"1"} />,
    
      ];

      const onchange1 =(e:any) => {
        setSearch(e.target.value)
      }
      
      useEffect(() => {
        const userToken = localStorage.getItem("token");
    
        if (userToken && search) { // Only trigger when token and search are available
          axios.get(`https://music-back-1s59.onrender.com/search/artist?search=${search}`, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          })
            .then((response) => {
             setData(response.data)
            })
            .catch((error) => {
              if (error.response && error.response.status === 401) {
                console.log('Unauthorized: Invalid token');
              } else {
                console.log('Error:', error.message);
              }
            });
        }
      }, [search]); 
      const firstNames = data.map((item) => item.firstName);

      // Store first names in localStorage
      localStorage.setItem("searchName", JSON.stringify(firstNames));

      const id = data.map((item) => item.id);

      // Store first names in localStorage
      localStorage.setItem("searchId", JSON.stringify(id));
  
    return(
        <>
    <div className={styles.mainContent}>
      <Aside />
      <div className={`${styles.static} ${themeColor === 'dark' ? styles.darkStatic : ''}`}>
        <Header onchange={onchange1} />
        <RecentSearch name={firstNames.join(", ")} more={id.join(", ")} data={[firstNames]}/>
        <MusicWrapper cards={popularCharts} name={"Popular Charts"} />

      </div>
    </div>
        </>
    )
}