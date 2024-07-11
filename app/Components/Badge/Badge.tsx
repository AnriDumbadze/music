import styles from "./Badge.module.scss";

type Props = {
  badgeItems: string[];
  activeIndex?: number;
};

const Badge = (props: Props) => {
  const { badgeItems, activeIndex } = props;

  const getBadgeClass = (index: number) => {
    return index === activeIndex ? styles.active : '';
  };

  return (
    <div className={styles.badge}>
      <div className={styles.badgeContent}>
        {badgeItems.map((item, index) => (
          <span key={index} className={getBadgeClass(index)}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Badge;
