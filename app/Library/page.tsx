"use client"
import React, { useState, useEffect } from "react";
import styles from './page.module.scss';
import AsideMenu, { getCookie } from "../Components/Aside/Aside";
import Search from "../Components/SearchComponent/Search";
import MusicCard from "../Components/MusicCard/Musiccard";
import ArtistCard from "../Components/ArtistCard/ArtistCard";

export default function Library() {
    const [query, setQuery] = useState<string>('');
    const [cardsPerRow, setCardsPerRow] = useState<number>(6); // Default for desktop
    const [groupedCards, setGroupedCards] = useState<any[]>([]);

    const handleSearchChange = (newQuery: string) => {
        setQuery(newQuery);
    };

    
    const cards = [
        <MusicCard albumCover={"popHit"} author={"Drake"} songTitle={"jondo"} />,
        <ArtistCard artistImg={"artist"} artistName={"Travis Scott"} artistType={"Artist"} />,
        <MusicCard albumCover={"popHit"} author={"Drake"} songTitle={"jondo"} />,
        <MusicCard albumCover={"popHit"} author={"Drake"} songTitle={"jondo"} />,
        <ArtistCard artistImg={"artist"} artistName={"Drake"} artistType={"Artist"} />,
        <MusicCard albumCover={"popHit"} author={"Drake"} songTitle={"jondo"} />,
        <MusicCard albumCover={"popHit"} author={"Drake"} songTitle={"jondo"} />,
        <MusicCard albumCover={"popHit"} author={"Drake"} songTitle={"jondo"} />,
        <ArtistCard artistImg={"artist"} artistName={"Drake"} artistType={"Artist"} />,
        <ArtistCard artistImg={"artist"} artistName={"Drake"} artistType={"Artist"} />,
        <ArtistCard artistImg={"artist"} artistName={"Drake"} artistType={"Artist"} />,
        <MusicCard albumCover={"popHit"} author={"Drake"} songTitle={"jondo"} />,
        <MusicCard albumCover={"popHit"} author={"Drake"} songTitle={"jondo"} />,
        <ArtistCard artistImg={"artist"} artistName={"Drake"} artistType={"Artist"} />,
        <ArtistCard artistImg={"artist"} artistName={"Drake"} artistType={"Artist"} />,
        <MusicCard albumCover={"popHit"} author={"Drake"} songTitle={"jondo"} />,
        <MusicCard albumCover={"popHit"} author={"Drake"} songTitle={"jondo"} />,

        
    ];

   
    const groupCards = (cards: any[], cardsPerRow: number) => {
        const grouped = [];
        for (let i = 0; i < cards.length; i += cardsPerRow) {
            grouped.push(cards.slice(i, i + cardsPerRow));
        }
        return grouped;
    };

    useEffect(() => {
        
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setCardsPerRow(3); 
            } else {
                setCardsPerRow(6);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); 

    
        setGroupedCards(groupCards(cards, cardsPerRow));

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [cardsPerRow]);

    return (
        <>
        <div className={styles.background}>
            <div className={styles.mainpage}>
                <div>
                    <div>
                        <div>
                            <Search onChange={handleSearchChange} />
                        </div>

                        <div className={styles.librarytext}>
                            <span>Your Library</span>
                        </div>

                        <div className={styles.mainContent}>
                            
                            {groupedCards.map((group, index) => (
                                <div key={index} className={styles.container}>
                                    {group.map((card: any, i: number) => (
                                        <div key={i} className={styles.cardWrapper}>
                                            {card}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <AsideMenu />
            </div>
        </div>
        </>
    );
}