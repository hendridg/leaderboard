/* eslint-disable comma-dangle */
import Players from './modules/index.js';
import './style.css';

const form = document.querySelector('.form-input');
const btnRefresh = document.querySelector('.btn-refresh');
const responsePost = document.querySelector('.response-post');
const [name, score] = form.elements;
const objPlayers = new Players();
const urlNewGame = `
  https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/`;
const nameGame = { name: "Hendrid's cool name" };

if (localStorage.savedPlayers) {
  objPlayers.players = JSON.parse(localStorage.getItem('savedPlayers'));
}

async function keyNewGameAPIs() {
  const response = await fetch(urlNewGame, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    body: JSON.stringify(nameGame),
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data.result.slice(14, 34);
}

const keyGame = keyNewGameAPIs();

async function getAPIs() {
  const response = await fetch(`
    https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${keyGame}/scores`);
  const data = await response.json();
  objPlayers.players = data.result;
  objPlayers.displayPlayers();
  return data.result;
}

async function postPlayer(newPlayer) {
  const response = await fetch(
    `
  https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${keyGame}/scores`,
    {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      body: JSON.stringify(newPlayer),
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await response.json();
  return data.result;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newPlayer = {
    user: name.value,
    score: score.value,
  };
  responsePost.textContent = await postPlayer(newPlayer);
  name.value = '';
  score.value = '';
  setTimeout(() => {
    responsePost.textContent = '';
  }, 5000);
});

btnRefresh.addEventListener('click', getAPIs);
objPlayers.displayPlayers();
objPlayers.populateFields();
