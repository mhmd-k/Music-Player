const trackArt = document.querySelectorAll(".track-art");
const trackName = document.querySelectorAll(".track-name");
const trackArtist = document.querySelectorAll(".track-artist");

const playpauseBtn = document.querySelectorAll(".playpause-track");
const nextBtn = document.querySelectorAll(".next-track");
const prevBtn = document.querySelectorAll(".prev-track");
const shuffleBtn = document.querySelector(".shuffle");
const hideBtn = document.getElementById("hide-player");

const seekSlider = document.querySelector(".seek_slider");
const volumeSlider = document.querySelector(".volume_slider");
const currTime = document.querySelector(".current-time");
const totalDuration = document.querySelector(".total-duration");

const mobileSmallPlayer = document.querySelector(".small-player");

const songList = [
  {
    name: "ADHD",
    artist: "Joyner Lucas",
    image: "./images/ADHD.jpg",
    path: "./songs/Joyner Lucas - ADHD (official audio)(MP3_70K).mp3",
  },
  {
    name: "The Synaptic",
    artist: "Mesh Saheelk",
    image: "./images/al-qamar.jpg",
    path: "./songs/The Synaptik - Mesh Saheelk (Official Visual) _ السينابتيك مش صاحيلك(MP3_70K).mp3",
  },
  {
    name: "Closer 2",
    artist: "Eden",
    image: "./images/eden-closer-2.jpg",
    path: "./songs/EDEN - Closer 2 (Official Audio)(MP3_70K).mp3",
  },
  {
    name: "Drugs",
    artist: "Eden",
    image: "./images/drugs.jpg",
    path: "./songs/EDEN - drugs(MP3_70K).mp3",
  },
  {
    name: "somebody that i used to know",
    artist: "Gotye",
    image: "./images/gotye.jpg",
    path: "./songs/Gotye - Somebody That I Used To Know (feat. Kimbra(MP3_128K).mp3",
  },
  {
    name: "Jezabel",
    artist: "2Pac ft. Sade",
    image: "./images/jezebel.jpg",
    path: "./songs/2Pac ft Sade - Jezebel(MP3_70K).mp3",
  },
  {
    name: "Laugh Now Cry Later",
    artist: "Drake",
    image: "./images/laugh-now.jpg",
    path: "./songs/Drake - Laugh Now Cry Later (Official Audio) ft. Lil Durk(MP3_70K).mp3",
  },
  {
    name: "One",
    artist: "Metallica",
    image: "./images/R-4497573-1368157777-1539.jpg",
    path: "./songs/Metallica - One [Full HD] [Lyrics](MP3_70K).mp3",
  },
  {
    name: "I spoke to the devil in miami",
    artist: "XXXTENTACION",
    image: "./images/XXXTENTACION.jpg",
    path: "./songs/XXXTENTACION - I spoke to the devil in miami_ he said everything would be fine (Lyrics)(MP3_70K).mp3",
  },
  {
    name: "The Synaptic",
    artist: "Al Qamar Wa Al Mohet",
    image: "./images/al-qamar.jpg",
    path: "./songs/The Synaptik - Al Qamar Wal Moheet (Lyric Video) _ السينابتيك - القمر و المحيط(MP3_70K).mp3",
  },
];

let songIndex = Math.floor(Math.random() * songList.length);
let isPlaying = false;
let updateTimer;
let audio = new Audio(songList[songIndex].path);

function playSong() {
  isPlaying = true;
  audio.play();
  PLayStopAnimation("playing");
  updateTimer = setInterval(seekUpdate, 1000);
}

function pauseSong() {
  clearInterval(updateTimer);
  isPlaying = false;
  audio.pause();
  PLayStopAnimation("paused");
}

function PLayStopAnimation(state) {
  if (state === "playing") {
    playpauseBtn[0].innerHTML = `<i class="fa fa-pause-circle"></i> Pause`;
    playpauseBtn[1].innerHTML = `<i class="fa-solid fa-pause"></i>`;
    playpauseBtn[2].innerHTML = '<i class="fa fa-pause-circle fa-4x"></i>';
    trackArt[2].style.animationPlayState = "running";
    document.querySelector(".player").style.animationPlayState = "running";
  } else {
    playpauseBtn[0].innerHTML = `<i class="fa fa-play-circle"></i> Play`;
    playpauseBtn[1].innerHTML = `<i class="fa-solid fa-play"></i>`;
    playpauseBtn[2].innerHTML = '<i class="fa fa-play-circle fa-4x"></i>';
    trackArt[2].style.animationPlayState = "paused";
    document.querySelector(".player").style.animationPlayState = "paused";
  }
}

function getSongDetails() {
  trackName.forEach((e) => {
    e.innerText = songList[songIndex].name;
  });
  trackArtist.forEach((e) => {
    e.innerText = songList[songIndex].artist;
  });
  trackArt.forEach((e) => {
    e.style.backgroundImage = `url(${songList[songIndex].image})`;
  });
  audio.addEventListener("ended", nextSong);
}

function nextSong() {
  pauseSong();
  if (songIndex >= songList.length - 1) {
    songIndex = 0;
  } else {
    songIndex++;
  }
  audio = new Audio(songList[songIndex].path);
  audio.load();
  getSongDetails();
  changeActiveSong();
  playSong();
}

function prevSong() {
  pauseSong();
  if (songIndex === 0) {
    songIndex = songList.length - 1;
  } else {
    songIndex--;
  }
  audio = new Audio(songList[songIndex].path);
  audio.load();
  getSongDetails();
  changeActiveSong();
  playSong();
}

function seekUpdate() {
  let seekPosition = 0;
  if (!isNaN(audio.duration)) {
    seekPosition = audio.currentTime * (100 / audio.duration);
    seekSlider.value = seekPosition;
    let currentMinutes = Math.floor(audio.currentTime / 60);
    let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(audio.duration / 60);
    let durationSeconds = Math.floor(audio.duration - durationMinutes * 60);
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }
    currTime.textContent = currentMinutes + ":" + currentSeconds;
    totalDuration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

function changeActiveSong() {
  document.querySelectorAll(".song-list li").forEach((li) => {
    li.classList.remove("active");
    if (parseInt(li.getAttribute("data-song")) === songIndex) {
      li.classList.add("active");
    }
  });
}

function seekTo() {
  const seekto = audio.duration * (seekSlider.value / 100);
  audio.currentTime = seekto;
}

function setVolume() {
  audio.volume = volumeSlider.value / 100;
}

function createItem(song, index) {
  const li = document.createElement("li");
  li.setAttribute("data-song", index);
  let active = index === songIndex ? "active" : null;
  const num = index + 1 > 9 ? index + 1 : `0${index + 1}`;
  li.innerHTML = `
    <div class="number">${num}</div>
    <div class="song-details">
      <h3>${song.name}</h3>
      <p>${song.artist}</p>
    </div>
    <div class="svg"><i class="fa-solid fa-signal fa-beat"></i></div>
  `;
  if (active) {
    li.classList.add("active");
  }
  document.querySelector(".songs .song-list").append(li);
  li.addEventListener("click", () => changeSong(index));
}

function changeSong(index) {
  if (index === songIndex) return;
  audio.pause();
  songIndex = index;
  audio = new Audio(songList[songIndex].path);
  audio.load();
  getSongDetails();
  playSong();
  changeActiveSong();
}

function showPlayer() {
  document.querySelector(".player").style.transform = "translateY(0%)";
}

function hidePlayer() {
  document.querySelector(".player").style.transform = "translateY(100%)";
}

songList.forEach((song, index) => createItem(song, index));

playpauseBtn.forEach((e) => {
  e.addEventListener("click", (event) => {
    event.stopPropagation();
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
      updateTimer = setInterval(seekUpdate, 1000);
    }
  });
});

hideBtn.addEventListener("click", hidePlayer);

nextBtn.forEach((e) =>
  e.addEventListener("click", (event) => {
    event.stopPropagation();
    nextSong();
  })
);

prevBtn.forEach((e) =>
  e.addEventListener("click", (event) => {
    event.stopPropagation();
    prevSong();
  })
);

seekSlider.addEventListener("change", seekTo);

volumeSlider.addEventListener("change", setVolume);

mobileSmallPlayer.addEventListener("click", showPlayer);

shuffleBtn.addEventListener("click", () => {
  const randomNum = Math.floor(Math.random() * songList.length);
  changeSong(randomNum);
});

window.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  }
});

getSongDetails();
