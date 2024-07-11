
import React from "react";
import styles from "./MusicCard.module.scss";
import Icon from "../Icon/Icon";


interface MusicCardProps {
    albumCover: string;
    author: string;
    songTitle: string;
}

function MusicCard(props: MusicCardProps)  {
    const { albumCover, author, songTitle } = props;

    return(
        <div className={styles.musicCard}>  
            <div className={styles.musicPhoto}>
            <Icon src ={props.albumCover} width="168px"/>
            <div className={styles.musicInfo}>
                <p className={styles.songTitle}>{songTitle}</p>
                <p className={styles.author}>{author}</p>
                </div>
            </div>
        </div>
    )
}

export default MusicCard