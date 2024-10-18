"use client";

import React, { useEffect, useState } from "react";
import styles from "./album.module.scss";
import AsideMenu from "../Components/Aside/Aside";
import Header from "../Components/Header/Header";
import Icon from "../Components/Icon/Icon";
import axios from "axios";

export default function Library() {
  const [active, setActive] = useState(false);

  const handleIconClick = () => {
    setActive(!active);
  };

  const [active1, setActive1] = useState(false);

  const handleIconClick1 = () => {
    setActive1(!active1);
  };

  useEffect(() =>{
    axios.get("https://music-back-1s59.onrender.com/music").then((res) => {
      console.log(res.data);
    }).catch(() => {
      console.log('s');
    })
  })

  return (
    <>
      <main className={styles.main}>
        <AsideMenu />
        <div className={styles.maindiv}>
          <Header />
          <img
            src="/images/image 19long.png"
            alt="Album cover"
            className={styles.image1}
          />
          <div className={styles.descdiv}>
            <img
              src="/images/image 19.png"
              alt="Album photo"
              className={styles.image2}
            />
            <div className={styles.desctext}>
              <h1 className={styles.desctext1}>Born To Die</h1>
              <p className={styles.desctext2}>Lana Del Rey</p>
              <p className={styles.desctext2}>15 Songs · 1 Hour And 24 Minutes</p>
              <div className={styles.playerdiv}>
                <Icon
                  width="32"
                  height="32"
                  name={"heart"}
                  onClick={handleIconClick}
                  isActive={active}
                />
                <Icon width="49" height="49" name={"playlistpause"} />
                <Icon width="32" height="32" name={"shuffle"} />
              </div>
            </div>
          </div>
          <div className={styles.infodiv}>
            <p className={styles.infotext}>#</p>
            <p className={styles.infotext}>Music</p>
            <p className={styles.infotext}>Album</p>
            <p className={styles.infotext}>Time Added</p>
          </div>
          <div className={styles.strokediv}></div>
          <div className={styles.musicdiv}>
            <p className={styles.musictext1}>1</p>
            <div className={styles.flexdiv}>
              <img
                src="/images/image 18.png"
                alt="Music photo"
                className={styles.image3}
              />
              <div className={styles.musicdiv2}>
                <p className={styles.musictext2}>Summertime Sadness</p>
                <p className={styles.musictext1}>Lana Del Rey</p>
              </div>
            </div>
            <p className={styles.musictext1}>Born To Die</p>
            <p className={styles.musictext1}>3 Days Ago</p>
            <p className={styles.musictext1}>1:14</p>
            <Icon
              width="24"
              height="24"
              name={"heart"}
              onClick={handleIconClick1}
              isActive={active1}
            />
            <Icon width="24" height="24" name={"dots"} />
          </div>
        </div>
      </main>
    </>
  );
}
