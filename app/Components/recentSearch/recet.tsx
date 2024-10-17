"use client"; // Add this line at the very top
import { useEffect, useState } from 'react';
import styles from './recent.module.scss';
import Icon from '../Icon/Icon';
import Cookies from "js-cookie";
import axios from 'axios';

interface RecentSearchData {
    id: number; // Assuming ID is a number
    name: string; // Name of the item
}

interface Props {
    data: RecentSearchData[]; // Accepts an array of RecentSearchData
    name: string;
    id?: number;
    description?: string;
    musicId: number;
}

export default function RecentSearch(props: Props) {
    const [activeStates, setActiveStates] = useState([false, false, false]);
    const [data, setData] = useState<RecentSearchData[]>([]); // Updated state type

    console.log(props.data);

    // Toggle the icon's active state and capture music info
    const handleIconClick = (music: RecentSearchData, index: number) => {
        setActiveStates((prev) =>
            prev.map((state, i) => (i === index ? !state : state))
        );

        const userToken = Cookies.get("userToken");

        // Make sure to send the clicked music's id and name in the POST request
        axios.post(
            "https://music-back-1s59.onrender.com/playlist",
            {
                name: music.name, // Use the clicked music's name
                description: 'ss',
                musicIds: [music.id], // Use the clicked music's ID
            },
            {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            }
        ).catch(() => {
            console.log('Error saving playlist');
        });

        console.log(music.id, music.name); // Log the clicked music's info
    };

    // Remove a recent item
    const handleRemove = (id: number) => {
        const userToken = Cookies.get("userToken");

        if (props.id === id && typeof window !== "undefined") {
            localStorage.removeItem("searchData");
        }

        axios.get('https://music-back-1s59.onrender.com/users/me', {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        }).then((r) => {
            if (Array.isArray(r.data.playlists)) {
                setData(r.data.playlists);
            } else {
                console.warn('Unexpected data structure:', r.data);
                setData([]);
            }
        }).catch(() => {
            console.log('Error fetching user data');
        });
    };

    return (
        <div className={styles.Recent}>
            <div className={styles.RecentTitleGroup}>
                <h2 className={styles.TitleRecent}>Recent Searches</h2>
                <p className={styles.clearTitle}>Clear All</p>
            </div>
            {props.data?.length > 0 && props.data.map((item, index) => (
                <div className={styles.RecentItems} key={item.id}>
                    <div className={styles.RecentItemsGroup}>
                        <div className={styles.flexGroup}>
                            <div className={styles.ImgRecent}></div>
                            <div className={styles.text}>
                                <p className={styles.name}>{item.name}</p>
                                <p className={styles.songName}>{item.id}</p>
                            </div>
                        </div>
                        <div className={styles.iconGroup}>
                            <Icon
                                name={"heart"}
                                onClick={() => handleIconClick(item, index)} // Pass the clicked music item and index
                                isActive={activeStates[index]}
                            />
                            <div
                                className={styles.remove}
                                onClick={() => handleRemove(item.id)}
                            >
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
