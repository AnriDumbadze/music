import React from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
    text: string;
    width: string;
    backgroundColor: string;
    borderRadius: string;
    textColor: string;
    border: string;
};

const Button: React.FC<ButtonProps> = ({ text, width, backgroundColor, borderRadius, textColor, border }) => {
    const buttonStyle = {
        width,
        backgroundColor,
        borderRadius,
        color: textColor,
        border,
    };

    return (
        <button className={styles.button} style={buttonStyle}>
            {text}
        </button>
    );
};

export default Button;
