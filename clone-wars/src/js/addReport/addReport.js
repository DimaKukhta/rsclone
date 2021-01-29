export default function addReport() {
  const mainContent = document.querySelector('#main-content');
  mainContent.innerHTML = '';

  const text = document.createElement('p');
  text.textContent = 'Тут бы сделать две диаграммы) Папка и файл addReport';
  text.style.color = 'red';
  mainContent.append(text);
}