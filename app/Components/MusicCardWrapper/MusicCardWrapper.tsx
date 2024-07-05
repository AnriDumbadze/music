import MusicCard from "../MusicCard/MusicCard";
import styles from "./MusicCardWrapper.module.scss"

type Props = {

  };
  const MusicCardWrapper = (props: Props) => {
    return (
        <div className={styles.wrapper}>
                <MusicCard artistSRC={"./artist.png"} artistName={"Emnem"} songName={"lamazo biwo"}/>
                <MusicCard artistSRC={"./artist.png"} artistName={"Emnem"} songName={"lamazo biwo"}/>
                <MusicCard artistSRC={"./artist.png"} artistName={"Emnem"} songName={"lamazo biwo"}/>
                <MusicCard artistSRC={"./artist.png"} artistName={"Emnem"} songName={"lamazo biwo"}/>
                <MusicCard artistSRC={"./artist.png"} artistName={"Emnem"} songName={"lamazo biwo"}/>
                <MusicCard artistSRC={"./artist.png"} artistName={"Emnem"} songName={"lamazo biwo"}/>
              
        </div>
    );
  };
  
  export default MusicCardWrapper;
  