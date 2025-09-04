let songname = document.querySelector("#song-name")
let songsinger = document.querySelector("#song-singer")
let songimage = document.querySelector(".song-image")
let playPauseImg = document.querySelector("#play-pause")
let volumerange = document.querySelector("#volume-range")
let volsvg = document.querySelector("#vol-svg")
let songrange = document.querySelector("#song-duration")
let musicnaim = document.querySelector("#musicanim")
let playlistimg = document.querySelector("#playlist-img")
let playlist = document.querySelector(".playlist")
let playlistsong = document.querySelectorAll(".playlist-song")
let index = 0;
let playingsong = false;
let track = document.createElement("audio")
let songs = [
    {
        name: "Ve Kamleya",
        path: "firstsong.mp3",
        image: "img1.png",
        singer: "Arijit singh"
    },
    {
        name: "Apna Bana Le",
        path: "secondsong.mp3",
        image: "img2.jpg",
        singer: "Arijit singh"
    },
    {
        name: "Pehle Bhi Me",
        path: "thirdsong.mp3",
        image: "img3.jpeg",
        singer: "Vishal Mishra"
    },
    {
        name: "Satranga",
        path: "fourthsong.mp3",
        image: "img4.jpg",
        singer: "Arijit singh"
    }
]

function loadtrack(index){
    track.src = songs[index].path
    songname.innerHTML = songs[index].name;
    songsinger.innerHTML = songs[index].singer;
    songimage.style =`background-image: url("${songs[index].image}");` 
    volume();
    duration();
    setInterval(() => {
        songrange.max = track.duration
        songrange.value = track.currentTime
    }, 1000)
    track.loop = true;
    track.load();
}
loadtrack(index);
function playPause(){
    if (playingsong == false) {
        playsong();
    }else{
        pausesong();
    }
}

function playsong(){
    track.play();
    playingsong = true;
    playPauseImg.src = "pause.svg"
    musicnaim.style.display = "block";
}

function pausesong(){
    track.pause();
    playingsong = false;
    playPauseImg.src = "play.svg"
    musicnaim.style.display = "none";
}

function nextSong(){
    if (index < songs.length-1) {
        index++;
        loadtrack(index);
        playsong();
    }else{
        index = 0;
        loadtrack(index);
        playsong();
    }
}

function previoussong(){
    if (index > 0) {
        index--;
        loadtrack(index);
         playsong();
    }else{
        index = songs.length-1;
        loadtrack(index);
        playsong();
    }
}

function volume(){
    track.volume = volumerange.value / 100;
    if (volumerange.value == 0) {
        volsvg.src = "mute.svg"
    }else{
        volsvg.src = "volume.svg"
    }
}

function duration(){
    track.currentTime = songrange.value;
}

playlistimg.addEventListener("click", () => {
    playlist.classList.toggle("playlist-active")
    if (playlist.classList.contains("playlist-active")) {
        playlistimg.src = "cross.svg"
    }else{
        playlistimg.src = "playlist.svg"
    }
})

playlistsong.forEach((songs, index) => {
    songs.addEventListener('click', () => {
        loadtrack(index);
        playsong();
        playlist.classList.remove("playlist-active");
        playlistimg.src = "playlist.svg";
    })
})