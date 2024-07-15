import Image from 'next/image';
import styles from './PlayerController.module.scss';



type PlayerControllerProps = {
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
                <img src="arrowdown.svg" alt="" />  
            </div>
            <p className={styles.albumName}>Born To Die</p>
            <div className={styles.trackInfo}>
                <img src={image} alt="Album Art" className={styles.albumArt} />
                <div className={styles.trackDetails}>
                    <h3 className={styles.track}>{currentTrack}</h3>
                    <p>{currentArtist}</p>
                </div>
                <div className={styles.icons}>
                    <img src="plus.svg" alt="" />
                    <img src="heart.svg" alt="" />
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
                    <button onClick={onRepeat} className={styles.repeat}><img src="repeat.svg" alt="" /> </button>
                    <button onClick={onSkipBackward}><img src="previous.svg" alt="" /></button>
                    <button onClick={onPlayPause}>{isPlaying ? <img src="play.svg" alt="" /> : <img src="play2.svg" alt="" />}</button>
                    <button onClick={onSkipForward}><img src="next.svg" alt="" /></button>
                    <button onClick={onShuffle} className={styles.shuffle}><img src="shuffle.svg" alt="" /> </button>
                </div>
                <div className={styles.queue}>
                    <p>In Queue</p>
                    <div className={styles.next}>
                        <img src={image} alt="" width={48} height={48} />
                        <div className={styles.names}>
                            <span className={styles.queueTrack}>{queueTrack}</span>
                            <span className={styles.queueArtist}>{queueArtist}</span>
                        </div>
                        <div className={styles.image}>
                            <img src="plus.svg" alt="" width={15}/>
                            <img src="heart.svg" alt="" width={24} />
                            <img src="dots.svg" alt="" width={24}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerController;
