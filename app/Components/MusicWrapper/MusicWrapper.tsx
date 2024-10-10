"use client";
import { useState, useEffect } from "react";
import ArtistCard from "../ArtistCard/ArtistCard";
import { getCookie } from "../Aside/Aside";
import styles from "./MusicWrapper.module.scss";

type Props = {
  cards: JSX.Element[];
  name: string;
};

const MusicWrapper = (props: Props) => {
  

  return (
    <div className={styles.wrapper} >
      <h1 className={styles.title}>{props.name}</h1>
      <div className={styles.wrapperContainer}>
        <div className={styles.content}>
          {props.cards.map((card, index) => (
            <div key={index} className={styles.card}>
              {card}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicWrapper;
