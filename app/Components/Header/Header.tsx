"use client"
import { useState, useEffect } from "react";
import { getCookie } from "../Aside/Aside";
import Icon from "../Icon/Icon";
import styles from "./Header.module.scss";
interface Props{
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  isSeachPage?: boolean
}
const Header = (props: Props) => {
  const [themeColor, setThemeColor] = useState<string | null>(getCookie("theme") ?? null);
  const [isSeachPage, setSeatchPage] = useState<any>()
  useEffect(() => {
    if(props.isSeachPage) {
      setSeatchPage(
        <div className={styles.searchContainer}>
        <Icon name={"searchIcon"} isActive={false} onClick={() => {}} />
        <input onChange={props.onchange} className={styles.noBorder} placeholder="search" />
      </div>
      )
    } else {
      <div></div>
    }
  }, [])


  
  return (
    <div className={`${styles.darkHeader} ${themeColor === 'dark' ? styles.darkHeader : ''}`}>
      <div className={styles.headerContent}>
        {
          isSeachPage
        }
      </div>
    </div>
  );
}

export default Header;