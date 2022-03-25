/* global fetch, item */


///////////////////////////////////////////////////////////////////
// PLAYER SCRIPT 
///////////////////////////////////////////////////////////////////

"use strict";
// [ ] ADD AND REMOVE ELEMENTS OF "ACORD" WHITH playerPlayList.length OR Chose random color
//ATUALIZAR - MODIFICA DE ACORDO COM O TAMANHO DA MUSICA
const bgBody = [
  "#e5e7e9",
  "#ff4545",
  "#f8ded3",
  "#ffc382",
  "#f5eda6",
  "#ffcbdc",
  "#dcf3f3"
];
//ATUALIZAR - MODIFICA DE ACORDO COM O TAMANHO DA MUSICA


const body = document.body;
const player = document.querySelector(".player");                       //FULL PLAYER CONTAINER
const playerHeader = player.querySelector(".player__header");           //PLAYER HEADER

const slider = player.querySelector(".slider");                         //#THUMBNAIL SONG CONTAINER (SLIDER)#
const playlistButton = player.querySelector(".playlist");               //<PLAYLIST BUTTON
const playButton = player.querySelector(".play");                       //PLAY AND PAUSE BUTTON
const playIcon = playButton.querySelector("img[alt = 'play-icon']");    //PLAY ICON
const pauseIcon = playButton.querySelector("img[alt = 'pause-icon']");  //PAUSE ICON


//ATUALIZAR - MODIFICA DE ACORDO COM O TAMANHO DA MUSICA
const sliderContent = slider.querySelector(".slider__content");         //SONGS THUMBNAILS !ATT Childrens
//ATUALIZAR - MODIFICA DE ACORDO COM O TAMANHO DA MUSICA


// 1.0 - CONTROLS CONTAINER
const playerControls = player.querySelector(".player__controls");       //CONTROLS CONTAINER
const backButton = player.querySelector(".back");                       //1.1 BACK BUTTON

const sliderContext = player.querySelector(".slider__context");         //1.2 - AUTOR AND SONG NAME CONTAINER
const sliderName = sliderContext.querySelector(".slider__name");        //1.2.1 - AUTOR NAME
const sliderTitle = sliderContext.querySelector(".slider__title");      //1.2.2 - SONG NAME

const nextButton = player.querySelector(".next");                       //1.3 - NEXT BUTTON
const progres = player.querySelector(".progres");                       //1.4 - PROGRESS BAR
const progresFilled = progres.querySelector(".progres__filled");        //1.4.1 - PROGRESS FILLED
const sliderWidth = 100;

let playerPlayList = player.querySelectorAll(".player__song");          //LI SONG COLLECTION        !ATT
let playerSongs = player.querySelectorAll(".audio");                    //LI SONG AUDIO COLLECTION  !ATT



let isMove = false;
let isPlay = false; //GUARDA SE A MUSICA ATUAL ESTA PAUSADA OU EM EXECUCAO

//Modularizar
let left;   //CONTROLA O DESLOCAMENTO DO SLIDER DE THUMBNAILS
let count;  //GUARDA A POSICAO DA MUSICA ATUAL
let song;                                                               //Current Song  !ATT
let sliderContentLength;                                                //slide_size    !ATT
//Modularizar

const updateValues = () => {
  left = 0;   //CONTROLA O DESLOCAMENTO DO SLIDER DE THUMBNAILS
  count = 0;  //GUARDA A POSICAO DA MUSICA ATUAL
  song = playerSongs[count];                                            //Current Song  !ATT
  sliderContentLength = playerPlayList.length - 1;                      //slide_size    !ATT
};
updateValues();

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
  if (playerPlayList.length) {
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
 * Funcao atribuida a cada som da tag <audio>
 * No Array de musicas playerSongs, essa funcao e
 * executada a cada segundo passado da musica, entao
 * a variaviavel progresFilledWidth guarda o valor
 * do calculo do atribuito do objeto this currentTime
 * dividido pelo atributo duracao, multiplicado por
 * 100, assim, obtem-se o quanto ja foi executado da
 * musica em percentual, progresFilledWidth e entao
 * usado para atualizar o width da div da classe
 * progres__filled.
 * Mais duas verificacoes sao realizadas o primeiro if
 * se a musica esta em execucao e seu tempo decorrido
 * atual e igual a o tempo de duracao do arquivo de som
 * se for, o next e chamado para ir para proxima musica
 * se a musica ja for a ultima, a funcao next() nao
 * realiza acao alguma, O segundo if serve justamente
 * para esse caso, exibindo o botao de play, e escondendo
 * o botao de pause, isPlay, tambem e atualizado para
 * false.
 */
function progresUpdate() {

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
 * Funcao scurb, funcao usada no Listeners pointerdown
 * e pointermove, responsavel por tambem modificar o tempo
 * atual da musica, so que agora considerando o clientX do
 * mouse do evento e passado por parametro pelo Listener
 * que a chama, esse evento e um objeto chamado PointerEvent
 * que guarda varias informacoes sobre o ponteiro do mouse
 * e uma dessas informacoes e o clientX, que subtraido pelo
 * progres.getBoundingClientRect().left que e um atributo 
 * do objeto rect de um elemento HTML, onde guarda a 
 * distancia da esquerda em relacao a esquerda mais extrema
 * da viewport (Iniciando de x:0), divido pelo tamanho do 
 * elemento html obtem-se o percentual relativo a barra de 
 * progresso na posicao atual da bolinha. Esse percentual 
 * e multiplicado pela duracao da musica (Em segundos),  
 * assim se obtem o currentTime relativo, entao, o atribuito 
 * currentTime da musica em contexto, e atualizado.
 */
function scurb(e) {
  // If we use e.offsetX, we have trouble setting the song time, when the mousemove is running
  console.log(e.clientX);

//  const currentTime = ((e.clientX - progres.getBoundingClientRect().left) / progres.offsetWidth) * song.duration;
  const currentTime = ((e.clientX - progres.getBoundingClientRect().left) / progres.getBoundingClientRect().width) * song.duration;
  song.currentTime = currentTime;
}

/**
 * Funcao usada pelo evento, loadeddata, evento atribuido
 * a cada objeto audio do array de audios playerSongs.
 * Responsavel por atualizar o texto de duracao da span
 * de classe .player__song-time dentro de cada li de musica
 * Inicialmente, e atribuido a uma variavel min, o valor
 * convertido de segundos para minutos do objeto this, que
 * e o objeto audio enviado no disparo do event loadeddata
 * em questao, um If e feito pra quando a minutagem e menor
 * que 10, adicionar um zero. 
 * [ ] - (Tratar isso na formatacao do Front-End);
 * Depois, calcula-se os segundos pegando o resto da divisao,
 * tambem adiciona o zero.
 * a variavel playerSongTime recebe ambos os valores.
 * 
 * "O closest()método percorre o Element e seus pais (em direção
 * a raiz do documento) ate encontrar um no que corresponda
 * a string do seletor fornecida. Retornara a si mesmo ou o 
 * ancestral correspondente. Se esse elemento nao existir, 
 * ele retornara null"
 * 
 * Dito isso acima, o elemento pai da tag <audio> passada
 * pelo evento, e o elemento <li> da musica, que tem a classe
 * ".player__song", a partir desse elemento pai, faz-se uma
 * uma busca pelo elemento que guarda a duracao, que e o span
 * com classe "player__song-time", entao, atribui-se a ele
 * o já antes calculado playerSongTime, com o metodo append().
 */
function durationSongs() {
  let min = parseInt(this.duration / 60);
  if (min < 10)
    min = "0" + min;
  let sec = parseInt(this.duration % 60);
  if (sec < 10)
    sec = "0" + sec;
  const playerSongTime = `${min}:${sec}`;
  this.closest(".player__song").querySelector(".player__song-time").append(playerSongTime);
}

/**
 * A unica funcao que e chamada, no carregamento
 * do arquivo js, porem, essa funcao nao deve ser
 * chamada quando a lista de musicas estiver vazia.
 */
changeSliderContext();

/**
 * Evento de click adicionado ao container slider
 * Context, onde fica o nume do artista e da musica
 * Ao clicar, a funcao openPlayer e chamada.
 * openPlayer adiciona classes CSS nesse container
 * que manipulam seu tamanho.
 */
sliderContext.addEventListener("click", openPlayer);

/**
 * Evento que executa a funcao que remove a animacao
 * do sliderContext, quando uma animacao que esta em
 * execucao no mesmo, e encerrada. Ou seja, animation
 * Name poderia tambem receber none, oque desligaria
 * a animacao.
 */
sliderContext.addEventListener("animationend", () => (sliderContext.style.animationName = ""));


/**
 * Adiciona um evento de click no botao de playlist que
 * quando esse clicado, a funcao closePlayer remove as 
 * mesmas clases adicionadas pelo openPlayer.
 */
playlistButton.addEventListener("click", closePlayer);//


/**
 * Adiciona um evento de click no botao next, que chama
 * a funcao de troxa next().
 */
nextButton.addEventListener("click", () => {
  next(0);
});

/**
 * Adiciona um evento de click no botao next, que chama
 * a funcao de troxa back().
 */
backButton.addEventListener("click", () => {
  back(0);
});

/**
 * Adiciona um evento de click, no botao de play e pause
 * que chama a funcao playSong, responsavel por dar play
 * ou pause na musica.
 */
playButton.addEventListener("click", () => {
  playSong();
});

/**
 * Adiciona dois eventos a cada tag <audio> da lista de
 * musicas, Os eventos sao descritos abaixo.
 */
const addAudioTagListeners = () => {
  playerSongs.forEach((song) => {

    /**
     * loadeddata e um dos 7 eventos de estado referente a uma
     * midia:
     * 1 - loadstart 
     * 2 - durationchange
     * 3 - loadedmetadata
     * 4 - loadeddata
     * 5 - progress
     * 6 - canplay
     * 7 - canplaythrough
     * [ ] - Estudar todos esses eventos.
     * 
     * Entao, esse evento adicionado a um Listener (Escutador),
     * executa uma funcao, sempre que o primeiro pedaco da midia
     * e carregado, logo apos a contagem de duracao e metadados
     * estarem prontos, assim, esse pode ser um evento usado para
     * atualizar a duracao de alguma midia no front-end por exemplo
     * ja que ten-se essa informacao pronta, no momento do disparo
     * causado pelo Event loadeddata (Traducao: Dados Carregados,
     * dados esses metadados... duracao... nao a midia toda em si).
     */
    song.addEventListener('loadeddata', durationSongs);

    /**
     * O evento timeupdate, e um evento que rastreia o andamento
     * do tempo de uma midia em execucao, depende da velocidade da
     * maquina que esta executando. 
     * Esse evento, quando adicionado a um listener, dispara a
     * funcao atribuida ao listener a cada instante, normalmente
     * a cada segundo da musica, mas pode variar.
     */
    song.addEventListener('timeupdate', progresUpdate);
  });
};
addAudioTagListeners();
/**
 * Evento pointerdown, e o evento que captura quando um botao
 * do mouse e precionado, porem esse evento vale somente para
 * a div progres. o evento listener dispara uma chamada para
 * scurb quando o click na div de progresso ocorre.
 */
progres.addEventListener("pointerdown", (e) => {
  scurb(e);
  isMove = true;
});

/**
 * Evento pointermove, evento que captura o movimento do mouse
 * esse evento executa diversas vezes, visto que ele e atribuido
 * ao contexto do document, o qual abrange toda a tela disponivel.
 */
document.addEventListener("pointermove", (e) => {
  if (isMove) {
    scurb(e);
    song.muted = true;
  }
});

/**
 * Evento pointerup, evento que captura quando o mouse
 * e suspenso, ou seja, quando e solto o botao do mause.
 */
document.addEventListener("pointerup", () => {
  isMove = false;
  song.muted = false;
});

/**
 * playerPlayList
 * Esse loop forEach percorre cada musica li da lista de
 * musicas adicionando um evento de click e um indice 
 * que comeca de 0 para a primeira musica, esse listener
 * serve para pular musicas com base no indice de cada uma
 * entao, a funcao next enxerga quando um indice e passado
 * e esse indice sendo diferente de um valor falsy e 
 * atribuido dentro da funcao next ou back.
 */

const addPlayListeners = () => {
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
};
addPlayListeners();

///////////////////////////////////////////////////////////////////
// REQUEST SONGS AND UPDATE SONG LIST SCRIPT (CONTROLLER)
///////////////////////////////////////////////////////////////////

const sForm = document.querySelector('#searchSongForm');
const resetBtn = document.querySelector('form button[type="reset"]');
const playAll = sForm.querySelector('button[type="button"]');
let currentList = player.querySelector('#current_list');
let currentThumbnailsList = slider.querySelector('#current_thumbnails_list');

let lastSearchKeySubmited = '';
let obj;


function removeTempList()
{
  const tempList = player.querySelector('#temp_list');
  if (tempList) {
    tempList.remove(); //pode dar erro
  }
}

function makeAndAppendNewSliderContent()
{
  currentThumbnailsList.remove();
  const newThumbsContainer = document.createElement('div');
  newThumbsContainer.classList.add('slider__content');
  newThumbsContainer.id = 'current_thumbnails_list';
  
  let string;
  for(const item of currentList.children)
  {
    string = item.querySelector('img').src;
    newThumbsContainer.insertAdjacentHTML('beforeend', `<img class="img slider__img" src="${string}" alt="cover"/>`);
  }
  currentThumbnailsList = newThumbsContainer;
  slider.appendChild(newThumbsContainer);
}
function restoreList() {

  if (currentList.hidden)
  {
    /**
     * Nesta linha, da para guardar a lista, nao
     * optada pelo usuario, simulando um cache, 
     * caso o usuario faca a mesma busca!
     */
    removeTempList();
    currentList.hidden = false;
  }
}

/**
 * playCurrentList()
 * Funcao que ira atualizar os listeners para
 * a lista de musicas atual. ou seja, essa
 * funcao sera atribuida para o botao "Tocar todas
 * as musicas" que seram as musicas retornadas pelo
 * filtro da busca.
 */
function playDisplayedList()
{
  // play Current List sera estritamento para a lista de id .temp_list
  /**
   * [ ] ira remover a lista atual. 
   * [ ] adicionar e transformar a lista temporaria na lista atual.
   * [ ] Modificar as variaveis dependentes e os listeners
   * [ ] Esse metodo tambem vai remover os listeners PopUp, ja adicionado
   * nos items temporarios, que seram atribuidos
   * a cada li. No lugar do evento de tocar, sera o evento PopUp que abre
   * uma janela para poder adicionar a fila de execucao.
   */
  const tempList = player.querySelector('#temp_list');
  if (tempList && tempList.childElementCount) {
    currentList.remove();
    currentList = tempList;
    currentList.id = 'current_list';
    playerPlayList = currentList.querySelectorAll(".player__song");
    playerSongs = currentList.querySelectorAll(".audio");
    addPlayListeners();
    addAudioTagListeners();
    updateValues();
    makeAndAppendNewSliderContent();
    run();
  }
}

function appendTempList() {

  let string;
  const newUnorderedList = document.createElement('ul');
  newUnorderedList.classList.add('player__playlist', 'list');
  newUnorderedList.id = 'temp_list';

  let i = 1;
  while (obj.length)
  {
    string = obj.pop();
    newUnorderedList.insertAdjacentHTML('beforeend', `<li class="player__song"><img class="player__img img" src="resources/${i++}.jpg"alt="cover"/><p class="player__context"><b class="player__song-name">${string}</b><span class="flex"><span class="player__title">Victor&Leandro</span><span class="player__song-time"></span></span></p><audio class="audio" src="songs/${string}"></audio></li>`);
    //adiciona listener popup de colocar na fila
  }
  removeTempList();
  player.appendChild(newUnorderedList);
  /**
   * somente se o usuario optar por tocar musicas retornadas ou adicionar uma musica na fila, os eventos teram de serem atualizados
   * Apos nova UL criada, caso o usuario opte por tocala,
   * os listeners e as demais variaveis devem ser 
   * atualizados na nova lista a primeira musica da 
   * lista deve ser iniciada
   * (Caso a aleatoriedade, que e uma futura feature
   * nao esteja ativada).
   * [ ] Em cada item da nova lista, deve ser adicionado
   * um botao, para adicionar musica a vila, entao, um novo
   * recurso de listener deve ser adicionado somente nessa
   * nova lista.
   */
}

function refreshPlayList()
{
  if (obj.length)
  {
    currentList.hidden = true;
    currentThumbnailsList.hidden = true;
    appendTempList();
  }
}

function requestData(keyString)
{
  const URL_TO_FETCH = `searchsong?songToSearch=${keyString}`;

  fetch(URL_TO_FETCH)
          .then(response => response.json())
          .then(result => {
            console.log(result);
            obj = result;
            refreshPlayList();
          })
          .catch(err => {
            console.error('Failed retrieving information: ', err);
          });
}

function validadeString(songName)
{
  songName = songName.trim();
  songName = songName.replaceAll(' ', '_');
  songName = songName.replace(/__+/g, '_');
  songName = songName.replace(/^_/g, '');
  songName = songName.replace(/_$/g, '');
  return songName;
}

sForm.addEventListener('submit', () => {

  event.preventDefault();
  const formData = new FormData(sForm);
  let keyString = formData.get('songName');
  keyString = validadeString(keyString);

  if (lastSearchKeySubmited !== keyString) {
    lastSearchKeySubmited = keyString;
    requestData(keyString);
  }
});


resetBtn.addEventListener('click', restoreList);
playAll.addEventListener('click', playDisplayedList);
