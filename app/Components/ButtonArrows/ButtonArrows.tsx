import styles from "./ButtonArrows.module.scss";
import Image from "next/image";

interface ArrowButtonProps {
    direction: 'left' | 'right';
    icon: string;
    onClick: () => void;
  }
  
  const ButtonArrows = ({ direction, onClick, icon}: ArrowButtonProps) => {

    const directionClass = direction === "left" ? styles.left : styles.right 

    const classes = [styles.button, direction].join(" ").trim()

    return (
      <button className={classes} onClick={onClick}>
        <img src={icon} alt="icon" />
      </button>
    );
  };
  



export default ButtonArrows;