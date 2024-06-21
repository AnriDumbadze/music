import React from 'react';
import Button from './Components/Button/Button';
import AsideMenu from './Components/Aside/Aside';
import { div } from '@tensorflow/tfjs';
import styles from './page.module.scss'

const Home = () => {
    return (
      
      <div className={styles.mainContent}>
          <AsideMenu/>

      </div>
      
      
    );
};

export default Home;


