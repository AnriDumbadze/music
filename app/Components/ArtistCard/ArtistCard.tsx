import Icon from "../Icon/Icon";
import styles from "./ArtistCard.module.scss";

type Props = {};
const ArtistCard = (props: Props) => {
  return (
    <div className={styles.artistCard}>
      <div className={styles.card}>
        <Icon src={"./artistCard.png"} width={"142px"} />
        <div className={styles.artistInfo}>
          <span className={styles.artistName}>Artist Name</span>
          <span className={styles.type}>Artist</span>
        </div>
      </div>
      <div className={styles.card}>
        <Icon src={"./artistCard.png"} width={"142px"} />
        <div className={styles.artistInfo}>
          <span className={styles.artistName}>Artist Name</span>
          <span className={styles.type}>Artist</span>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
