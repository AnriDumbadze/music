import React from "react";
import styles from "./Nav.module.scss";
import NavItem from "../NavItem/NavItem";

type Props = {
  visible?: boolean;
};

const Navigation = (props: Props) => {
  const saleStylesRender = () => {
    if (!props.visible) {
      return styles.hidden;
    } else {
      return styles.sale;
    }
  };

  return (
    <div className={styles.nav}>
      <div className={styles.navContent}>
        <div className={saleStylesRender()}>
          {props.visible && (
            <NavItem navContent={"Personal information"} backgroundColor={"#ff5f5f"} />
          )}
        </div>
        <div className={saleStylesRender()}>
          {props.visible && (
            <NavItem navContent={"Personal information"} backgroundColor={"#fff"} />
          )}
        </div>
        <div className={saleStylesRender()}>
          {props.visible && (
            <NavItem navContent={"Personal information"} backgroundColor={"#fff"} />
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Navigation;
