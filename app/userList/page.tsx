"use client"
import search from 'antd/es/transfer/search';
import Aside, { getCookie } from '../Components/Aside/Aside';
import Icon from '../Components/Icon/Icon';
import styles from './userList.module.scss'
import { message } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import TopChart from '../Components/TopChart/TopChart';
import Cookies from "js-cookie";

export default function UserList() {
    const [themeColor, setThemeColor] = useState<string | null>(getCookie("theme") || null);
    const [artistName, setArtistName] = useState("");
    const [artistLastname, setArtistLastname] = useState("");
    const [artistMusicIds, setArtistMusicIds] = useState("");
    const [artistAlbumId, setArtistAlbumId] = useState("");
    const [artistBiography, setArtistBiography] = useState("");
    const [emails, setEmails] = useState("");
    const [albumTitle, setAlbumTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [switchChecked, setSwitchChecked] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [showAddArtist, setShowAddArtist] = useState(false);
    const [listArtist, setListArtist] = useState(true);
    const [getData, setGetData] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState<any[]>([]);

    useEffect(() => {
        const updateTheme = () => {
            const newTheme = getCookie("theme") || null; // Use null as fallback
            setThemeColor(newTheme);
        };

        updateTheme();
        const themeInterval = setInterval(updateTheme, 5000); // Adjust interval as needed
        return () => clearInterval(themeInterval);
    }, []);

    const popularCharts = [
        <TopChart image={"topChart"} songName={"Good Days"} artistName={"SZA"} rank={"1"} />,
    ];

    const suggest = () => {
        const userToken = localStorage.getItem("token");
        axios.post(
            "https://music-back-1s59.onrender.com/artist",
            {
                firstName: artistName,
                lastName: artistLastname,
                biography: artistBiography
            },
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }
        )
        .then((data) => {
            console.log(data);
            messageApi.open({
                type: 'success',
                content: 'წარმატებით შექიმნა!',
            });
            setTimeout(() => {
                setShowAddArtist(false);
                setListArtist(true);
            }, 2000);
        })
        .catch((error) => {
            messageApi.error({
                type: 'error',
                content: 'რატომ გავიხადე?',
            });
        });
    }

    const biographyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setArtistBiography(e.target.value);
    }

    const searchArtist = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        const userToken = Cookies.get("userToken");

        axios.get('https://music-back-1s59.onrender.com/users', {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        }).then((r) => {
            setGetData(r.data);
        });
    }, []);

    const click = () => {
        setShowAddArtist(true);
        setListArtist(false);
    }

    useEffect(() => {
        const userToken = localStorage.getItem("token");

        if (userToken && search) {
            axios.get(`https://music-back-1s59.onrender.com/search/artist?search=${search}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            })
            .then((response) => {
                setSearchData(response.data);
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    console.log('Unauthorized: Invalid token');
                } else {
                    console.log('Error:', error.message);
                }
            });
        }
    }, [search]);

    return (
        <>
            <div className={styles.mainContent}>
                <Aside />
                <div className={`${styles.static} ${themeColor === 'dark' ? styles.darkStatic : ''}`}>
                    <div className={styles.container}>
                        <div className={styles.headerAdmin}>
                            <p className={styles.HeaderTitle}>Users</p>
                        </div>
                        <div className={styles.contaienrGroup}>
                            <div className={styles.search}>
                                <div className={styles.icon}>
                                    <Icon name={"searchIcon"} isActive={false} onClick={function (): void {
                                        throw new Error("Function not implemented.");
                                    }} />
                                </div>
                                <input onChange={searchArtist} placeholder='Search' type="text" className={styles.artistSearch} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.listArtist}>
                        <div className={styles.list}>
                            <div className={styles.listInfo}>
                                <div className={styles.items}>
                                    <p>Name</p>
                                    <p>Email</p>
                                    <p>UserId</p>
                                    <p>Last login</p>
                                    <p>Status</p>
                                </div>
                            </div>

                            {
                                getData.filter((items) =>
                                    items.name.toLowerCase().includes(search.toLowerCase()) // Case-insensitive search
                                ).map((items, index) => (
                                    <div className={styles.ArtistInfo} key={index}>
                                        <div className={styles.items}>
                                            <p>{items.name}</p>
                                            <p>{items.email}</p>
                                            <p>{items.id}</p>
                                            <p>{items.lastLogin || "N/A"}</p> {/* Provide fallback for lastLogin */}
                                            <p className={styles.Active}>{'Active'}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
