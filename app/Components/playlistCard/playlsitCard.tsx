"use client"
import { useEffect, useState } from 'react'
import styles from './playlistCard.module.scss'

export default function PlaylistCard() {
    const [getData, setGetData] = useState([])

    useEffect(() => {},[])
    return(
        <>
        <div className={styles.container}>
            <div className={styles.list}>
                <div className={styles.listItem}>
                    
                </div>
            </div>
        </div>
        </>
    )
}