import './style.css';

function component() {
  const element = document.createElement('div');
  element.innerHTML = 'Webpack config';
  return element;
}

const root = document.querySelector('.root');

root.appendChild(component());
