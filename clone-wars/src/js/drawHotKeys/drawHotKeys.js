function drawTable() {
  const mainContent = document.querySelector('#main-content');
  mainContent.innerHTML = '';

  const table = document.createElement('p');
  table.textContent = 'Тут будет таблица)';
  table.style.color = 'red';
  mainContent.append(table);
}

export default function drawHotKeys() {
  drawTable();
}
