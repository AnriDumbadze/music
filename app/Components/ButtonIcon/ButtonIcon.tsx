import styles from "./buttonIcon.module.scss";
import Image from "next/image";

export enum ButtonStyle {
    Red = "Red",
    Dark = "Dark",
    White = "White",
    Black = "Black",
}


interface Props {
    title?: string;
    icon: string;
    onClick: () => void;
    style: ButtonStyle;
}


const ButtonIcon = (props: Props) => {

    let styleClass = styles.White;

    if (props.style === "Red") {
        styleClass = styles.Red;
    } else if (props.style === "Dark") {
        styleClass = styles.Dark;
    } else if (props.style === "Black") {
        styleClass = styles.Black;
    }


    const classes = [styles.button, styleClass].join(" ").trim()

    return(
        <button className={classes} onClick={props.onClick}>
            <img src={props.icon} alt="icon" />
            {props.title}
        </button> 
    )
};



export default ButtonIcon;