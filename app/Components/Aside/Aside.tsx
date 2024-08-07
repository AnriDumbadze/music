import styles from "./Aside.module.scss";
import Icon from "../Icon/Icon";
import MenuItem from "../MenuItem/MenuItem";

const AsideMenu = () => {
  return (
    <div className={styles.aside}>
      <div className={styles.siderContent}>
        <div className={styles.logo}>
          <Icon src={"./Images/FAZER.png"} />
        </div>
        <div className={styles.menuItems}>
          <MenuItem
            src={"./Icons/profile.svg"}
            name={"namasdasde"}
            backgroundColor={""}
            textColor={"black"}
          />
          <MenuItem
            src={"./Icons/profile.svg"}
            name={"name"}
            backgroundColor={""}
            textColor={"black"}
          />
        </div>
      </div>
    </div>
  );
};

export default AsideMenu;
