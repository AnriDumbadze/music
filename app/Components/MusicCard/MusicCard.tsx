
import Icon from "../Icon/Icon";
import styles from "./MusicCard.module.scss"

type Props = {
    artistSRC:string;
    artistName:string;
    songName:string;
  };
  const MusicCard = (props: Props) => {
    return (
        <div className={styles.musicCard}>
            <div className={styles.cardContent}>
                <Icon src={props.artistSRC} width={"178px"} height={"176px"}/>
                <div className={styles.songInfo}>
                    <span className={styles.artistName}>{props.artistName}</span>
                    <span className={styles.songName}>{props.songName}</span>
                </div>
            </div>
        </div>
    );
  };
  
  export default MusicCard;
  