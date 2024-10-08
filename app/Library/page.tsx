"use client";
import React, { useState } from "react";
import styles from './page.module.scss';
import AsideMenu, { getCookie } from "../Components/Aside/Aside";
import LibraryItem from "../Components/LibraryItem/LibraryItem";


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
