import { atom } from 'recoil';
export const songState = atom({
  key: 'songState',
  default: {
    currentSongIndex: 0,
    isPlaying: false,
    duration: 0,
    currentTrackTime: 0,
  }, 
})
