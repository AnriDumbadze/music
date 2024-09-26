"use client"; // Add this line at the very top

import { useEffect, useState } from 'react';
import styles from './recent.module.scss';
import Icon from '../Icon/Icon';
import Cookies from "js-cookie";
import axios from 'axios';

export default function RecentSearch() {
    // State for active icons
    const [activeStates, setActiveStates] = useState([false, false, false]);
    const [data, setData] = useState<[]>([]);
    
    // State for recent items (if needed)
    const [recentItems, setRecentItems] = useState([
        { id: 1, name: "Robby", songName: "Juice world" },
        { id: 2, name: "Robby", songName: "Juice world" },
        { id: 3, name: "Robby", songName: "Juice world" },
    ]);

    // Toggle the icon's active state
    const handleIconClick = (index) => {
        setActiveStates((prev) =>
            prev.map((state, i) => (i === index ? !state : state))
        );
    };

    // Remove a recent item
    const handleRemove = (id) => {
        const userToken = Cookies.get("userToken");

        // Send delete request to API with the specific ID
        axios.delete(`https://music-back-1s59.onrender.com/playlist/${id}`, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        })
        .then(() => {
            setRecentItems((prevItems) => prevItems.filter(item => item.id !== id));
        })
        .catch((error) => {
            console.error('Error deleting item:', error);
        });
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
        })
        .catch(() => {
            console.log('Error fetching user data');
        });
    };

    useEffect(() => {
        const userToken = Cookies.get("userToken");

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
        })
        .catch(() => {
            console.log('Error fetching user data');
        });
    }, []);

   

    return (
        <div className={styles.Recent}>
            <div className={styles.RecentTitleGroup}>
                <h2 className={styles.TitleRecent}>Recent Searches</h2>
                <p className={styles.clearTitle}>Clear All</p>
            </div>
            {
                data.map((item, index) => (
                    <div     className={styles.RecentItems}>
                        <div className={styles.RecentItemsGroup}>
                            <div className={styles.flexGroup}>
                                <div className={styles.ImgRecent}></div>
                                <div className={styles.text}>
                                    <p className={styles.name}>{'dasdas'}</p>
                                    <p className={styles.songName}>{item.id}</p>
                                </div>
                            </div>
                            <div className={styles.iconGroup}>
                                <Icon
                                    name={"heart"}
                                    onClick={() => handleIconClick(index)}
                                    isActive={activeStates[index]}
                                />
                                <div
                                    className={styles.remove}
                                    onClick={() => handleRemove(item.id)}
                                >
                                    ✖
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
