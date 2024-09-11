"use client"
import { useState } from 'react';
import styles from './page.module.scss'
import { Button, Drawer } from 'antd';
import LightDark from '../LightDark/LightDark';

export default function BurgerMenuMobile(){
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
      setOpen(true);
    };
  
    const onClose = () => {
      setOpen(false);
    };
  
    return(
        <>
         <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer title="Burger Menu" onClose={onClose} open={open}>
<div className={styles.container}>
<LightDark />
</div>
<div className={styles.logoutContainer}>
    <div className={styles.imgLogout}></div>
</div>
      </Drawer>
        </>
    )
}