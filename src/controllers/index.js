// En index.js
import { LinkedList } from "../models/LinkedList.js";

const audio = document.querySelector("audio");
const title = document.querySelector("h1");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const current_time = document.getElementById("current_time");
const current_audio = document.getElementById("current_audio");
const progressContainer = document.querySelector(".progress_container");
const progress = document.getElementById("progress");
const volumeControl = document.getElementById("volume");
const volumeUpButton = document.getElementById("volume-up");
const volumeDownButton = document.getElementById("volume-down");

const songs = ["chipi-chipi-chapa-chapa-dubi-dubi-daba-daba", "Ska-P - Ska-Pa", "SKA-P - El Gato Lopez", "SAUROM - El Queso Rodante", "Coldplay - Adventure Of A Lifetime", "Robot95 - High So High", "Nickelback - She Keeps Me Up",];
let audioIndex = 0;

const playlist = new LinkedList();

songs.forEach(song => playlist.push(song));

const songsDirectory = "audio";

function changeSong(direction) {
    audioIndex = (audioIndex + direction + playlist.size()) % playlist.size();
    loadAudio(playlist.getElementAt(audioIndex).getData());
    audio.play();
}

function loadAudio(song) {
    title.textContent = song;
    audio.src = `${songsDirectory}/${song}.mp3` || `${songsDirectory}/${song}.ogg` || `${songsDirectory}/${song}.wav`;

    audio.addEventListener("loadedmetadata", () => {
        updateTime(audio.duration, current_audio);
    });
}

function updateTime(duration, element) {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    element.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

play.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});

prev.addEventListener("click", () => {
    changeSong(-1);
});

next.addEventListener("click", () => {
    changeSong(1);
});

audio.addEventListener("timeupdate", () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    current_time.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
});

progressContainer.addEventListener("click", (event) => {
    const progressWidth = progressContainer.clientWidth;
    const clickX = event.offsetX;
    const duration = audio.duration;
    const seekTime = (clickX / progressWidth) * duration;
    audio.currentTime = seekTime;
});

volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
});

volumeDownButton.addEventListener("click", () => {
    adjustVolume(-0.1); // Disminuir el volumen en 10%
});

volumeUpButton.addEventListener("click", () => {
    adjustVolume(0.1); // Aumentar el volumen en 10%
});

function adjustVolume(change) {
    audio.volume = Math.min(1, Math.max(0, audio.volume + change));
    volumeControl.value = audio.volume;
}

audio.addEventListener("error", () => {
    console.error("Error loading audio:", audio.src);
});

loadAudio(playlist.getElementAt(audioIndex).getData());
