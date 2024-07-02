import React from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  text: string;
  width: string;
  backgroundColor: string;
  borderRadius: string;
  textColor: string;
  border: string;
};

const Button = (props: ButtonProps) => {
  const buttonStyle = {
    width: props.width,
    backgroundColor: props.backgroundColor,
    borderRadius: props.borderRadius,
    color: props.textColor,
    border: props.border,
  };

  return (
    <button className={styles.button} style={buttonStyle}>
      {props.text}
    </button>
  );
};

export default Button;
