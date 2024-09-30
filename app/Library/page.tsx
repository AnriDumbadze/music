"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Aside, { getCookie } from "../Components/Aside/Aside";
import Icon from "../Components/Icon/Icon";
import styles from "./userList.module.scss";
import { message } from "antd";
import TopChart from "../Components/TopChart/TopChart";

export default function UserList() {
    const [themeColor, setThemeColor] = useState<string | null>(getCookie("theme") || null);
    const [artistName, setArtistName] = useState("");
    const [artistLastname, setArtistLastname] = useState("");
    const [artistBiography, setArtistBiography] = useState("");
    const [getData, setGetData] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [messageApi, contextHolder] = message.useMessage();
    const [showAddArtist, setShowAddArtist] = useState(false);
    const [listArtist, setListArtist] = useState(true);
    
    useEffect(() => {
        const updateTheme = () => {
            const newTheme = getCookie("theme");
            setThemeColor(newTheme || null); // Set to null if undefined
        };

        updateTheme(); // Initial theme check

        const themeInterval = setInterval(updateTheme, 5000); // Update every 5 seconds
        return () => clearInterval(themeInterval); // Clean up on unmount
    }, []);

    useEffect(() => {
        const userToken = Cookies.get("userToken");

        axios.get('https://music-back-1s59.onrender.com/users', {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        }).then((response) => {
            setGetData(response.data);
        }).catch((error) => {
            console.error("Error fetching users:", error);
        });
    }, []);

    const suggest = () => {
        const userToken = localStorage.getItem("token");
        axios.post(
            "https://music-back-1s59.onrender.com/artist",
            {
                firstName: artistName,
                lastName: artistLastname,
                biography: artistBiography,
            },
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }
        )
        .then(() => {
            messageApi.open({
                type: 'success',
                content: 'Artist added successfully!',
            });
            setShowAddArtist(false);
            setListArtist(true);
        })
        .catch(() => {
            messageApi.error({
                type: 'error',
                content: 'Error adding artist.',
            });
        });
    };

    const searchArtist = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <>
            {contextHolder}
            <div className={styles.mainContent}>
                <Aside />
                <div className={`${styles.static} ${themeColor === 'dark' ? styles.darkStatic : ''}`}>
                    <div className={styles.container}>
                        <div className={styles.headerAdmin}>
                            <p className={styles.HeaderTitle}>Users</p>
                        </div>
                        <div className={styles.search}>
                            <div className={styles.icon}>
                                <Icon name={"searchIcon"} isActive={false} />
                            </div>
                            <input
                                onChange={searchArtist}
                                placeholder='Search'
                                type="text"
                                className={styles.artistSearch}
                            />
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
                                {getData.filter((item) =>
                                    item.name.toLowerCase().includes(search.toLowerCase()) // Case-insensitive search
                                ).map((item) => (
                                    <div className={styles.ArtistInfo} key={item.id}>
                                        <div className={styles.items}>
                                            <p>{item.name}</p>
                                            <p>{item.email}</p>
                                            <p>{item.id}</p>
                                            <p>{item.lastLogin}</p>
                                            <p className={styles.Active}>{'Active'}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
