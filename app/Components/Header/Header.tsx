import Icon from "../Icon/Icon";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
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
          <input className={styles.noBorder} placeholder="search" />
        </div>
      </div>
    </div>

    
  );
};

export default Header;