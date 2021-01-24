// eslint-disable-next-line no-unused-vars
import style from './style/style.css';

import EnExpenseCategories from './js/data/EN_dataExpenseCategories';
import EnIncomeCategories from './js/data/EN_dataIncomeCategories';
import Settings from './js/settings/Settings';


import addOperation from './js/addOperation/addOperation';
import {
  getIntervalText,
  setIntervalDate,
  getPreviousDatestampForInterval,
  getNextDatestampForInterval,
} from './js/interval/interval';

import Operations from './js/operations/Operations';

const intervalSelect = document.querySelector('#interval-select');
const intervalReport = document.querySelector('#interval');
const navigateInterval = document.querySelector('.navigate-interval');

// нужно перевесит обработчик событий на контейнер с кнопками
const btnAddOperation = document.querySelector('#btn-add-operation');
const btnOperations = document.querySelector('#btn-operations');

btnAddOperation.addEventListener('click', addOperation);


// начало огромной функции, которая будет разбита на части и перенесена в отдельные файлы :)
function addOperation() {
  mainContent.innerHTML = '';

  const fragment = new DocumentFragment();
  const container = document.createElement('div');
  container.classList.add('d-flex', 'flex-column', 'text-center', 'mt-5');

  const labelCategory = document.createElement('labelCategory');
  labelCategory.classList.add('mb-1', 'text-success', 'fw-bold');
  labelCategory.for = 'category-select';
  labelCategory.textContent = 'Select category';

  const select = document.createElement('select');
  select.classList.add('form-select', 'col-5', 'mb-4');
  select.name = 'categories';
  select.id = 'category-select';

  const firstOption = document.createElement('option');
  firstOption.value = 'none';
  firstOption.textContent = '-- choose one --';

  // const listOptions = EnExpenseCategories.map()
  // тут допишу создание опций из файлы с данными категорий
  const labelAmount = document.createElement('label');
  labelAmount.classList.add('mb-1', 'text-success', 'fw-bold');
  labelAmount.for = 'add-amount';
  labelAmount.textContent = 'Add amount';

  const input = document.createElement('input');
  input.classList.add('form-control', 'input-expense', 'mb-5');
  input.id = 'add-amount';
  input.placeholder = '-- enter the amount --';
  input.disabled = true;

  const inputDate = document.createElement('input');
  inputDate.type = 'date';
  inputDate.id = 'expense-date';
  inputDate.max = '2021-01-22';
  inputDate.classList.add('form-control', 'mb-5');

  const btn = document.createElement('button');
  btn.classList.add('btn', 'btn-success', 'mx-auto', 'w-100');
  btn.id = 'save';
  btn.disabled = true;
  btn.textContent = 'Save expense';

  const audio = document.createElement('audio');
  audio.id = 'audio';
  audio.src = './assets/audio/expense.mp3';

  select.append(firstOption);
  container.append(labelCategory, select, labelAmount, input, inputDate, btn, audio);
  fragment.append(container);

  mainContent.append(fragment);
}

// конец огромной функции, которая будет разбита на части и перенесена в отдельные файлы :)

window.onload = addOperation;

// settings init
// eslint-disable-next-line no-unused-vars
const settings = new Settings();

document.addEventListener('DOMContentLoaded', () => {
  // create add operation tab;
  addOperation();

  const currentDatestamp = new Date().getTime();

  intervalReport.textContent = getIntervalText(currentDatestamp);
  setIntervalDate(currentDatestamp);

  const operations = new Operations();

  btnOperations.addEventListener('click', () => {
    const main = document.querySelector('#main-content>div');
    operations.renderIn(main);
  });

  intervalSelect.addEventListener('change', () => {
    // eslint-disable-next-line no-shadow
    const currentDatestamp = new Date().getTime();

    intervalReport.textContent = getIntervalText(currentDatestamp);
    setIntervalDate(currentDatestamp);

    const isOperationsTab = document.querySelector('#operations');
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

    const isOperationsTab = document.querySelector('#operations');
    if (isOperationsTab) {
      operations.updateOperations();
    }
  });
});

