import styles from './playlistCard.module.scss';
import Icon from '../Icon/Icon';

export default function PlaylistCard({ playlists }: { playlists: any[] }) {
    return (
        <div className={styles.container}>
            <div className={styles.list}>
                {playlists && playlists.map((item) => (
                    <div className={styles.listItem} key={item.id}>
                        <div className={styles.text}>
                            <p className={styles.textItem}>{item.id}</p>
                            <p className={styles.title}>{item.name}</p>
                            <p className={styles.textItem}>Born Die</p>
                            <p className={styles.textItem}>{item.createdAt}</p> {/* Display creation date */}
                            <div className={styles.group}>
                                <p className={styles.textItem}>1:14</p>
                                <Icon width='24' height='24' name={'playlistHeart'} />
                                <Icon width='24' height='24' name={'playlistshuffle'} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
