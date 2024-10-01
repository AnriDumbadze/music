"use client";
import React, { useState } from "react";
import styles from './page.module.scss';
import AsideMenu, { getCookie } from "../Components/Aside/Aside";
import Search from "../Components/SearchComponent/Search"; 
import LibraryItem from "../Components/LibraryItem/LibraryItem";
import MusicCard from "../Components/MusicCard/Musiccard";
import ArtistCard from "../Components/ArtistCard/ArtistCard";
import MusicWrapper from "../Components/MusicWrapper/MusicWrapper";

export default function Library() {
    const [query, setQuery] = useState<string>('');
    const [themeColor, setThemeColor] = useState<string | null>(getCookie("theme") ?? null); // Handle undefined case

    const handleSearchChange = (newQuery: string) => {
        setQuery(newQuery);
    };

    return (
        <>
            <div className={styles.mainpage}>
                <div className={styles.background}>
                    <div className={styles.search}>
                        <Search onChange={handleSearchChange} />
                    </div>
                    <div className={styles.librarytext}>
                        <span>Your Library</span>
                    </div>
                    <div className={styles.mainContent}>
                        <LibraryItem title={"Travis Scott"} songQuantity={"Artist"} id={0} />
                        <LibraryItem title={"Travis Scott"} songQuantity={"Artist"} id={0} />
                        <LibraryItem title={"Travis Scott"} songQuantity={"Artist"} id={0} />
                        <LibraryItem title={"Travis Scott"} songQuantity={"Artist"} id={0} />
                        <LibraryItem title={"Travis Scott"} songQuantity={"Artist"} id={13} />
                        <LibraryItem title={"Travis Scott"} songQuantity={"Artist"} id={0} />
                        <LibraryItem title={"Travis Scott"} songQuantity={"Artist"} id={0} />
                        <LibraryItem title={"Travis Scott"} songQuantity={"Artist"} id={0} />
                        <LibraryItem title={"Travis Scott"} songQuantity={"Artist"} id={0} />
                        <LibraryItem title={"Travis Scott"} songQuantity={"Artist"} id={0} />
                    </div>
                </div>
                <AsideMenu />
            </div>
        </>
    );
}
