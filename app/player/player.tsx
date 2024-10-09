// "use client"

// import styles from './player.module.scss'

// interface Props{
//     img:string
//     artistName:string
// }

// export default function Player() {
//     return(
//         <>
//          <div className={styles.trackInfo}>
//                       <img src={currentSong.image[0]?.url || "default-album-art.jpg"} alt="Album Art" className={styles.albumArt} />
//                       <div className={styles.trackDetails}>
//                         <h3 className={styles.track}>{currentSong.name}</h3>
//                         <p>{currentSong.artist.firstName}</p>
//                       </div>
//                     </div>
//                     <div className={styles.videoContainer}>
//                       <div onClick={handleBack} className={styles.controllerbutton}>
//                         <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
//                           {/* SVG Path for Back button */}
//                           <path
//                             d="M23.25 6.66663C23.25 5.93329 22.6667 5.33329 21.9167 5.33329C21.55 5.33329 21.1833 5.44996 20.9167 5.68329L12.85 12.1491C11.9167 12.8666 11.9167 14.2991 12.85 15.0166L20.9167 21.4833C21.1833 21.7166 21.55 21.8333 21.9167 21.8333C22.6667 21.8333 23.25 21.2333 23.25 20.5V6.66663Z"
//                             fill="black"
//                           />
//                         </svg>
//                       </div>
//                       <video ref={videoRef} className={styles.lineVideo} controls>
//                         <source src={currentSong.mp3.url} type="video/mp4" />
//                         Your browser does not support the video tag.
//                       </video>
//                       <div onClick={handleNext} className={styles.controllerbutton}>
//                         <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
//                           {/* SVG Path for Next button */}
//                           <path
//                             d="M10.75 21.8333C10.75 22.5667 11.3333 23.1667 12.0833 23.1667C12.45 23.1667 12.8167 23.05 13.0833 22.8167L21.15 16.3509C22.0833 15.6333 22.0833 14.2009 21.15 13.4833L13.0833 7.01663C12.8167 6.78329 12.45 6.66663 12.0833 6.66663C11.3333 6.66663 10.75 7.26663 10.75 7.99996V21.8333Z"
//                             fill="black"
//                           />
//                         </svg>
//                       </div>
//                     </div>
//         </>
//     )
// }