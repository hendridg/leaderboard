/* eslint-disable comma-dangle */
import Players from './modules/index.js';
import './style.css';

let keyGame;
const form = document.querySelector('.form-input');
const btnRefresh = document.querySelector('.btn-refresh');
const responsePost = document.querySelector('.response-post');
const listPlayers = document.querySelector('.list-players');
const spinner = document.querySelector('.spinner');
const [name, score] = form.elements;
const objPlayers = new Players();
const urlNewGame = `
  https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/`;
const nameGame = { name: "Hendrid's cool name" };

if (localStorage.savedPlayers) {
  objPlayers.players = JSON.parse(localStorage.getItem('savedPlayers'));
}

const keyNewGameAPIs = async () => {
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
};

if (localStorage.keyGame) {
  keyGame = localStorage.getItem('keyGame');
} else {
  const loadKey = async () => {
    keyGame = await keyNewGameAPIs();
    localStorage.setItem('keyGame', keyGame);
  };
  loadKey();
}

const getAPIs = async () => {
  listPlayers.classList.add('hidden');
  spinner.classList.remove('hidden');
  const response = await fetch(`
    https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${keyGame}/scores`);
  const data = await response.json();
  objPlayers.players = data.result;
  listPlayers.classList.remove('hidden');
  spinner.classList.add('hidden');
  objPlayers.displayPlayers();
  return data.result;
};

const postPlayer = async (newPlayer) => {
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
};

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
