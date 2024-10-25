const artists = [
    { 
        name: "Kuldeep M Pai", 
        genre: "Devotional", 
        image: "../img/kuldeep.png",
        bio: "Kuldeep Muralidhar Pai (born 9 January 1982), best known as Kuldeep M Pai, is an Indian musician, composer, Carnatic music vocalist, and music producer. His videos are mainly performed by children and are released under his own recording label, Chith Studios.",
        playlist: ["Amba Stavam", "Bhagyadha Lakshmi bharamma", "Aigiri Nandhini", "Namo Namo Bharatambe", "Pibare Rama Rasam"]
    },
    { 
        name: "Anirudh Ravichander", 
        genre: "Rock", 
        image: "../img/anirudh.png",
        bio: "Anirudh Ravichander (born 16 October 1990), also credited mononymously as Anirudh, is an Indian composer and playback singer who works primarily in Tamil cinema, in addition to Hindi and Telugu films. He has won two Filmfare Awards South, ten SIIMA Awards, six Edison Awards and five Vijay awards.",
        playlist: ["Radioactive", "Believer", "Thunder", "Demons", "Whatever It Takes"]
    },
    { 
        name: "Imagine Dragons", 
        genre: "Pop", 
        image: "../img/imagine dragons.png",
        bio: "Imagine Dragons are an American pop rock band formed in 2008, based in Las Vegas, Nevada, and currently consisting of lead singer Dan Reynolds, guitarist Wayne Sermon, and bassist Ben McKee.[1][2] The band first gained exposure with the release of their single \"It's Time\", followed by their debut album Night Visions (2012), which resulted in the chart-topping singles \"Radioactive\" and \"Demons\". Rolling Stone named \"Radioactive\", which held the record for most weeks charted on the Billboard Hot 100, the \"biggest rock hit of the year\".[3][4][5][6] MTV called them \"the year\'s biggest breakout band\",[7] and Billboard named them their \"Breakthrough Band of 2013\" and \"Biggest Band of 2017\",[8] and placed them at the top of their \"Year in Rock\" rankings for 2013,[9] 2017,[10] and 2018.[11] Imagine Dragons topped the Billboard Year-End \"Top Artists – Duo/Group\" category in 2018.[12]",
        playlist: ["New Rules", "Don't Start Now", "Levitating", "Physical", "Break My Heart"]
    },
    { 
        name: "Shankar Mahadevan", 
        genre: "Classical", 
        image: "../img/shankarmahadevan.png",
        bio: "Shankar Mahadevan (born 3 March 1967) is an Indian singer and composer who is part of the Shankar–Ehsaan–Loy trio that writes music for Indian films. In 2023, he was awarded a honorary doctorate (honoris causa degree) by Birmingham City University.[1]",
        playlist: ["Shape of You", "Perfect", "Thinking Out Loud", "Photograph", "Castle on the Hill"]
    },
    { 
        name: "Sid Sriram", 
        genre: "R&B", 
        image: "../img/sidsriram.png",
        bio: "Sidharth Sriram (born 19 May 1990[1]) is an Indian Carnatic musician, music producer, playback singer. He is an R&B songwriter[2] and has been working in the Tamil, Telugu, Kannada, Malayalam, Hindi, Marathi and English music industry.[3] He regularly collaborates with his sister Pallavi Sriram, a Bharatanatyam dancer, and music director.[4]",
        playlist: ["bad guy", "everything i wanted", "when the party's over", "bury a friend", "my future"]
    },
    { 
        name: "SP Balasubrahmanyam", 
        genre: "Classical", 
        image: "../img/spb.png",
        bio: "Sripathi Panditaradhyula Balasubrahmanyam (4 June 1946 – 25 September 2020), commonly known as SPB or Balu, was an Indian playback singer, television presenter, actor, music composer, dubbing artist, and film producer.[7] He is widely regarded as one of the greatest Indian singers of all time.[11] He predominantly worked in Telugu, Tamil, Kannada, Malayalam, and Hindi films and sang in a total of 16 languages.[12]",
        playlist: ["Blinding Lights", "Starboy", "The Hills", "Can't Feel My Face", "Save Your Tears"]
    },
];

function renderArtistList() {
    const artistList = document.getElementById('artist-list');
    if (!artistList) return;

    artists.forEach(artist => {
        const artistCard = document.createElement('div');
        artistCard.classList.add('artist-card');
        artistCard.innerHTML = `
            <img src="${artist.image}" alt="${artist.name}" data-artist="${artist.name}">
            <h2>${artist.name}</h2>
            <p>${artist.genre}</p>
        `;
        artistCard.querySelector('img').addEventListener('click', navigateToBiography);
        artistList.appendChild(artistCard);
    });
}

function renderArtistGallery() {
    const artistGallery = document.getElementById('artist-gallery');
    if (!artistGallery) return;

    artists.forEach(artist => {
        const img = document.createElement('img');
        img.src = artist.image;
        img.alt = artist.name;
        img.title = artist.name;
        img.dataset.artist = artist.name;
        img.addEventListener('click', navigateToPlaylist);
        artistGallery.appendChild(img);
    });
}

function navigateToBiography(event) {
    const artistName = event.target.dataset.artist;
    window.location.href = `biography.html?artist=${encodeURIComponent(artistName)}`;
}

function navigateToPlaylist(event) {
    const artistName = event.target.dataset.artist;
    window.location.href = `playlist.html?artist=${encodeURIComponent(artistName)}`;
}

function renderBiography() {
    const biographyContainer = document.getElementById('artist-biography');
    if (!biographyContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const artistName = urlParams.get('artist');
    const artist = artists.find(a => a.name === artistName);

    if (artist) {
        biographyContainer.innerHTML = `
            <h1>${artist.name}</h1>
            <img src="${artist.image}" alt="${artist.name}" class="biography-image">
            <p>${artist.bio}</p>
        `;
    } else {
        biographyContainer.innerHTML = '<p>Artist not found.</p>';
    }
}

function renderPlaylist() {
    const playlistContainer = document.getElementById('artist-playlist');
    if (!playlistContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const artistName = urlParams.get('artist');
    const artist = artists.find(a => a.name === artistName);

    if (artist) {
        const playlistHTML = artist.playlist.map(song => `<li>${song}</li>`).join('');
        playlistContainer.innerHTML = `
            <h1>${artist.name}'s Playlist</h1>
            <img src="${artist.image}" alt="${artist.name}" class="playlist-image">
            <ul class="playlist">
                ${playlistHTML}
            </ul>
        `;
    } else {
        playlistContainer.innerHTML = '<p>Artist not found.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderArtistList();
    renderArtistGallery();
    renderBiography();
    renderPlaylist();
});

let currentSongIndex = 0;
let isPlaying = false;
const audioPlayer = document.getElementById('audio-player');
const playPauseButton = document.getElementById('play-pause-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const progressContainer = document.querySelector('.progress-container');
const progressBar = document.querySelector('.progress-bar');
const currentSongDisplay = document.getElementById('current-song');
const surpriseMeButton = document.getElementById('surprise-me-button');

function renderArtistGallery() {
    const artistGallery = document.getElementById('artist-gallery');
    if (!artistGallery) return;

    artists.forEach((artist, index) => {
        const img = document.createElement('img');
        img.src = artist.image;
        img.alt = artist.name;
        img.title = artist.name;
        img.dataset.artist = artist.name;
        img.dataset.index = index;
        img.addEventListener('click', playSong);
        artistGallery.appendChild(img);
    });
}

function playSong(event) {
    const index = parseInt(event.target.dataset.index);
    currentSongIndex = index;
    const artist = artists[index];
    audioPlayer.src = `../audio/${index + 1}.mp3`;
    audioPlayer.play();
    isPlaying = true;
    updatePlayPauseIcon();
    currentSongDisplay.textContent = `Now playing: ${artist.name} - ${artist.playlist[0]}`;
}

function togglePlayPause() {
    if (isPlaying) {
        audioPlayer.pause();
    } else {
        audioPlayer.play();
    }
    isPlaying = !isPlaying;
    updatePlayPauseIcon();
}

function updatePlayPauseIcon() {
    playPauseButton.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
}

function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % artists.length;
    playSongByIndex(currentSongIndex);
}

function playPreviousSong() {
    currentSongIndex = (currentSongIndex - 1 + artists.length) % artists.length;
    playSongByIndex(currentSongIndex);
}

function playSongByIndex(index) {
    const artist = artists[index];
    audioPlayer.src = `../audio/${index + 1}.mp3`;
    audioPlayer.play();
    isPlaying = true;
    updatePlayPauseIcon();
    currentSongDisplay.textContent = `Now playing: ${artist.name} - ${artist.playlist[0]}`;
}

function updateProgressBar() {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = `${progress}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (clickX / width) * duration;
}

function surpriseMe() {
    const randomIndex = Math.floor(Math.random() * artists.length);
    playSongByIndex(randomIndex);
}

// Event Listeners
playPauseButton.addEventListener('click', togglePlayPause);
prevButton.addEventListener('click', playPreviousSong);
nextButton.addEventListener('click', playNextSong);
audioPlayer.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgress);
surpriseMeButton.addEventListener('click', surpriseMe);

audioPlayer.addEventListener('ended', playNextSong);

document.addEventListener('DOMContentLoaded', () => {
    renderArtistList();
    renderArtistGallery();
    renderBiography();
    renderPlaylist();
});