import Charts from '../chart/Charts';

export default function addReport() {
  const mainContent = document.querySelector('#main-content');
  mainContent.innerHTML = '';
  location.hash = 'report';
  const container = document.querySelector('.container');

  const chart = new Charts();

  container.addEventListener('click', () => {
    chart.updateCharts();
  });
}
