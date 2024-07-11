import styles from "./Badge.module.scss";

type Props = {
  badgeItem1: string;
  badgeItem2: string;
  badgeItem3: string;
  badgeItem4: string;
  badgeItem5: string;
  active?: "all" | "album" | "playlists" | "artists" | "downloaded";
};

const Badge = (props: Props) => {
  const { badgeItem1, badgeItem2, badgeItem3, badgeItem4, badgeItem5, active } = props;


  const getBadgeClass = (item: string) => {
    switch (active) {
      case "all":
        return item === badgeItem1 ? styles.active : '';
      case "album":
        return item === badgeItem2 ? styles.active : '';
      case "playlists":
        return item === badgeItem3 ? styles.active : '';
      case "artists":
        return item === badgeItem4 ? styles.active : '';
      case "downloaded":
        return item === badgeItem5 ? styles.active : '';
      default:
        return '';
    }
  };

  return (
    <div className={styles.badge}>
      <div className={styles.badgeContent}>
        <span className={getBadgeClass(badgeItem1)}>{badgeItem1}</span>
        <span className={getBadgeClass(badgeItem2)}>{badgeItem2}</span>
        <span className={getBadgeClass(badgeItem3)}>{badgeItem3}</span>
        <span className={getBadgeClass(badgeItem4)}>{badgeItem4}</span>
        <span className={getBadgeClass(badgeItem5)}>{badgeItem5}</span>
      </div>
    </div>
  );
};

export default Badge;