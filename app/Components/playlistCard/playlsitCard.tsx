"use client"
import { useEffect, useState } from 'react'
import styles from './playlistCard.module.scss'
import axios from 'axios'
import { getCookie } from '../Aside/Aside';
import Icon from '../Icon/Icon';

export default function PlaylistCard() {
    const [getData, setGetData] = useState<any[]>([]); // Expect an array, adjust type if necessary

    useEffect(() => {
        const userToken = getCookie("userToken");
        console.log('User Token:', userToken); // Check if token is retrieved

        axios.get("https://music-back-1s59.onrender.com/users/me", {
            headers: { Authorization: `Bearer ${userToken}` },
        })
            .then((response) => {
                console.log('API Response:', response.data); // Log the response data to confirm structure

                // Check if the response data is an array or needs extraction
                if (Array.isArray(response.data)) {
                    setGetData(response.data); // If it's already an array
                } else if (response.data && response.data.playlists) {
                    setGetData(response.data.playlists); // Adjust according to actual data structure
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.list}>
                <div className={styles.listItem}>
                    {getData && Array.isArray(getData) &&
                        getData.map((item) => (
                            <>
                                <div className={styles.text}>
                                    <p className={styles.textItem}>{item.id}</p>
                                    <p className={styles.title} key={item.id}>{item.name}</p>
                                    <p  className={styles.textItem}>Born Die</p>
                                    <p  className={styles.textItem}>3 days ago</p>
                                    <div className={styles.group}>
                                        <p  className={styles.textItem}>1:14</p>
                                        <Icon width='24' height='24' name={'playlistHeart'} />
                                        <Icon width='24' height='24' name={'playlistshuffle'} />

                                    </div>
                                </div>
                            </>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
