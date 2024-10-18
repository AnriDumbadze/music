"use client";
import React, { useEffect, useState } from "react";
import styles from './page.module.scss';
import AsideMenu, { getCookie } from "../Components/Aside/Aside";
import LibraryItem from "../Components/LibraryItem/LibraryItem";
import axios from "axios";
import Cookies from "js-cookie";
interface Artist {
    id: number;
    firstName: string;
    lastName: string;
    biography: string;
}

interface Image {
    id: number;
    fileName: string;
    bucketName: string;
    key: string;
    url: string;
}

interface Musics {
    id: number;
    name: string;
    image: Image[];
    artist: Artist;
}

interface Playlist {
    id: number;
    name: string;
    description: string;
    musics: Musics[];
}

export default function Library() {
    const [query, setQuery] = useState<string>('');
    const [themeColor, setThemeColor] = useState<string | null>(getCookie("theme") ?? null); // Handle undefined case
    const [data, setData] = useState<Playlist | undefined>(undefined);

    const handleSearchChange = (newQuery: string) => {
        setQuery(newQuery);
    };

    useEffect(() => {
        const userToken = Cookies.get("userToken");
        axios.get('https://music-back-1s59.onrender.com/playlist/me',{
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        })
            .then((response) => setData(response.data))
            .catch((err) => console.error("Failed to fetch playlist data:", err));
    }, []);

    return (
        <>
            <div className={styles.mainpage}>
                <div className={styles.background}>
                    <div className={styles.search}>
                        {/* Add search input if needed */}
                    </div>
                    <div className={styles.librarytext}>
                        <span>Your Library</span>
                    </div>
                    <div className={styles.mainContent}>
                        {data ? (
                            data.musics.map((musics) => (
                                <LibraryItem
                                    key={musics.id}
                                    title={musics.name}
                                    songQuantity={musics.artist.firstName + " " + musics.artist.lastName}
                                    imageUrl={musics.image.length > 0 
                                        ? musics.image[musics.image.length - 1].url 
                                        : "https://musicappbacket.s3.eu-north-1.amazonaws.com/271247016_1261196094379214_756297623613666142_n?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUQ4L24VKHGIC7XGP%2F20241002%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20241002T091938Z&X-Amz-Expires=900&X-Amz-Signature=99c8ba641b4d4a48c583eb18d1e9237fbb6225cdd70077f7609978a8c9c3e65b&X-Amz-SignedHeaders=host"}
                                />
                            ))
                        ) : (
                            <p>Loading...</p>
                        )}
                        
                    </div>
                </div>
                <AsideMenu />
            </div>
        </>
    );
}
