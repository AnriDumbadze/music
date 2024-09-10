import styles from "./Aside.module.scss";
import Icon from "../Icon/Icon";
import MenuItem from "../MenuItem/MenuItem";
import { useState } from "react";

const AsideMenu = () => {
  const [isIconActive, setIsIconActive] = useState(false);

  const handleIconClick = () => {
    setIsIconActive(!isIconActive);
  };

  return (
    <div className={styles.aside}>
      <div className={styles.siderContent}>
        <div className={styles.logo}>
          <Icon name={"Heart"} isActive={isIconActive} onClick={handleIconClick} />
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
