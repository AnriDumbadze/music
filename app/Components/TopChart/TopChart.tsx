import styles from "./TopChart.module.scss";
import Image from "next/image";


interface Props {
    image: string;
    songName: string;
    artistName: string
    rank: string;
}

const TopChart = (props: Props) => {
    return(
        <div className={styles.mainContainer}>
            <div className={styles.imageContainer}>
                <img className={styles.topImage} src={props.image} alt="image" />
            </div>
            <div className={styles.container}>
                    <p className={styles.song}>{props.songName}</p>
                    <p className={styles.artist}>{props.artistName}</p>
                    <p className={styles.rank}>Top {props.rank}</p>
            </div>
        </div>
    )
}


export default TopChart;