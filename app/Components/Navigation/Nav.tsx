import React from "react";
import styles from "./Nav.module.scss";
import NavItem from "../NavItem/NavItem";



const Navigation = () => {

  return (
    <div className={styles.nav}>
      <div className={styles.navContent}>

        <NavItem navContent={"Personal information"} backgroundColor={"yellow"} visible={true}/>
        <NavItem navContent={"Personal information"} backgroundColor={"red"} visible={true}/>
        <NavItem navContent={"Personal information"} backgroundColor={"white"} visible={true}/>

      </div>
    </div>
  );
};

export default Navigation;
