/* global fetch */


///////////////////////////////////////////////////////////////////
// PLAYER SCRIPT 
///////////////////////////////////////////////////////////////////

"use strict";

// [ ] ADD AND REMOVE ELEMENTS OF "ACORD" WHITH playerPlayList.length OR Chose random color
const bgBody = [
  "#e5e7e9",
  "#ff4545",
  "#f8ded3",
  "#ffc382",
  "#f5eda6",
  "#ffcbdc",
  "#dcf3f3"
];

const body = document.body;
const player = document.querySelector(".player");                       //FULL PLAYER CONTAINER
const playerHeader = player.querySelector(".player__header");           //PLAYER HEADER

const slider = player.querySelector(".slider");                         //#THUMBNAIL SONG CONTAINER (SLIDER)#
const playlistButton = player.querySelector(".playlist");               //<PLAYLIST BUTTON
const playButton = player.querySelector(".play");                       //PLAY AND PAUSE BUTTON
const playIcon = playButton.querySelector("img[alt = 'play-icon']");    //PLAY ICON
const pauseIcon = playButton.querySelector("img[alt = 'pause-icon']");  //PAUSE ICON
const sliderContent = slider.querySelector(".slider__content");         //SONGS THUMBNAILS !ATT Childrens

// 1.0 - CONTROLS CONTAINER
const playerControls = player.querySelector(".player__controls");       //CONTROLS CONTAINER
const backButton = player.querySelector(".back");                       //1.1 BACK BUTTON

const sliderContext = player.querySelector(".slider__context");         //1.2 - AUTOR AND SONG NAME CONTAINER
const sliderName = sliderContext.querySelector(".slider__name");        //1.2.1 - AUTOR NAME
const sliderTitle = sliderContext.querySelector(".slider__title");      //1.2.2 - SONG NAME

const nextButton = player.querySelector(".next");                       //1.3 - NEXT BUTTON
const progres = player.querySelector(".progres");                       //1.4 - PROGRESS BAR
const progresFilled = progres.querySelector(".progres__filled");        //1.4.1 - PROGRESS FILLED


let playerPlayList = player.querySelectorAll(".player__song");          //LI SONG COLLECTION        !ATT
let playerSongs = player.querySelectorAll(".audio");                    //LI SONG AUDIO COLLECTION  !ATT


let left = 0;   //CONTROLA O DESLOCAMENTO DO SLIDER DE THUMBNAILS
let count = 0;  //GUARDA A POSICAO DA MUSICA ATUAL
let isMove = false;
let isPlay = false; //GUARDA SE A MUSICA ATUAL ESTA PAUSADA OU EM EXECUCAO
const sliderWidth = 100;
let song = playerSongs[count];                                          //Current Song  !ATT
let sliderContentLength = playerPlayList.length - 1;                    //slide_size    !ATT



// EXPAND THUMBNAIL
function openPlayer() {
  playerHeader.classList.add("open-header");
  playerControls.classList.add("move");
  slider.classList.add("open-slider");
}


// CLOSE THUMBNAIL
function closePlayer() {
  playerHeader.classList.remove("open-header");
  playerControls.classList.remove("move");
  slider.classList.remove("open-slider");
}

/*
 * Se a função next, recebe 0, a função simplismente
 * considera o contador na posição atual, e se esse
 * nao e igual ao tamanho do slider, atualiza o left
 * considerando com base no valor atual de count,
 * left e a variavel que controla o deslocamento do
 * container das thumbnails, uma div que faz parte
 * da cabecalho do player, entao, essa funcao realiza
 * o deslocamento para a thumbnail da proxima musica,
 * Math.min() e reponsavel por coniderar a multiplicao
 * do sliderContentLength por sliderWidth quando esse
 * valor e maior que o propio left. a funcao tambem
 * incrementa o count e chama o metodo run.
 * [ ] Entender deslocamento da funcao translate3d().
 * [ ] O SONGS THUMBNAILS deve ser atualizado no corpo
 * HTML e por que cada imagem na lista desse container
 * de Thumbnail, deve corresponder a musica que esta
 * na lista.
 */
function next(index) {
  count = index || count;
  
  if (count == sliderContentLength) {
    count = count;
    return;
  }
  
  left = (count + 1) * sliderWidth;
  left = Math.min(left, sliderContentLength * sliderWidth);
  sliderContent.style.transform = `translate3d(-${left}%, 0, 0)`;
  count++;
  run();
}


/*
 * Tem o mesmo comportamento descrito na funcao back
 * porem descontando o counter ate que ele seja 0.
 */
function back(index) {
  count = index || count;
  if (count == 0) {
    count = count;
    return;
  }
  left = (count - 1) * sliderWidth;
  left = Math.max(0, left);
  sliderContent.style.transform = `translate3d(-${left}%, 0, 0)`;
  count--;
  run();
}


/*
 * Aqui acontece a troca de informacoes da musica no
 * container que fica entre os botoes de proximo e
 * anterior.
 * primeiro o 1.2 - AUTOR AND SONG NAME CONTAINER que
 * e a div que guarda o nome da musica e do artista
 * recebe uma animacao de opacidade no qual suavemente
 * as informacoes desaparecem, nesse meio tempo que
 * ocorre a animacao, o texto de dentro do strong
 * ARTIST/AUTOR NAME recebe o nome do artista na posicao
 * da musica atual dentro da array de LI de musica
 * o count, o mesmo acontece para o nome da musica.
 * [ ] Pesquisar por animationName.
 * 
 * ambos os if do nome da musica e artista, verificam
 * se o texto ultrapassou um valor predefinido, se sim,
 * um novo elemento span e criado, e adicionado a classe
 * css .text-wrap a ele,
 * [ ] Estudar elementos dessa classe
 * e entao o ponteiro para o elemento que guarda a infor
 * macao de artista ou nome de musica na dom e esvaziado
 * innerText e textWrap e atribuido a ele.
 * [ ] Entender porque e atribuido duas vezes o conteudo
 * de sliderName ou sliderTitle ao textWrap.
 * [ ] os valores 16 e 18 devem sofrer variacao pois o
 * width do CONTAINER PRINCIPAL class="player" pode ser
 * mudado.
 */
function changeSliderContext() {
  sliderContext.style.animationName = "opacity"; //nao executa
  sliderName.textContent = playerPlayList[count].querySelector(".player__title").textContent; //Atualiza o tido da header
  sliderTitle.textContent = playerPlayList[count].querySelector(".player__song-name").textContent; //nao executa
  
  if (sliderName.textContent.length > 16) {
    const textWrap = document.createElement("span");
    textWrap.className = "text-wrap";
    textWrap.innerHTML = sliderName.textContent + "  " + sliderName.textContent;
    sliderName.innerHTML = "";
    sliderName.append(textWrap);
  }
  if (sliderTitle.textContent.length >= 18) {
    const textWrap = document.createElement("span");
    textWrap.className = "text-wrap";
    textWrap.innerHTML = sliderTitle.textContent + "  " + sliderTitle.textContent;
    sliderTitle.innerHTML = "";
    sliderTitle.append(textWrap);
  }
}

/* Essa funcao e simples, sua responsabilidade e atualizar
 * a troca de cor do backgrioud sempre que for chamado
 * o array bgBody tem o tamanho de elementos cores de acordo
 * com a quantidade de musicas na lista, entao esse array
 * deve variar seu tamanho de acordo com a musica, ou ser
 * fixo, e escolher as cores baseado no percentual de count.
 */
function changeBgBody() {
  body.style.backgroundColor = bgBody[count];
}

/*
 * Essa funcao seleciona uma musica no array da classe 
 * .audio, array que guarda todas as ocorrencias da tag
 * <audio>, de acordo com o count atual, esse array e
 * percorrido e cada item da lista que for diferente do
 * audio atual, e pausado e seu tempo de execucao atual
 * e zerado.
 * isPlay, guarda o estado atual da musica corrente, se
 * a musica anterior ja estava em execucao, isPlay e
 * verdadeiro, assim o song e execetuado com song.play().
 */
function selectSong() {
  song = playerSongs[count];
  for (const item of playerSongs) {
    if (item != song) {
      item.pause();
      item.currentTime = 0;
    }
  }
  if (isPlay)
    song.play();
}

/*
 * a funcao run(), e usada pelos metodos next() e back()
 * a funcao run(), por sua vez, chama tres funcoes, a de
 * troca de contexto de musica que ja foi explicado ant_
 * _eriormente, a de troca do background do body e a fu_
 * _ncao que seleciona a musica. 
 */
function run() {
  changeSliderContext();
  changeBgBody();
  selectSong();
}

/*
 * Funcao usada pelo Listener do playButton, uma tag
 * <button> que tem dois icones dentro, de play e de
 * pause. Basicamente a funcao verifica o estado do
 * atributo pause, de dentro do song, se esse e true,
 * signigica que a musica atual esta pausada, entao
 * no bloco verdadeiro do if, e dado play na musica
 * o icone de play e escondido, e o icone de pause
 * aparece, 
 */
function playSong() {
  if (song.paused) {
    isPlay = true;
    song.play();
    playIcon.style.display = "none";
    pauseIcon.style.display = "block";
  } else {
    isPlay = false;
    song.pause();
    playIcon.style.display = "";
    pauseIcon.style.display = "";
  }
}

/*
 * 
 */
function progresUpdate() {
//  console.log('time');
  const progresFilledWidth = (this.currentTime / this.duration) * 100 + '%';
  progresFilled.style.width = progresFilledWidth;
  if (isPlay && this.duration == this.currentTime) {
    next();
  }
  if (count == sliderContentLength && song.currentTime == song.duration) {
    playIcon.style.display = "block";
    pauseIcon.style.display = "";
    isPlay = false;
  }
}

/*
 * 
 */
function scurb(e) {
  // If we use e.offsetX, we have trouble setting the song time, when the mousemove is running
  const currentTime =
          ((e.clientX - progres.getBoundingClientRect().left) / progres.offsetWidth) *
          song.duration;
  song.currentTime = currentTime;
}

/*
 * 
 */
function durationSongs() {
  let min = parseInt(this.duration / 60);
  if (min < 10)
    min = "0" + min;
  let sec = parseInt(this.duration % 60);
  if (sec < 10)
    sec = "0" + sec;
  const playerSongTime = `${min}:${sec}`;
  this.closest(".player__song")
          .querySelector(".player__song-time")
          .append(playerSongTime);
}

changeSliderContext();


// add events
sliderContext.addEventListener("click", openPlayer);//

sliderContext.addEventListener("animationend", () => (sliderContext.style.animationName = ""));

playlistButton.addEventListener("click", closePlayer);//

nextButton.addEventListener("click", () => {
  next(0);
});

backButton.addEventListener("click", () => {
  back(0);
});

playButton.addEventListener("click", () => {
//  isPlay = true;
  playSong();
});

playerSongs.forEach((song) => {
  
  //[ ] Estudar evento loadeddata
  song.addEventListener('loadeddata', durationSongs);
  
  //[ ] Estudar evento timeupdate
  song.addEventListener('timeupdate', progresUpdate);
});

progres.addEventListener("pointerdown", (e) => {
  scurb(e);
  isMove = true;
});

document.addEventListener("pointermove", (e) => {
  if (isMove) {
    scurb(e);
    song.muted = true;
  }
});

document.addEventListener("pointerup", () => {
  isMove = false;
  song.muted = false;
});

playerPlayList.forEach((item, index) => {
  item.addEventListener("click", function () {
    if (index > count) {
      next(index - 1);
      return;
    }
    if (index < count) {
      back(index + 1);
      return;
    }
  });
});



///////////////////////////////////////////////////////////////////
// REQUEST SONGS AND UPDATE SONG LIST SCRIPT (CONTROLLER)
///////////////////////////////////////////////////////////////////

const sForm = document.querySelector('#searchSongForm');
const playerList = document.querySelector('.player__playlist');
let obj;

sForm.addEventListener('submit', () => {

  event.preventDefault();
  const formData = new FormData(sForm);
  let string = formData.get('songName');
  string = validadeString(string);

  requestData(string);
});


function validadeString(songName)
{
  songName = songName.trim();
  songName = songName.replaceAll(' ', '_');
  songName = songName.replace(/__+/g, '_');
  songName = songName.replace(/^_/g, '');
  songName = songName.replace(/_$/g, '');
  return songName;
}

function requestData(songName)
{

//  console.log('>' + songName);
  const URL_TO_FETCH = `searchsong?songToSearch=${songName}`;

  fetch(URL_TO_FETCH)
          .then(response => response.json())
          .then(result => {
            console.log(result);
            obj = result;
            refreshPlayList();
          })
          .catch(err => {
            console.error('Failed retrieving information', err);
          });
}

function refreshPlayList()
{
  if (obj.length > 0)
  {
    removeSongs();
    addSongs();
  }
}

function removeSongs() {

  while (playerList.childElementCount)
  {
    playerList.removeChild(playerList.lastElementChild);
  }
}


//[ ] REMOVER REDUNDANCIA DE CODIGO (ESSE TRECHO FAZ PARTE DO CONTROLLER
function updateListeners()
{
  playerSongs.forEach((song) => {
    song.addEventListener("loadeddata", durationSongs);
    song.addEventListener("timeupdate", progresUpdate);
  });

  playerPlayList.forEach((item, index) => {
    item.addEventListener("click", function () {
      if (index > count) {
        next(index - 1);
        return;
      }
      if (index < count) {
        back(index + 1);
        return;
      }
    });
  });
}

function att() {
  playerPlayList = player.querySelectorAll(".player__song"); //att
  playerSongs = player.querySelectorAll(".audio");           //att
  sliderContentLength = playerPlayList.length - 1;
  count = 0;
  song = playerSongs[count];
  updateListeners();
  run();
}

function addSongs() {

  let string;
  while (obj.length)
  {
    string = obj.pop();
    playerList.insertAdjacentHTML('beforeend', `<li class="player__song"><img class="player__img img" src="http://physical-authority.surge.sh/imgs/1.jpg"alt="cover"/><p class="player__context"><b class="player__song-name">${string}</b><span class="flex"><span class="player__title">Victor&Leandro</span><span class="player__song-time"></span></span></p><audio class="audio" src="songs/${string}"></audio></li>`);
  }
  att();
}


