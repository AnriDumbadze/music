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

interface SearchData {
    artistName: string;
    rank: string;
    id: number; // Assuming ID is a number based on the expected type
    name: string;
    description: string;
    // Add other relevant properties here
}

export default function SearchPage() {
    const [themeColor, setThemeColor] = useState<string | null>(getCookie("theme") || null);
    const [search, setSearch] = useState('');
    const [data, setData] = useState<SearchData[]>([]);
    const [loading, setLoading] = useState(false); // New loading state
    const [error, setError] = useState<string | null>(null); // Error state

    useEffect(() => {
        const updateTheme = () => {
            const newTheme = getCookie("theme") || null; // Use null as fallback
            setThemeColor(newTheme);
        };

        updateTheme();

        const themeInterval = setInterval(updateTheme, 5000);

        return () => clearInterval(themeInterval); 
    }, []);

    // Fetch data based on search term
    useEffect(() => {
        const userToken = localStorage.getItem("token");
        
        if (userToken && search) {
            setLoading(true); // Set loading to true before fetching
            setError(null); // Reset error state
            
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
            .finally(() => setLoading(false)); // Set loading to false after fetch completes
        }
    }, [search]);

    const artistCards = data.map((artist) => (
        <ArtistCard 
            key={artist.id} 
            artistImg={"artist"} 
            artistName={artist.name} 
            artistType={"Artist"} 
        />
    ));

    const popularCharts = data.map((chart) => (
        <TopChart 
            key={chart.id} 
            image={"topChart"} 
            songName={chart.name} 
            artistName={chart.artistName} 
            rank={chart.rank} 
        />
    ));

    const onchange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const firstResultName = data.length > 0 ? data[0].name : 'No results found';
    const idSearch = data.length > 0 ? data[0].id : undefined; // Change to undefined if no ID
    const descriptionSearch = data.length > 0 ? data[0].description : '';

    return (
        <div className={styles.mainContent}>
            <Aside />
            <div className={`${styles.static} ${themeColor === 'dark' ? styles.darkStatic : ''}`}>
                <Header onchange={onchange1} />
                {loading && <p>Loading...</p>} {/* Loading indicator */}
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Error message */}
                <RecentSearch name={firstResultName} id={idSearch} description={descriptionSearch} data={data} />
                <MusicWrapper cards={popularCharts} name={"Popular Charts"} />
                <MusicWrapper cards={artistCards} name={"Artists"} />
            </div>
        </div>
    );
}
