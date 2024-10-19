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
import MusicCard from "../Components/MusicCard/Musiccard";
import PlaylistCard from "../Components/playlistCard/playlsitCard";

export default function ArtistList() {
  const [artistData, setArtistData] = useState<any[]>([]);
  const [artistIdData, setArtistIdData] = useState<any>(null);
  const [showId, setShowId] = useState(false);
  const [selectedArtistImage, setSelectedArtistImage] = useState("")
  const [activeBadge, setActiveBadge] = useState(0);
  const [musicData, setMusicData] = useState<any[]>([]);
  const [themeColor, setThemeColor] = useState<string | null>(
    Cookies.get("theme") || null
  );
  const [showAll, setShowAll] = useState(true)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [onlyArtist, setOnlyArtist] = useState(false)
  const [search, setSearch] = useState("");

  const handleClick = (index: number) => {
    console.log("clicked");

    const userToken = Cookies.get("userToken");
    axios.get('https://music-back-1s59.onrender.com/music/' + index, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
      .then((rensponse) => {
        localStorage.setItem("albumItem", JSON.stringify(rensponse.data))
        if (typeof window != 'undefined') {
          window.location.replace('/');
        }
      })
      .catch((err) => console.error(err))
  }

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

    axios
      .get("https://music-back-1s59.onrender.com/music", {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        setMusicData(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch music:", error);
      });
  }, []);
  console.log(musicData);

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
    if (id === 2) {
      setShowAll(false)
      setShowPlaylist(true)
      setOnlyArtist(false)
    } else if (id == 3) {
      setShowAll(false)
      setShowPlaylist(false)
      setOnlyArtist(true)
    } else if (id == 0) {
      setShowAll(true)
      setShowPlaylist(false)
      setOnlyArtist(false)
    }
  };

  return (
    <div className={styles.mainContent}>
      <div className={styles.burger}>
        <Icon width="72px" name="FAZER" isActive={false} onClick={() => { }} />
        <BurgerMenuMobile />
      </div>
      <div className={styles.mainAside}>
        <Aside />
      </div>

      <div
        className={`${styles.static} ${themeColor === "dark" ? styles.darkStatic : ""
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
                {showAll && (
                  <>
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

                    {musicData.map((item) => (
                      <div key={item.id} onClick={() => handleClick(Number(item.id))}>  // Key is now here
                        <MusicCard
                          url={item.image[item.image.length - 1]?.url || "/Images/popHit.png"}
                          author={item.artist.firstName}
                          songTitle={item.name}
                          id={item.id}
                          playlists={item.playlist}
                        />
                      </div>
                    ))}

                  </>
                )}

                {onlyArtist &&
                  <>
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
                  </>
                }

              </div>
            )}
            {showPlaylist &&
              <>
                <PlaylistCard playlists={[]} />
              </>
            }
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

                  {/* Display music list */}
                  <div className={styles.musicCard}>
                    <div className={styles.musicInfo}>
                      {Array.isArray(artistIdData.musics) &&
                        artistIdData.musics.map((musicItem: any, index: number) => (
                          <div className={styles.text1} key={index}>
                            <p className={styles.text1P}>
                              {musicItem.name} {/* Music name */}
                            </p>
                            <span className={styles.text1SP}>
                              {musicItem.id} {/* Music ID */}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}

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
