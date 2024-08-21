import styles from "./Aside.module.scss";
import Icon from "../Icon/Icon";
import MenuItem from "../MenuItem/MenuItem";

const AsideMenu = () => {
  return (
    <div className={styles.aside}>
      <div className={styles.siderContent}>
        <div className={styles.logo}>
          <Icon name={"Heart"} isActive={false} onClick={function (): void {
            throw new Error("Function not implemented.");
          } }/>
        </div>
        <div className={styles.menuItems}>
          <MenuItem
            src={"images/profile.svg"}
            name={"namasdasde"}
            backgroundColor={""}
            textColor={"black"}
          />
          <MenuItem
            src={"images/profile.svg"}
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
