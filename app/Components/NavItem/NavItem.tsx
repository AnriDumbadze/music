import React from "react";
import styles from "./NavItem.module.scss";

type Props = {
  navContent: string;
  backgroundColor: string;
};
const NavItem = (props: Props) => {
  const ItemStyle = {
    backgroundColor: props.backgroundColor
  };

  return (
    <div className={styles.nav}>
      <div className={styles.navContent}>
        <div className={styles.navItem} style={ItemStyle}>
          <span>{props.navContent}</span>
        </div>
      </div>
    </div>
  );
};

export default NavItem;
