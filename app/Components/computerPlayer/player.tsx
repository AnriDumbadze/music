"use client"
import { useEffect, useState } from 'react';
import styles from './player.module.scss'
import { Slider, Switch } from 'antd';
import { log } from 'winston';
import { Value } from 'sass';
export default function Player() {
    const [disabled, setDisabled] = useState(false);
    const [text, setText1] = useState(0)
    const [text1, setText2] = useState(50)

    const change1 = (value:number) => {
        setText1(value)
        localStorage.setItem("music", value.toString()); 
    }

    const change2 = (value:number) => {
        setText2(value)
        localStorage.setItem("voice", value.toString()); 
    }
    useEffect(() => {
        const savedMusicValue = localStorage.getItem("music");
        const savedMusicValue1 = localStorage.getItem("voice");
        if (savedMusicValue !== null || savedMusicValue1 !== null) {
          setText1(Number(savedMusicValue));
          setText2(Number(savedMusicValue1)); 
        }
      }, []); 

    return (
        <>
            <div className={styles.computerPlayer}>
                <div className={styles.Player}>
                    <div className={styles.container}>
                        <div className={styles.textConatiner}>
                            <div className={styles.img}></div>
                            <div className={styles.textGrid}>
                                <h3 className={styles.Text}>Sour!</h3>
                                <p className={styles.Text2}>Olivia Rodrigo</p>
                            </div>
                            <div className={styles.iconContainer}>
                                <div className={styles.heart}></div>
                                <div className={styles.audio}></div>
                                <Slider onChange={change1} className={styles.inputRadio}  value={text} disabled={disabled} />
                                <div className={styles.voiceControl}>
                                    <div className={styles.voice}></div>
                                    <Slider onChange={change2}  className={styles.inputRadio2} value={text1} disabled={disabled} />
                                </div>
                                <div className={styles.iconContainer2}>
                                    <div className={styles.refresh}></div>
                                    <div className={styles.shuffle}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}