"use client"
import styles from './page.module.scss'
import Search from "../Components/SearchComponent/Search";
import MusicCard from "../Components/MusicCard/Musiccard";
import ArtistCard from "../Components/ArtistCard/ArtistCard";
import MusicWrapper from "../Components/MusicWrapper/MusicWrapper";
import Header from "../Components/Header/Header";
import Aside, { getCookie } from "../Components/Aside/Aside";
import { useState, useEffect } from "react";
import AsideMenu from "../Components/Aside/Aside";

export default function Library() {
    const [query, setQuery] = useState<string>('');
    const [cardsPerRow, setCardsPerRow] = useState<number>(6); // Default for desktop
    const [groupedCards, setGroupedCards] = useState<any[]>([]);
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
    
        const handleSearchChange = (newQuery: string) => {
            setQuery(newQuery);
        }



    const groupCards = (cards: any[], cardsPerRow: number) => {
        const grouped = [];
        for (let i = 0; i < cards.length; i += cardsPerRow) {
            grouped.push(cards.slice(i, i + cardsPerRow));
        }
        return grouped;
    };
    // const groupCards = (cards: any[], cardsPerRow: number) => {
    //     const grouped = [];
    //     for (let i = 0; i < cards.length; i += cardsPerRow) {
    //         grouped.push(cards.slice(i, i + cardsPerRow));
    //     }
    //     return grouped;
    // };

    useEffect(() => {
    // useEffect(() => {

        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setCardsPerRow(3); 
            } else {
                setCardsPerRow(6);
            }
        };
    //     const handleResize = () => {
    //         if (window.innerWidth <= 768) {
    //             setCardsPerRow(3); 
    //         } else {
    //             setCardsPerRow(6);
    //         }
    //     };

        window.addEventListener('resize', handleResize);
        handleResize(); 
    //     window.addEventListener('resize', handleResize);
    //     handleResize(); 


        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [cardsPerRow]);
    //     // setGroupedCards(groupCards(cards, cardsPerRow));

    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, [cardsPerRow]);
    const artistCards = [
        <ArtistCard artistImg={"artist"} artistName={"Travis Scott"} artistType={"Artist"} />,  
      ];
    
      const popularHits = [
        <MusicCard albumCover={"popHit"} author={"Juice WRLD"} songTitle={"Robbery"} />,
      ];
    
      
      
    return (
        <>

  <div className={styles.mainContent}>
      <Aside />
      <div className={`${styles.static} ${themeColor === 'dark' ? styles.darkStatic : ''}`}>
        <Header />
        <MusicWrapper cards={artistCards} name={""} />  
      </div>
    </div>
        </>
    );
}