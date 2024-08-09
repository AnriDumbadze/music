import styles from "./buttonIcon.module.scss";
import Image from "next/image";


interface Props {
    title?: string;
    icon: string;
    onClick: () => void;
    style: "Red" | "Dark" | "White" | "Black"
}


const ButtonIcon = (props: Props) => {

    const styleClass = 
    props.style === "Red" ? styles.Red :
    props.style === "Dark" ? styles.Dark :
    props.style === "Black" ? styles.Black : 
    styles.White;


    const classes = [styles.button, styleClass].join(" ").trim()

    return(
        <button className={classes} onClick={props.onClick}>
            <img src={props.icon} alt="icon" />
            {props.title}
        </button> 
    )
};



export default ButtonIcon;