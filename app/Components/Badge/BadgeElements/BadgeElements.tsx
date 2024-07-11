import { useState } from "react";
import style from "../Badge.module.scss";
import Badge from "../Badge";

const BadgeComponent = () => {
  const badgeItems = ["All", "Album", "Playlists", "Artists", "Downloaded"];
  const [activeBadge, setActiveBadge] = useState("All");

  const activeIndex = badgeItems.indexOf(activeBadge);

  const badgeElements = badgeItems.map((item, index) => (
    <span
      key={index}
      className={index === activeIndex ? style.active : ""}
      onClick={() => setActiveBadge(item)}
    >
      {item}
    </span>
  ));

  return <div><Badge>{badgeElements}</Badge></div>;
};

export default BadgeComponent;
