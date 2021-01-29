import Chart from 'chart.js';
import { getOperationsForChart, getIntervalData } from '../data/getData';


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
    return Object.keys(result);
}

function getData(type) {
    const result = getOperationsForChart(type, getInterval(), getStamp());
    return Object.values(result);
}


export default class Charts {
    constructor() {
        this.createCanvas();
        this.createCharts();
    }
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
                data: getData('expense')
                }],
            },
            options: { 
                responsive: true,
                maintainAspectRatio: false
            }
        });
        const secondChart = new Chart(secondCtx, {
            type: 'doughnut',
            data: {
                labels: getLabels('income'),
                datasets: [{
                data: getData('income')
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
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