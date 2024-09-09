import Icon from "../Icon/Icon";
import styles from "./ArtistCard.module.scss";

type Props = {
  artistImg: string;
  artistName: string;
  artistType: string;
};
const ArtistCard = (props: Props) => {
  return (
    <div className={styles.artistCard}>
      <div className={styles.cardContent}>
        <img src={`/Images/${props.artistImg}.png`} alt="artist" />
        <div className={styles.artistInfo}>
          <div className={styles.artistName}>{props.artistName}</div>
          <div className={styles.artistType}>{props.artistType}</div>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
