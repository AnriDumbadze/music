import styles from "./Badge.module.scss";
import React from "react";
import Icon from "../Icon/Icon";
import { BadgeItem } from "@/public/Interfaces/inter";

type Props = {
  badgeItem: BadgeItem;
  id: number;
  onClick: (value: number) => void;
  isActive: boolean;
};

const Badge = (props: Props) => {
  return (
    <div
      className={props.isActive ? styles.active : styles.badgeContent}
      onClick={() => props.onClick(props.id)}
    >
      {props.badgeItem.name}
      <Icon width={"24px"} height={"24px"}
        src={
          props.isActive
            ? `${props.badgeItem.activePhoto}`
            : `${props.badgeItem.photo}`
        }
      />
    </div>
  );
};

export default Badge;
