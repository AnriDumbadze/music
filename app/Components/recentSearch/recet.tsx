"use client"
import { ST } from 'next/dist/shared/lib/utils'
import styles from './recent.module.scss'


export default function RecentSearch() {
    return(
        <>
        <div className={styles.Recent}>
            <div className={styles.RecentTitleGroup}>
                <h2 className={styles.TitleRecent}>Recents Searches</h2>
                <p className={styles.clearTitle}>Clear All</p>
            </div>
            <div className={styles.RecentItems}>
                <div className={styles.RecentItemsGroup}>
                    <div className={styles.flexGroup}>
                    <div className={styles.ImgRecent}></div>
                    <div className={styles.text}>
                         <p className={styles.name}>Robby</p>
                         <p className={styles.songName}>Juice world</p>
                    </div>
                    </div>
                    <div className={styles.iconGroup}>
                        <div className={styles.heart}></div>
                        <div className={styles.remove}></div>
                    </div>
                </div>
            </div>
            <div className={styles.RecentItems}>
                <div className={styles.RecentItemsGroup}>
                    <div className={styles.flexGroup}>
                    <div className={styles.ImgRecent}></div>
                    <div className={styles.text}>
                         <p className={styles.name}>Robby</p>
                         <p className={styles.songName}>Juice world</p>
                    </div>
                    </div>
                    <div className={styles.iconGroup}>
                        <div className={styles.heart}></div>
                        <div className={styles.remove}></div>
                    </div>
                </div>
            </div>
            <div className={styles.RecentItems}>
                <div className={styles.RecentItemsGroup}>
                    <div className={styles.flexGroup}>
                    <div className={styles.ImgRecent}></div>
                    <div className={styles.text}>
                         <p className={styles.name}>Robby</p>
                         <p className={styles.songName}>Juice world</p>
                    </div>
                    </div>
                    <div className={styles.iconGroup}>
                        <div className={styles.heart}></div>
                        <div className={styles.remove}></div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
