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
    id: number; // Assuming ID is a number based on the expected type
    name: string;
    description: string;
    artistId: number; // Add artistId if you need to relate to the artist
    // Add other relevant properties here
    image: Image[];
}

export default function SearchPage() {
    const [themeColor, setThemeColor] = useState<string | null>(getCookie("theme") || null);
    const [search, setSearch] = useState('');
    const [data, setData] = useState<SearchData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [artistData, setArtistData] = useState<Artist[]>([]); // Specify the type here

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
            setArtistData(response.data); // Ensure the correct data is being set
        })
            .catch(() => {
                console.log('ratom gavixade?');
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
        const artist = artistData.find((a) => a.id === chart.artistId); // Ensure artistId is present
      
        // Check if chart.image exists and has a length before accessing the last image
        const imageUrl = chart.image 
          ? chart.image[chart.image.length - 1]?.url 
          : "/Image/topChart.png"; // Fallback to default image
          
          
      
        return (
          <TopChart
            image={imageUrl} // Use the checked image URL
            key={chart.id}
            songName={chart.name}
            artistName={artist ? artist.firstName : "Unknown Artist"} // Fallback to "Unknown Artist" if artist not found
            rank={chart.rank}
          />
        );
      });

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
                <RecentSearch name={data.name} musicId={data.id} id={idSearch} description={descriptionSearch} data={data} />
                <MusicWrapper cards={artistCards} name={"Top searched artists"} />
                <MusicWrapper cards={popularCharts} name={"Search Musics Charts"} />
            </div>
        </div>
    );
}
