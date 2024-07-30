import Icon from "../Icon/Icon";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.arrowContainer}>
          <Icon src={"./Icons/Arrow.svg"} height={"40px"} width={"40px"} />
          <Icon src={"./Icons/rightArr.svg"} height={"40px"} width={"40px"} />
        </div>

        <div className={styles.searchContainer}>
          <Icon src={"./Images/searchIcon.png"} />
          <input className={styles.noBorder} placeholder="search" />
        </div>
      </div>
    </div>

    
  );
};

export default Header;