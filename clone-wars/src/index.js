// eslint-disable-next-line no-unused-vars
import style from './style/style.css';

import EnExpenseCategories from './js/data/dataExpenseCategories';
import EnIncomeCategories from './js/data/dataIncomeCategories';
import Settings from './js/settings/Settings';

import addOperation from './js/addOperation/addOperation';
import {
  getIntervalText,
  setIntervalDate,
  getPreviousDatestampForInterval,
  getNextDatestampForInterval,
} from './js/interval/interval';

import Operations from './js/operations/Operations';
import { updateBalance } from './js/addOperation/processingOperation';

const intervalSelect = document.querySelector('#interval-select');
const intervalReport = document.querySelector('#interval');
const navigateInterval = document.querySelector('.navigate-interval');

// нужно перевесит обработчик событий на контейнер с кнопками
const btnAddOperation = document.querySelector('#btn-add-operation');
const btnOperations = document.querySelector('#btn-operations');

btnAddOperation.addEventListener('click', addOperation);

window.onload = addOperation;

// settings init
// eslint-disable-next-line no-unused-vars
const settings = new Settings();

document.addEventListener('DOMContentLoaded', () => {
  // create add operation tab;
  addOperation();
  updateBalance();

  const currentDatestamp = new Date().getTime();

  intervalReport.textContent = getIntervalText(currentDatestamp);
  setIntervalDate(currentDatestamp);

  const operations = new Operations();

  btnOperations.addEventListener('click', () => {
    const main = document.querySelector('#main-content');
    main.innerHTML = '';
    operations.renderIn(main);
  });

  intervalSelect.addEventListener('change', () => {
    // eslint-disable-next-line no-shadow
    const currentDatestamp = new Date().getTime();

    intervalReport.textContent = getIntervalText(currentDatestamp);
    setIntervalDate(currentDatestamp);

    const isOperationsTab = document.querySelector('.operations-container');
    if (isOperationsTab) {
      operations.updateOperations();
    }
  });

  navigateInterval.addEventListener('click', ({ target }) => {
    const intervalDatestamp = +intervalReport.dataset.date;
    const interval = intervalSelect.value;

    let updatedStamp;

    switch (target.id) {
      case 'prev':
        updatedStamp = getPreviousDatestampForInterval(interval, intervalDatestamp);
        break;
      case 'next':
        updatedStamp = getNextDatestampForInterval(interval, intervalDatestamp);
        break;
      default:
        break;
    }
    setIntervalDate(updatedStamp);

    intervalReport.textContent = getIntervalText(updatedStamp);

    const isOperationsTab = document.querySelector('.operations-container');

    if (isOperationsTab) {
      operations.updateOperations();
    }
  });
});
