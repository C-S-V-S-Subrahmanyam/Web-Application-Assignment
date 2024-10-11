const music = new Audio('audio/1.mp3');

//create Array

const songs = [
    {
        id: '1',
        songName: `Faded
                        <div class="subtitle">Alan Walker</div>`,
        poster: "img/1.png",
    },
    {
        id: '2',
        songName: `Master the Blaster
                        <div class="subtitle">Anirudh Ravichander</div>`,
        poster: "img/2.png",
    },
    {
        id: '3',
        songName: `Shiva Thandava Stotram
                        <div class="subtitle">Uma Mohan</div>`,
        poster: "img/3.png",
    },
    {
        id: '4',
        songName: `Govindha Hari Govindha
                        <div class="subtitle">Dhanunjay and Sreenidhi</div>`,
        poster: "img/4.png",
    },
    {
        id: '5',
        songName: `Ayyappa Slokam
                        <div class="subtitle">Sreekanth S Raj</div>`,
        poster: "img/5.png",
    },
    {
        id: '6',
        songName: `Lord Shiva Song
                        <div class="subtitle">Devotional</div>`,
        poster: "img/6.png",
    },
    {
        id: '7',
        songName: `Suzume
                        <div class="subtitle">Radwimps: Keiko Masuda</div>`,
        poster: "img/7.png",
    },
    {
        id: '8',
        songName: `Keejo Kesari Ke lal
                        <div class="subtitle">Lakhbir Singh</div>`,
        poster: "img/8.png",
    },
    {
        id: '9',
        songName: `Fear Song
                        <div class="subtitle">Anirudh Ravichander</div>`,
        poster: "img/9.png",
    },
    {
        id: '10',
        songName: `Chinnari Thalli
                        <div class="subtitle">Satya Prakash</div>`,
        poster: "img/10.png",
    },
    {
        id: '11',
        songName: `Vakrathunda Mahakaya
                        <div class="subtitle">S P Bala Subrahmanyam</div>`,
        poster: "img/11.png",
    },
    {
        id: '12',
        songName: `Ordinary Person
                        <div class="subtitle">Anirudh Ravichander</div>`,
        poster: "img/12.png",
    },
    {
        id: '13',
        songName: `Master the Blaster
                        <div class="subtitle">Anirudh Ravichander</div>`,
        poster: "img/13.png",
    },
    {
        id: '14',
        songName: `Etthara Janda
                        <div class="subtitle">Vishal Mishra, Prudvi Chandra, MM Keeravaani, Sahithi Chaganti, Harika Narayan</div>`,
        poster: "img/14.png",
    },
    {
        id: '15',
        songName: `Maayon title track
                        <div class="subtitle">Ilaiyaraja</div>`,
        poster: "img/15.png",
    },
    {
        id: '16',
        songName: `Ramam raghavam
                        <div class="subtitle">M.M Keeravaani</div>`,
        poster: "img/16.png",
    },
    {
        id: '17',
        songName: `Kutty Story
                        <div class="subtitle">Anirudh Ravichander</div>`,
        poster: "img/17.png",
    }
]

Array.from(document.getElementsByClassName('songItem')).forEach((element, index) => {
    element.getElementsByTagName('img')[0].src = songs[index].poster;
    element.getElementsByTagName('h5')[0].innerHTML = songs[index].songName;
})

let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];
masterPlay.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
    } else {
        music.pause();
        masterPlay.classList.remove('bi-pause-fill');
        masterPlay.classList.add('bi-play-fill');
        wave.classList.remove('active2');
    }
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('playlistPlay')).forEach((element, index) => {
            element.classList.add('bi-play-circle-fill');
            element.classList.remove('bi-pause-circle-fill');
    })
}

const makeAllBackgrounds = () => {
    Array.from(document.getElementsByClassName('songItem')).forEach((element, index) => {
            element.style.background = "rgb(105, 105, 170, 0)";
    })
}


let index = 0;
let poster_master_play= document.getElementById('poster_master_play');
let title= document.getElementById('title');
Array.from(document.getElementsByClassName('playlistPlay')).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        index= e.target.id;
        makeAllPlays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        music.src= `audio/${index}.mp3`;
        poster_master_play.src= `img/${index}.png`;
        music.play();
        let song_title = songs.filter((ele)=> {
            return ele.id == index;
        })

        song_title.forEach((ele) => {
            let {songName} = ele;
            title.innerHTML= songName;
        })
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
        music.addEventListener('ended', () => {
            masterPlay.classList.remove('bi-pause-fill');
            masterPlay.classList.add('bi-play-fill');
            wave.classList.remove('active2');
        })
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
    })
})

let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);
    if(sec<10){
        sec = `0${sec}`;
    }
    currentEnd.innerHTML = `${min}:${sec}`;

    let min1 = Math.floor(music_curr/60);
    let sec1 = Math.floor(music_curr%60);
    if(sec1<10){
        sec1 = `0${sec1}`;
    }
    currentStart.innerHTML = `${min1}:${sec1}`;

    let progressbar = parseInt((music.currentTime/music.duration)*100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
})

seek.addEventListener('change', () => {
    music.currentTime = seek.value * music.duration/100;
})

music.addEventListener('ended', () => {
    masterPlay.classList.add('bi-play-fill');
    masterPlay.classList.remove('bi-pause-fill');
    wave.classList.remove('active2');
})

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', () => {
    if(vol.value==0){
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if(vol.value>0){
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if(vol.value>50){
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.add('bi-volume-up-fill');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol.value/100;
})

let back= document.getElementById('back');
let next= document.getElementById('next');

back.addEventListener('click', () => {
    index -= 1;
    if(index<1){
        index=Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src= `audio/${index}.mp3`;
        poster_master_play.src= `img/${index}.png`;
        music.play();
        let song_title = songs.filter((ele)=> {
            return ele.id == index;
        })

        song_title.forEach((ele) => {
            let {songName} = ele;
            title.innerHTML= songName;
        })
        makeAllPlays();
        document.getElementById(`${index}`).classList.remove('bi-play-fill');
        document.getElementById(`${index}`).classList.add('bi-pause-fill');
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
})

next.addEventListener('click', () => {
    index -= 0;
    index += 1;
    if(index>Array.from(document.getElementsByClassName('songItem')).length){
        index=1;
    }
    music.src= `audio/${index}.mp3`;
        poster_master_play.src= `img/${index}.png`;
        music.play();
        let song_title = songs.filter((ele)=> {
            return ele.id == index;
        })

        song_title.forEach((ele) => {
            let {songName} = ele;
            title.innerHTML= songName;
        })
        makeAllPlays();
        document.getElementById(`${index}`).classList.remove('bi-play-fill');
        document.getElementById(`${index}`).classList.add('bi-pause-fill');
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
})

let left_scroll = document.getElementById('left_scroll');
let right_scroll = document.getElementById('right_scroll');
let pop_song = document.getElementsByClassName('pop_song')[0];

left_scroll.addEventListener('click', () => {
    pop_song.scrollLeft -= 330;
})

right_scroll.addEventListener('click', () => {
    pop_song.scrollLeft += 330;
})


let left_scrolls = document.getElementById('left_scrolls');
let right_scrolls = document.getElementById('right_scrolls');
let item = document.getElementsByClassName('item')[0];

left_scrolls.addEventListener('click', () => {
    item.scrollLeft -= 330;
})

right_scrolls.addEventListener('click', () => {
    item.scrollLeft += 330;
})