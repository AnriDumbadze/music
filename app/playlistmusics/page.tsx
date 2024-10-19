"use client";
import { useEffect, useState } from "react";
import Aside from "../Components/Aside/Aside";
import Icon from "../Components/Icon/Icon";
import BurgerMenuMobile from "../Components/burgermenumobile/burgetmobile";
import styles from './playlistmusics.module.scss';
import Cookies from "js-cookie";
import axios from "axios";
import MusicCard from "../Components/MusicCard/Musiccard";

export default function PlaylistPage() {
    const [themeColor] = useState<string | null>(Cookies.get("theme") || null);
    const [playlistMusics, setPlaylistMusics] = useState<any[]>([]);
    const musics = localStorage.getItem("musics");
    const parsedMusics: any[] = musics ? JSON.parse(musics) : [];
    const userToken = Cookies.get("userToken");

    useEffect(() => {
        const fetchMusics = async () => {
            try {
                const fetchedMusics = await Promise.all(
                    parsedMusics.map(async (musicId) => {
                        const response = await axios.get(`https://music-back-1s59.onrender.com/music/${musicId}`, {
                            headers: {
                                Authorization: `Bearer ${userToken}`,
                            },
                        });
                        return response.data.musics;
                    })
                );
                setPlaylistMusics(fetchedMusics);
            } catch (err) {
                console.error("Error fetching music: ", err);
                if (typeof window !== 'undefined') {
                    window.alert('Please try again');
                }
            }
        };

        if (parsedMusics.length > 0) {
            fetchMusics();
        }
    }, [parsedMusics, userToken]);

    const handleClick = (item: any) => {


        localStorage.setItem("playlistMusic", JSON.stringify(item));
        if (typeof window != 'undefined') {
            window.location.replace('/')
        }
    }

    return (
        <>
            <div className={styles.burger}>
                <Icon width="72px" name="FAZER" isActive={false} />
                <BurgerMenuMobile />
            </div>
            <div className={styles.mainAside}>
                <Aside />
                <div className={styles.mainContent}>
                    <h1>Playlist</h1>
                    {playlistMusics.map((item) => (
                        <div key={item.id} onClick={() => handleClick(item)}>  // Key is now here
                            <MusicCard
                                url={item.image[item.image.length - 1]?.url || "/Images/popHit.png"}
                                author={item.artist.firstName}
                                songTitle={item.name}
                                id={item.id}
                                playlists={item.playlist}
                            />
                        </div>
                    ))}

                </div>
            </div>
        </>
    );
}
