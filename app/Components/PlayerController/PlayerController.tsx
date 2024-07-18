import { useEffect, useRef, useState } from 'react';
import styles from './PlayerController.module.scss';
import songs from '@/public/Consts/songs';

type PlayerControllerProps = {
    albumTitle: string;
    dropdown: string;
    queueTrack: string;
    queueArtist: string;
    photo: string;
    image: string;
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
        duration,
        isPlaying,
        onPlayPause,
        onRepeat,
        onShuffle,
    } = props;

    const audioRef = useRef<HTMLAudioElement>(null);
    const [currentTrackTime, setCurrentTrackTime] = useState(0);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [songEnded, setSongEnded] = useState(false);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (audioRef.current && isPlaying) {
                setCurrentTrackTime(audioRef.current.currentTime);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isPlaying]);

    useEffect(() => {
        const handleSongEnd = () => {
            setSongEnded(true);
        };

        if (audioRef.current) {
            audioRef.current.addEventListener('ended', handleSongEnd);
            return () => {
                audioRef.current?.removeEventListener('ended', handleSongEnd);
            };
        }
    }, [currentSongIndex]);

    useEffect(() => {
        if (songEnded) {
            setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
            setCurrentTrackTime(0);
            setSongEnded(false);
            onPlayPause(); // Pause the player when moving to the next song
        }
    }, [songEnded]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = Number(e.target.value);
        setCurrentTrackTime(time);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
    };

    const handleSkipForward = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
        setCurrentTrackTime(0);
    };

    const handleSkipBackward = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
        setCurrentTrackTime(0);
    };

    return (
        <div className={styles.playerController}>
            <audio ref={audioRef} src={songs[currentSongIndex].url} />
            <div className={styles.arrow}>
                <img src={dropdown} alt="" />
            </div>
            <p className={styles.albumName}>{albumTitle}</p>
            <div className={styles.trackInfo}>
                <img src={songs[currentSongIndex].src} alt="Artist Image" className={styles.albumArt} />
                <div className={styles.trackDetails}>
                    <h3 className={styles.track}>{songs[currentSongIndex].title}</h3>
                    <p>{songs[currentSongIndex].artist}</p>
                </div>
                <div className={styles.icons}>
                    <img src="icons/plus.svg" alt="" />
                    <img src="icons/heart.svg" alt="" />
                </div>
            </div>
            <div className={styles.progress}>
                <div className={styles.current}>
                    <span>{formatTime(currentTrackTime)}</span>
                </div>
                <input
                    type="range"
                    className={styles.playInput}
                    min="0"
                    max={duration}
                    value={currentTrackTime}
                    onChange={handleTimeChange}
                />
                <div className={styles.duration}>
                    <span>{songs[currentSongIndex].songDuration}</span>
                </div>
                <div className={styles.controls}>
                    <button onClick={onRepeat} className={styles.repeat}><img src="icons/repeat.svg" alt="" /> </button>
                    <button onClick={handleSkipBackward}><img src="icons/previous.svg" alt="" /></button>
                    <button onClick={onPlayPause}>
                        {isPlaying ? <img src="icons/pause.svg" alt="Pause" /> : <img src="icons/play.svg" alt="Play" />}
                    </button>
                    <button onClick={handleSkipForward}><img src="icons/next.svg" alt="" /></button>
                    <button onClick={onShuffle} className={styles.shuffle}><img src="icons/shuffle.svg" alt="" /> </button>
                </div>
                <div className={styles.queue}>
                    <p>In Queue</p>
                    <div className={styles.next}>
                        <img src={songs[currentSongIndex].queueImg} alt="Queue Image" width={48} height={48} />
                        <div className={styles.names}>
                            <span className={styles.queueTrack}>{songs[currentSongIndex].queueSong}</span>
                            <span className={styles.queueArtist}>{songs[currentSongIndex].queueName}</span>
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
