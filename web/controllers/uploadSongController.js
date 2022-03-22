/* global fetch, formData */

const frm = document.querySelector('form');

frm.addEventListener('submit', () => {
  event.preventDefault();

  let songName = "";
  let formData = new FormData(frm);

  songName = ''.concat(formData.get('songName'), '_', formData.get('musicGenre'), '_', formData.get('songAuthor'), '.mp3');
  songName = songName.trim();
  songName = songName.replaceAll(' ', '_');
  songName = songName.replace(/__+/g, '_');
  songName = songName.replace(/^_/g, '');
  songName = songName.replace(/_$/g, '');

  formData.append('concatSongName', songName);
  formData.delete('songName');
  formData.delete('songAuthor');
  formData.delete('musicGenre');

  for (let pair of formData.entries()) {
    console.log(`"${pair[0]}" - "${pair[1]}"`);
  }
  sendData(formData);
});


function sendData(formData)
{
  const URL_TO_FETCH = 'upsong';

  fetch(URL_TO_FETCH, {
    method: 'post',
    body: formData
  }).then(function (response) {
    console.log(response.text());
  });
}