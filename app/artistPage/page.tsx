"use client"; // Added the use client directive at the top

import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./artist.module.scss";
import ArtistCard from "../Components/ArtistCard/ArtistCard";
import Aside from "../Components/Aside/Aside";
import Icon from "../Components/Icon/Icon";
import BurgerMenuMobile from "../Components/burgermenumobile/burgetmobile";
import Image from "next/image";
import Cookies from "js-cookie";
import Header from "../Components/Header/Header";
import Badge from "../Components/Badge/Badge";
import badgeItems from "@/public/Consts/BadgeData";
import MusicWrapper from "../Components/MusicWrapper/MusicWrapper";

export default function ArtistList() {
  const [artistData, setArtistData] = useState<any[]>([]);
  const [artistIdData, setArtistIdData] = useState<any>(null); // Holds clicked artist's data
  const [showId, setShowId] = useState(false); // To control whether artist details are shown
  const [selectedArtistImage, setSelectedArtistImage] = useState(""); // Selected artist image
  const [activeBadge, setActiveBadge] = useState(0);
  const [themeColor, setThemeColor] = useState<string | null>(
    Cookies.get("theme") || null
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    const userToken = Cookies.get("userToken");

    axios
      .get("https://music-back-1s59.onrender.com/artist", {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        setArtistData(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch artists:", error);
      });
  }, []);

  useEffect(() => {
    const updateTheme = () => {
      const newTheme = Cookies.get("theme") || null;
      setThemeColor(newTheme);
    };

    updateTheme();
    const themeInterval = setInterval(updateTheme, 1000);

    return () => clearInterval(themeInterval);
  }, []);

  const handleArtistClick = (id: number, imageUrl: string) => {
    const userToken = Cookies.get("userToken");

    axios
      .get(`https://music-back-1s59.onrender.com/artist/${id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        setArtistIdData(response.data);
        setSelectedArtistImage(imageUrl);
        setShowId(true);
      })
      .catch((error) => {
        console.error("Failed to fetch artist details:", error);
      });
  };

  const onchange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleBadgeClick = (id: number) => {
    setActiveBadge(id);
    // Optionally, implement routing logic here
    // router.push(`/path/${id}`);
  };

  return (
    <div className={styles.mainContent}>
      <div className={styles.burger}>
        <Icon width="72px" name="FAZER" isActive={false} onClick={() => {}} />
        <BurgerMenuMobile />
      </div>
      <div className={styles.mainAside}>
        <Aside />
      </div>

      <div
        className={`${styles.static} ${
          themeColor === "dark" ? styles.darkStatic : ""
        }`}
      >
        <Header onchange={onchange1} />
        <div className={styles.content}>
          <div className={styles.badgeContainer}>
            <span className={styles.badgeHeader}>Your Library</span>
            <div className={styles.itemsCont}>
              {badgeItems.map((badgeItem, index) => (
                <Badge
                  key={index}
                  badgeItem={badgeItem}
                  id={badgeItem.id}
                  onClick={handleBadgeClick}
                  isActive={activeBadge === badgeItem.id} // Toggle active state
                />
              ))}
            </div>
          </div>

          <div className={styles.artist}>
            {!showId && (
              <div className={styles.artistContainer}>
                {artistData.map((item, index) => (
                  <ArtistCard
                    key={index}
                    onClick={() =>
                      handleArtistClick(item.id, item.image?.[0]?.url || "")
                    }
                    artistImg={item.image?.[0]?.url || ""}
                    artistName={item.firstName}
                    artistType={""}
                    biography={""}
                  />
                ))}
              </div>
            )}
          </div>

          {showId && artistIdData && (
            <div className={styles.artistMusic}>
              <div className={styles.artists}>
                <Image
                  src={selectedArtistImage || ""}
                  alt={"Artist image"}
                  width={150}
                  height={150}
                  className={styles.imgBackground}
                />
                <p className={styles.nameMusic}>{artistIdData.firstName}</p>
              </div>

              <div className={styles.musicCard}>
                <div className={styles.musicInfo}>
                  {artistIdData.image &&
                    artistIdData.image.map((img: any, index: number) => (
                      <div
                        className={`${styles.info} ${
                          themeColor === "dark" ? styles.darkInfo : ""
                        }`}
                        key={index}
                      >
                        <Image
                          src={img.url}
                          alt={"Artist music image"}
                          width={150}
                          height={150}
                          className={styles.imgAll}
                        />
                        {Array.isArray(artistIdData.musics) &&
                          artistIdData.musics.map(
                            (musicItem: any, musicIndex: number) => (
                              <div className={styles.text1} key={musicIndex}>
                                <p
                                  className={`${styles.text1P} ${
                                    themeColor === "dark"
                                      ? styles.darkText1P
                                      : ""
                                  }`}
                                >
                                  {musicItem.name}
                                </p>
                                <span className={styles.text1SP}>
                                  {musicItem.id}
                                </span>
                              </div>
                            )
                          )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.secondAside}>
        <Aside />
      </div>
    </div>
  );
}
