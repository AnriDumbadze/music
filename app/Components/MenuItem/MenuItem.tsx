import React from 'react';
import styles from './MenuItem.module.scss';
import Icon from '../Icon/Icon';

type Props = {
    src: string;
    name: string;
    backgroundColor: string;
    textColor: string;
}

const MenuItem = (props: Props) => {

    const itemStyle = {
        backgroundColor: props.backgroundColor,
        color: props.textColor,
    };

    return (
        <div className={styles.menuItem}>
            <div className={styles.itemContent} style={itemStyle}>
                <Icon src={props.src} />
                <span>{props.name}</span>
            </div>
        </div>
    );
}

export default MenuItem;
