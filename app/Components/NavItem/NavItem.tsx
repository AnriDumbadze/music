import React from "react";
import styles from "./NavItem.module.scss";

type Props = {
  visible: boolean;
  navContent: string;
  backgroundColor: string;
};

const NavItem = (props: Props) => {
  const ItemStyle = {
    backgroundColor: props.backgroundColor
  };

  const saleStylesRender = () => {
    if (!props.visible) {
      return styles.hidden;
    } else {
      return styles.sale;
    }
  };

  return (
    <div className={saleStylesRender()}>
    {props.visible && (
      <div className={styles.nav}>
      <div className={styles.navContent}>
        <div className={styles.navItem} style={ItemStyle}>
          <span>{props.navContent}</span>
        </div>
      </div>
    </div>
    )}
  </div>
  );
};

export default NavItem;
