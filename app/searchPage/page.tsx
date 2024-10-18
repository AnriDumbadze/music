"use client";

import Header from "../Components/Header/Header";
import Aside, { getCookie } from '../Components/Aside/Aside';
import MusicWrapper from '../Components/MusicWrapper/MusicWrapper';
import styles from './searchPage.module.scss';
import { useState, useEffect } from 'react';
import ArtistCard from '../Components/ArtistCard/ArtistCard';
import TopChart from '../Components/TopChart/TopChart';
import RecentSearch from "../Components/recentSearch/recet"; // Make sure the path is correct
import axios from "axios";

interface Image {
    id: number;
    fileName: string;
    bucketName: string;
    key: string;
    url: string;
}

interface Artist {
    id: number;
    firstName: string;
    lastName: string;
    biography: string;
    image: Image[];
}

interface SearchData {
    artistName: string;
    rank: string;
    id: number;
    name: string;
    description: string;
    artistId: number;
    image: Image[];
}

export default function SearchPage() {
    const [themeColor, setThemeColor] = useState<string | null>(getCookie("theme") || null);
    const [search, setSearch] = useState('');
    
    const [data, setData] = useState<SearchData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [artistData, setArtistData] = useState<Artist[]>([]); 

    useEffect(() => {
        const updateTheme = () => {
            const newTheme = getCookie("theme") || null;
            setThemeColor(newTheme);
        };

        updateTheme();

        const themeInterval = setInterval(updateTheme, 0);

        return () => clearInterval(themeInterval);
    }, []);

    useEffect(() => {
        const userToken = getCookie("userToken");

        if (userToken && search) {
            setLoading(true);
            setError(null);

            axios.get(`https://music-back-1s59.onrender.com/search/music?search=${search}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            })
                .then((response) => {
                    setData(response.data);
                    localStorage.setItem("searchData", JSON.stringify(response.data));
                })
                .catch((error) => {
                    if (error.response && error.response.status === 401) {
                        setError('Unauthorized: Invalid token');
                    } else {
                        setError('Error: ' + error.message);
                    }
                })
                .finally(() => {
                    setLoading(false); // Set loading to false regardless of success or failure
                });
        }
    }, [search]);

    useEffect(() => {
        const userToken = getCookie("userToken");
        axios.get("https://music-back-1s59.onrender.com/artist", {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        }).then((response) => {
            setArtistData(response.data); 
        })
        .catch(() => {
            console.log('Error fetching artist data');
        });
    }, []);

    const artistCards = artistData.map((artist) => (
        <ArtistCard
            key={artist.id}
            artistImg={artist.image[artist.image.length - 1]?.url || "/Images/artist.png"}
            artistName={artist.firstName}
            artistType={"Artist"}
            biography={artist.biography}
        />
    ));



    const popularCharts = data.map((chart) => {
        const artist = artistData.find((a) => a.id === chart.artistId); 
        const imageUrl = chart.image ? chart.image[chart.image.length - 1]?.url : "/Image/topChart.png";

        return (
          <TopChart
            image={imageUrl}
            key={chart.id}
            songName={chart.name}
            artistName={artist ? artist.firstName : "Unknown Artist"}
            rank={chart.rank}
          />
        );
    });

    const firstResult = data.length > 0 ? data[0] : null;

    return (
        <div className={styles.mainContent}>
            <div className={styles.asideContainer}>
                <Aside />
            </div>
            <div className={`${styles.static} ${themeColor === 'dark' ? styles.darkStatic : ''}`}>
                <Header onchange={(e) => setSearch(e.target.value)} />
                <div>
                    {firstResult && (

                            <RecentSearch 
                                name={firstResult.name} 
                                musicId={firstResult.id} 
                                id={firstResult.id} 
                                description={firstResult.description} 
                                data={[firstResult]} 
                                image={firstResult.image[firstResult.image.length - 1]} 
                            />

                    )}
                </div>
                <MusicWrapper cards={artistCards} name={"Top searched artists"} />
                <MusicWrapper cards={popularCharts} name={"Search Musics Charts"} />
            </div>
        </div>
    );
}
