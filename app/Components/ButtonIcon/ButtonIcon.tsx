import styles from "./buttonIcon.module.scss";
import Image from "next/image";
import { ButtonStyle } from "../ButtonStyles"; 

interface Props {
  title?: string;
  icon: string;  
  onClick: () => void;
  style: ButtonStyle;  
}

const ButtonIcon = (props: Props) => {
  let styleClass = styles.White; 

  if (props.style === ButtonStyle.Red) {
    styleClass = styles.Red;
  } else if (props.style === ButtonStyle.Dark) {
    styleClass = styles.Dark;
  } else if (props.style === ButtonStyle.Black) {
    styleClass = styles.Black;
  }

  const classes = [styles.button, styleClass].join(" ").trim();

  return (
    <button className={classes} onClick={props.onClick}>
      <img src={`./Icons/${props.icon}.svg`} alt="artist" />

      {props.title && <span>{props.title}</span>}  
    </button>
  );
};

export default ButtonIcon;
