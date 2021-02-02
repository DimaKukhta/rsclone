function drawTable() {
  const mainContent = document.querySelector('#main-content');
  mainContent.innerHTML = '';
  location.hash = 'hot-keys';
  const table = document.createElement('p');
  table.textContent = 'Тут будет таблица)';
  table.style.color = 'red';
  mainContent.append(table);
}

export default function drawHotKeys() {
  drawTable();
}
