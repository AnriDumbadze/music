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
import Cookies from "js-cookie";

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
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState<string | null>(null); 
    const [artistData, setArtistData] = useState([]);

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
           
        }
    }, [search]);

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
   
    const artistCards = artistData.map((artist) => (
        <ArtistCard 
            key={artist.id} 
            artistImg={"artist"} 
            artistName={artist.firstName} 
            artistType={"Artist"} 
        />
    ));

    const popularCharts = data.map((chart) => (
        <TopChart 
            key={chart.id} 
            image={"topChart"} 
            songName={chart.name} 
            artistName={artistData.firstName} 
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
                <RecentSearch  id={idSearch} description={descriptionSearch} data={data} />
                <MusicWrapper cards={artistCards} name={"Top serched artists"} />
            </div>
        </div>
    );
}

