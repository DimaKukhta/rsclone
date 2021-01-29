import Chart from 'chart.js';
import { getOperationsForChart } from '../data/getData';

function getInterval() {
  const intervalSelect = document.querySelector('#interval-select');
  return intervalSelect.value;
}

function getStamp() {
  const currentInterval = document.querySelector('#interval');
  return +currentInterval.dataset.date;
}

function getLabels(type) {
  const result = getOperationsForChart(type, getInterval(), getStamp());
  const keys = Object.keys(result);
  return keys.length ? keys : ['No-data'];
}

function getData(type) {
  const result = getOperationsForChart(type, getInterval(), getStamp());
  const values = Object.values(result);
  return values.length ? values : [0];
}

export default class Charts {
  constructor() {
    this.createCanvas();
    this.createCharts();
  }

  // eslint-disable-next-line class-methods-use-this
  createCanvas() {
    const mainContainer = document.querySelector('#main-content');
    const htmlCodeCanvas = `
        <div class="chart-container">
            <div class="first-chart">
                <canvas id="myChart1"></canvas>
            </div>
            <div class="second-chart">
                <canvas id="myChart2"></canvas>
            </div>
        </div>`;
    mainContainer.insertAdjacentHTML('beforeend', htmlCodeCanvas);
  }

  createCharts() {
    const firstCtx = document.getElementById('myChart1').getContext('2d');
    const secondCtx = document.getElementById('myChart2').getContext('2d');
    const firtChart = new Chart(firstCtx, {
      type: 'doughnut',
      data: {
        labels: getLabels('expense'),
        datasets: [{
          data: getData('expense'),
          backgroundColor: [
            'rgba(255, 75, 75, 0.7)',
            'rgba(210, 120, 75, 0.7)',
            'rgba(167, 35, 75, 0.7)',
            'rgba(190, 171, 137, 0.7)',
            'rgba(184, 161, 155, 0.7)',
            'rgba(135, 108, 155, 0.7)',
            'rgba(135, 197, 155, 0.7)',
            'rgba(209, 217, 155, 0.7)',
            'rgba(209, 217, 54, 0.7)',
            'rgba(181, 221, 54, 0.7)',
            'rgba(166, 78, 77, 0.7)',
            'rgba(236, 108, 39, 0.7)',
          ],
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Expense',
          fontSize: 16,
        },
      },
    });
    const secondChart = new Chart(secondCtx, {
      type: 'doughnut',
      data: {
        labels: getLabels('income'),
        datasets: [{
          data: getData('income'),
          backgroundColor: [
            'rgba(134, 242, 48, 0.7)',
            'rgba(134, 242, 161, 0.7)',
            'rgba(63, 242, 224, 0.7)',
          ],
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Income',
          fontSize: 16,
        },
      },
    });
    this.firtChart = firtChart;
    this.secondChart = secondChart;
  }

  updateCharts() {
    this.firtChart.data.labels = getLabels('expense');
    this.firtChart.data.datasets[0].data = getData('expense');

    this.secondChart.data.labels = getLabels('income');
    this.secondChart.data.datasets[0].data = getData('income');

    this.firtChart.update();
    this.secondChart.update();
  }
}
