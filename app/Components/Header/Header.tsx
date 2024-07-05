import Icon from "../Icon/Icon";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.arrowContainer}>
          <Icon src={"./leftArr.png"} height={"40px"} width={"40px"} />
          <Icon src={"./rightArr.png"} height={"40px"} width={"40px"} />
        </div>

        <div className={styles.searchContainer}>
          <Icon src={"./searchIcon.png"} />
          <input className={styles.noBorder} placeholder="search" />
        </div>
      </div>
    </div>

    
  );
};

export default Header;
