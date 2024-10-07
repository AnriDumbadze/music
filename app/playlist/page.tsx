"use client"

import Header from '../Components/Header/Header'
import Aside from '../Components/Aside/Aside'
import MusicWrapper from '../Components/MusicWrapper/MusicWrapper'
import RecentSearch from '../Components/recentSearch/recet'
import styles from './playlist.module.scss'
import Image from "next/image";
import Icon from '../Components/Icon/Icon'
import { ST } from 'next/dist/shared/lib/utils'
export default function Playlist() {
    return (
        <>
            <div className={styles.mainContent}>
                <Aside />
                <div className={`${styles.darkStatic}`}>
                    <Header />
                    <div className={styles.backgroundPlaylist}>
                        <div className={styles.background}>
                            <div className={styles.playlistTitle}>
                                <img src="./images/playlist.png" alt="" />
                                <div className={styles.text}>
                                    <h1 className={styles.title}>Playlist #1</h1>
                                    <p className={styles.description}>4 Artist
                                        ·
                                        15 Songs
                                        ·
                                        52 Minutes And 12 Seconds
                                        Playlist Creator</p>
                                    <div className={styles.iconGroup}>
                                        <Icon width='49' height='49' name={'playlistpause'} />
                                        <Icon width='32' height='32' name={'playlistHeart'} />
                                        <Icon width='32' height='32' name={'playlistshuffle'} />
                                        <Icon width='32' height='32' name={'options'} />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.lists}>
                                <div className={styles.line}></div>
                                <div className={styles.listTitle}>  
                                    <p className={styles.titleTextP}>#</p>
                                    <p className={styles.titleTextP}>Music</p>
                                    <p className={styles.titleTextP}>Album</p>
                                    <p className={styles.titleTextP}>Time Added</p>
                                    <button className={styles.btn1}>Mussic</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}