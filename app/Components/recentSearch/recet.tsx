"use client"; // Add this line at the very top
import { useEffect, useState } from 'react';
import styles from './recent.module.scss';
import Icon from '../Icon/Icon';
import Cookies from "js-cookie";
import axios from 'axios';
import { Image } from 'antd';
import { getCookie } from '../Aside/Aside';

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
    image?: Image;
}

interface Image {
    id: number;
    fileName: string;
    bucketName: string;
    key: string;
    url: string;
}

export default function RecentSearch(props: Props) {
    const [activeStates, setActiveStates] = useState([false, false, false]);
    const [data, setData] = useState<RecentSearchData[]>([]); // Updated state type

    const handleClick = async (id: number) => {
        const userToken = getCookie("userToken");

        axios.get('https://music-back-1s59.onrender.com/music/' + id, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })
        .then((response) => {
            localStorage.setItem("Searched_Music", JSON.stringify(response.data));
            if(typeof window !== 'undefined') {
                window.location.replace('/');
            }
        })
        .catch((err: any) => {
            if (typeof window !== 'undefined') {
                window.alert(err);
            }
        });
    };

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
                        <div className={styles.flexGroup} onClick={() => handleClick(item.id)}>
                            <div>
                                {props.image ? ( // Check if props.image is defined and has elements
                                    <Image
                                        src={props.image.url}
                                        width={72}
                                        height={72}
                                        alt={"photo"}
                                    />
                                ) : (
                                    <Image
                                        src="/Images/default.png" // Fallback image if props.image is undefined or empty
                                        width={72}
                                        height={72}
                                        alt="Default photo"
                                    />
                                )}
                            </div>

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
