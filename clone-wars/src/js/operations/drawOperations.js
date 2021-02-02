import Operations from './Operations';

export default function drawOperations() {
  const main = document.querySelector('#main-content');
  location.hash = 'operations';
  main.innerHTML = '';
  const operations = new Operations();
  operations.renderIn(main);
}
