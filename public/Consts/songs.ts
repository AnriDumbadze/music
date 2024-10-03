import { getCookie } from "@/app/Components/Aside/Aside";
import axios from "axios";

// Retrieve user token from cookies
const userToken = getCookie("userToken");

// Define the songs array outside of the Axios request
let songs: any[] = [];

// Fetch music data from the API
axios
  .get("https://music-back-1s59.onrender.com/music", {
    headers: { Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ4dXNraUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mjc5NzA5NjIsImV4cCI6MTczMzE1NDk2Mn0.OcqTFqa8NHBmOwuK4ICwv4376duyMO7rByhKUQFB0k8"}` }, // Use user token from cookies
  })
  .then((response) => {
    const musicData = response.data; // Assign fetched data to musicData array

    console.log(`Fetched music data:`, musicData);

    // Populate the songs array based on fetched music data
    songs = musicData.map((musicItem: any) => ({
      id: musicItem.id, // Assuming musicItem has an 'id' property
      title: musicItem.name, // Assuming musicItem has a 'name' property
      artist: musicItem.artist || "Unknown Artist", // Use a default if artist is not provided
      url: musicItem.url || "", // Use a default if url is not provided
      songDuration: musicItem.duration || "0:00", // Default duration
      queueSong: musicItem.queueSong || "N/A", // Default queue song
      queueName: musicItem.queueName || "N/A", // Default queue name
      src: musicItem.src || "./images/default.png", // Default image source
      queueImg: musicItem.queueImg || "./images/defaultQueue.png", // Default queue image
    }));

    // Log the songs array
    console.log(`Processed songs array:`, songs);
  })
  .catch((error) => {
    console.error("Error fetching music data:", error);
  });

// Export the songs array as a named export
export { songs };
