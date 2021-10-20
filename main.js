let songs = [
  {
    title: "lorem bal",
    atist: "halar po",
    imge: 1,
    musi: "music1"
  },
  {
    title: "lorem heda",
    atist: "heda pro",
    imge: 2,
    musi: "music2"
  },
  {
    title: "nam nai",
    atist: "jani na",
    imge: 3,
    musi: "music3"
  }
  ];

let playBtn = document.getElementById('playBtn');
let music = document.getElementById('music');
let faplay = document.querySelector('.fa-play');
let mainImg = document.getElementById('mimg');
let songName = document.querySelector('.songName');
let atistN = document.querySelector('.atistN');
let fabackward = document.querySelector('.fa-backward');
let faforward = document.querySelector('.fa-forward');
let innerpro = document.querySelector('.innerpro');
let shuruTime = document.querySelector('#shuru');
let totaltim = document.querySelector('#totaltim');
let bgpro = document.querySelector('.bgpro');


  let isPlaying = false;

 let playFun = () => {
  isPlaying = true;
  music.play();
  faplay.classList.replace('fa-play', 'fa-pause');
  mainImg.setAttribute('class', 'ani');
};

let puseFun = () => {
  isPlaying = false;
  faplay.classList.replace('fa-pause', 'fa-play');
  music.pause();
  mainImg.classList.remove('ani');
};


playBtn.addEventListener('click', () => {
  isPlaying ? puseFun() : playFun();
});



let allActiv = (songs) => {
  songName.textContent = songs.title;
  atistN.textContent = songs.atist;
  mainImg.src =  'img/' + songs.imge + '.jpg';
  music.src = `${songs.musi}.mp3`;
}


let sngCount = 0;

let nexetsong = () => {
  sngCount = (sngCount + 1) % songs.length;
  allActiv(songs[sngCount]);
  playFun();
}

let prevsong = () => {
  sngCount = (sngCount - 1 +  songs.length) % songs.length;
  allActiv(songs[sngCount]);
  playFun();
}

music.addEventListener('timeupdate', (e) => {
  let {currentTime , duration} = e.srcElement;
  let porgrs = (currentTime / duration) * 100;
  innerpro.style.width = `${porgrs}%`;
  // shuruTime.textContent = 

  let total_min = Math.floor(duration / 60);
  let total_sec = Math.floor(duration % 60);
  if(duration){
  totaltim.textContent = `${total_min}:${total_sec}`;}

  let shuru_min = Math.floor(porgrs / 60);
  let shuru_sec = Math.floor(porgrs % 60);
  if(shuru_sec < 10){
    shuru_sec = `0${shuru_sec}`;
  }
  if(porgrs){
  shuruTime.textContent = `${shuru_min}:${shuru_sec}`;}
});

bgpro.addEventListener('click', (e) => {
  let {duration} = music;
// console.log(e);
  let movepasar =
   (e.offsetX / e.srcElement.clientWidth) * duration;

   music.currentTime = movepasar;
});

music.addEventListener('ended', nexetsong);

faforward.addEventListener('click', nexetsong);
fabackward.addEventListener('click', prevsong);


