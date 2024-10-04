"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';
import AsideMenu, { getCookie } from '../Components/Aside/Aside';
import styles from './artist.module.scss';
import ArtistCard from '../Components/ArtistCard/ArtistCard';
import Aside from '../Components/Aside/Aside';
import Icon from '../Components/Icon/Icon';
import BurgerMenuMobile from '../Components/burgermenumobile/burgetmobile';
import Image from "next/image"; 

export default function ArtistList() {
    const [artistData, setArtistData] = useState<any[]>([]);
    const [artistIdData, setArtistIdData] = useState<any>(null); // Holds clicked artist's data
    const [showId, setShowId] = useState(false); // To control whether artist details are shown
    const [selectedArtistImage, setSelectedArtistImage] = useState(''); // Selected artist image

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

    // Function to handle click and get artist ID
    const handleArtistClick = (id: number, imageUrl: string) => {
        const userToken = getCookie("userToken");

        axios
            .get(`https://music-back-1s59.onrender.com/artist/${id}`, {
                headers: { Authorization: `Bearer ${userToken}` },
            })
            .then((response) => {
                setArtistIdData(response.data); // Set the clicked artist data
                setSelectedArtistImage(imageUrl); // Set the clicked artist's main image
                setShowId(true); // Show the artist details
            })
            .catch((error) => {
                console.error("Failed to fetch artist details:", error);
            });
    };

    return (
        <>
            <div className={styles.mainContent}>
                <div className={styles.burger}>
                    <Icon width="72px" name="FAZER" isActive={false} onClick={() => { }} />
                    <BurgerMenuMobile />
                </div>
                <div className={styles.mainAside}>
                    <Aside />
                </div>
                <div className={`${styles.static}`}>
                    <div className={styles.artist}>
                        {/* Artist Cards */}
                        {!showId && (
                            <div className={styles.artistContainer}>
                                {artistData.map((item, index) => (
                                    <ArtistCard
                                        key={index}
                                        onClick={() => handleArtistClick(item.id, item.image?.[0]?.url || '')}
                                        artistImg={item.image?.[0]?.url || ''} // Fallback to an empty string if no image
                                        artistName={item.firstName}
                                        artistType={''}
                                        biography={''}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {showId && artistIdData && (
                        <div className={styles.artistMusic}>
                            <div className={styles.artists}>
                                <Image
                                    src={selectedArtistImage || ''} // Use selected image URL
                                    alt={'Artist image'}
                                    width={150}
                                    height={150}
                                    className={styles.imgBackground}
                                />
                                <p className={styles.nameMusic}>{artistIdData.firstName}</p>
                            </div>

                            {/* Display artist's additional images and music */}
                            <div className={styles.musicCard}>
                                <div className={styles.musicInfo}>
                                    {artistIdData.image && artistIdData.image.map((img: any, index: number) => (
                                        <div className={styles.info} key={index}>
                                            <Image
                                                src={img.url} // Loop through and display all images
                                                alt={'Artist music image'}
                                                width={150}
                                                height={150}
                                                className={styles.imgAll}
                                            />
                                            {Array.isArray(artistIdData.musics) && artistIdData.musics.map((musicItem: any, musicIndex: number) => (
                                               <>
                                               <div className={styles.text1}>
                                               <p className={styles.text1P} key={musicIndex}>{musicItem.name}</p> 
                                                <span className={styles.text1SP}>{musicItem.id}</span>
                                               </div>
                                               </>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.secondAside}>
                    <Aside />
                </div>
            </div>
        </>
    );
}
