import Players from './modules/index.js';
import './style.css';

const form = document.querySelector('.form-input');
const [name, score] = form.elements;
const objPlayers = new Players();

if (localStorage.savedPlayers) {
  objPlayers.players = JSON.parse(localStorage.getItem('savedPlayers'));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newPlayer = {
    name: name.value,
    score: score.value,
  };
  objPlayers.addPlayer(newPlayer);
  name.value = '';
  score.value = '';
});

objPlayers.displayPlayers();
objPlayers.populateFields();
