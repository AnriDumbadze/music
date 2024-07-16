import styles from './PlayerController.module.scss';
import Image from 'next/image';


type PlayerControllerProps = {
    albumTitle: string;
    dropdown: string;
    queueTrack: string;
    queueArtist: string;
    photo: string;
    image: string;
    currentTrack: string;
    currentArtist: string;
    currentTime: number;
    duration: number;
    isPlaying: boolean;
    onPlayPause: () => void;
    onSkipForward: () => void;
    onSkipBackward: () => void;
    onRepeat: () => void;
    onShuffle: () => void;
}

const PlayerController = (props: PlayerControllerProps) => {
    const {
        albumTitle,
        dropdown,
        queueArtist,
        queueTrack,
        photo,
        image,
        currentTrack,
        currentArtist,
        currentTime,
        duration,
        isPlaying,
        onPlayPause,
        onSkipForward,
        onSkipBackward,
        onRepeat,
        onShuffle,
    } = props;

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };


    return (
        <div className={styles.playerController}>
            <div className={styles.arrow}>
                <img src={dropdown} alt="" />
            </div>
            <p className={styles.albumName}>{albumTitle}</p>
            <div className={styles.trackInfo}>
                <img src={image} alt="Album Art" className={styles.albumArt} />
                <div className={styles.trackDetails}>
                    <h3 className={styles.track}>{currentTrack}</h3>
                    <p>{currentArtist}</p>
                </div>
                <div className={styles.icons}>
                    <img src="icons/plus.svg" alt="" />
                    <img src="icons/heart.svg" alt="" />
                </div>
            </div>
            <div className={styles.progress}>
                <div className={styles.current}>
                    <span>{formatTime(currentTime)}</span>
                </div>
                <input
                    type="range"
                    className={styles.playInput}
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={() => { }}
                />
                <div className={styles.duration}>
                    <span>{formatTime(duration)}</span>
                </div>
                <div className={styles.controls}>
                    <button onClick={onRepeat} className={styles.repeat}><img src="icons/repeat.svg" alt="" /> </button>
                    <button onClick={onSkipBackward}><img src="icons/previous.svg" alt="" /></button>
                    <button onClick={onPlayPause}>{isPlaying ? <img src="icons/play.svg" alt="" /> : <img src="icons/play2.svg" alt="" />}</button>
                    <button onClick={onSkipForward}><img src="icons/next.svg" alt="" /></button>
                    <button onClick={onShuffle} className={styles.shuffle}><img src="icons/shuffle.svg" alt="" /> </button>
                </div>
                <div className={styles.queue}>
                    <p>In Queue</p>
                    <div className={styles.next}>
                        <img src={photo} alt="" width={48} height={48} />
                        <div className={styles.names}>
                            <span className={styles.queueTrack}>{queueTrack}</span>
                            <span className={styles.queueArtist}>{queueArtist}</span>
                        </div>
                        <div className={styles.image}>
                            <img src="icons/plus.svg" alt="" width={15} />
                            <img src="icons/heart.svg" alt="" width={24} />
                            <img src="icons/dots.svg" alt="" width={24} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerController;
