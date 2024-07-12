import ArtistCard from "../ArtistCard/ArtistCard";
import styles from "./MusicWrapper.module.scss"

type Props = {

  };
  const MusicWrapper = (props: Props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapperContent}>
                <h1 className={styles.title}>Music</h1>
                <div className={styles.content}>
                    <ArtistCard artistImg={"./artist.svg"} artistName={"Anri"} artistType={"Artist"}/>
                    <ArtistCard artistImg={"./artist.svg"} artistName={"Anri"} artistType={"Artist"}/>
                    <ArtistCard artistImg={"./artist.svg"} artistName={"Anri"} artistType={"Artist"}/>
                    <ArtistCard artistImg={"./artist.svg"} artistName={"Anri"} artistType={"Artist"}/>
                </div>
                
                

            </div>

        </div>
        
    );
  };
  
  export default MusicWrapper;
  