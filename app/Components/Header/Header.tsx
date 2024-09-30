"use client"
import { useState, useEffect } from "react";
import { getCookie } from "../Aside/Aside";
import Icon from "../Icon/Icon";
import styles from "./Header.module.scss";
interface Props{
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void; 
}
const Header = (props:Props) => {
  const [themeColor, setThemeColor] = useState<string | null>(getCookie("theme")); 
  useEffect(() => {
    const updateTheme = () => {
      const newTheme = getCookie("theme");
      setThemeColor(newTheme)
    };

    updateTheme();

    const themeInterval = setInterval(updateTheme, 0); 

    return () => clearInterval(themeInterval);
  }, []);
  return (
    <div className={`${styles.header} ${themeColor === 'dark' ? styles.darkHeader : ''}`}>
      <div className={styles.headerContent}>
        <div className={styles.arrowContainer}>
          <Icon  height={"40px"} width={"40px"} name={"Arrow"} isActive={false} onClick={function (): void {
            throw new Error("Function not implemented.");
          } } />
          <Icon  height={"40px"} width={"40px"} name={"rightArr"} isActive={false} onClick={function (): void {
            throw new Error("Function not implemented.");
          } } />
        </div>

        <div className={styles.searchContainer}>
          <Icon name={"searchIcon"} isActive={false} onClick={function (): void {
            throw new Error("Function not implemented.");
          } }  />
          <input onChange={props.onchange} className={styles.noBorder} placeholder="search" />
        </div>
      </div>
    </div>

    
  );
};

export default Header;