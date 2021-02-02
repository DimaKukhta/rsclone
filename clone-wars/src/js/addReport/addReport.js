import Charts from '../chart/Charts';

export default function addReport() {
  const mainContent = document.querySelector('#main-content');
  location.hash = 'report';
  mainContent.innerHTML = '';
  const container = document.querySelector('.container');

  const chart = new Charts();

  container.addEventListener('click', () => {
    chart.updateCharts();
  });
}
