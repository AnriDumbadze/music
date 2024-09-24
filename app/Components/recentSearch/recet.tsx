"use client"
import { useEffect, useState } from 'react';
import styles from './recent.module.scss';
import Icon from '../Icon/Icon';
import Cookies from "js-cookie";
import axios from 'axios';

export default function RecentSearch() {
    // State for active icons
    const [activeStates, setActiveStates] = useState([false, false, false]);
    const [data, setData] = useState([])
    // State for recent items
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
        axios.delete(`https://music-back-1s59.onrender.com/music/${id}`, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        })
        .then(() => {
            // Remove the item from the local state only if the API request is successful
            setRecentItems((prevItems) => prevItems.filter(item => item.id !== id));
        })
        .catch((error) => {
            console.error('Error deleting item:', error);
        });
    };
    

    useEffect(() => {
        const userToken = Cookies.get("userToken");

        axios.get('https://music-back-1s59.onrender.com/artist', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }).then((r) => {
          setData(r.data)
        })
        .catch(() => {
            console.log('sdasdasd');
            
        })
    },[])

    return (
        <div className={styles.Recent}>
            <div className={styles.RecentTitleGroup}>
                <h2 className={styles.TitleRecent}>Recent Searches</h2>
                <p className={styles.clearTitle}>Clear All</p>
            </div>
            {recentItems.length === 0 ? (
                <p className={styles.noItems}>No recent searches</p>
            ) : (
                data.map((item, index) => (
                    <div key={item.id} className={styles.RecentItems}>
                        <div className={styles.RecentItemsGroup}>
                            <div className={styles.flexGroup}>
                                <div className={styles.ImgRecent}></div>
                                <div className={styles.text}>
                                    <p className={styles.name}>{item.firstName}</p>
                                    <p className={styles.songName}>{item.biography}</p>
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
            )}
        </div>
    );
}
