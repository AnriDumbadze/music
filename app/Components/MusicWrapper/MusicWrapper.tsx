import ArtistCard from "../ArtistCard/ArtistCard";
import styles from "./MusicWrapper.module.scss"

type Props = {
    card:object;
  };
  const MusicWrapper = (props: Props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapperContent}>
                <h1 className={styles.title}>Music</h1>
                <div className={styles.content}>
                   
                </div>
                
                
            </div>

        </div>
        
    );
  };
  
  export default MusicWrapper;
  