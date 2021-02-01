/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-prototype-builtins */
/* eslint-disable class-methods-use-this */
import {
  getIntervalData,
  getSummaryOperationsForInterval,
  groupOperationsByCategory,
  getCurrentCurrency,
  getCurrentLanguage,
  getCategoryLang,
} from '../data/getData';

import { monthNames, currencyNames, operationLang } from '../data/translate';

import { updateBalance } from '../addOperation/processingOperation';
import { addZeroes, groupDecimals } from '../utils/utils';

import updateData from '../utils/updateData';

export default class Operations {
  createOperations(operationType) {
    const lang = getCurrentLanguage();
    const currency = getCurrentCurrency();

    const intervalOperations = document.querySelector('#interval-select');
    this.operations = document.createElement('ul');
    this.operations.classList.add('operations', `operations-${operationType}`);
    this.operations.id = `operations-${operationType}`;

    const interval = document.querySelector('#interval');

    const currentDatestamp = +interval.dataset.date;

    const operationsArray = getIntervalData(operationType, intervalOperations.value, currentDatestamp);

    const operationsObject = groupOperationsByCategory(operationsArray);

    const isIntervalHasData = JSON.stringify(operationsObject) !== JSON.stringify({});

    if (!isIntervalHasData) {
      const emptyFolder = document.createElement('img');
      emptyFolder.src = './assets/empty-folder.svg';
      emptyFolder.style.width = '100px';

      const noDataText = document.createElement('div');
      const noDataTextInner = document.createElement('p');
      noDataTextInner.textContent = `no ${operationType} for this interval...`;
      noDataText.append(noDataTextInner);
      this.operations.append(noDataText, emptyFolder);

      return this.operations;
    }
    const sign = (operationType === 'expense') ? '-' : '+';

    this.operations.addEventListener('click', ({ target }) => {
      this.deleteRecord(target, operationType);
    });
    // function getCurrencyFromSettings

    const fragment = new DocumentFragment();
    const horisontalLine = document.createElement('hr');

    const operationsCategories = Object.keys(operationsObject).sort();

    const textColor = (operationType === 'expense') ? 'text-danger' : 'text-warning';

    operationsCategories.forEach((category) => {
      const categoryLang = getCategoryLang(operationType, category, lang);

      const categoryContainer = document.createElement('div');
      categoryContainer.classList.add('category-container');

      // eslint-disable-next-line no-use-before-define
      categoryContainer.addEventListener('click', expandAndCollapseList);

      const expander = document.createElement('button');
      expander.classList.add('record-expander');
      expander.textContent = '▼';

      const categoryOperations = document.createElement('li');
      categoryOperations.classList.add('category');

      const dataByCategory = operationsObject[category];
      const totalByCategory = dataByCategory.reduce((accum, { value }) => accum + value, 0);

      const roundTotalByCategory = +totalByCategory.toFixed(2);

      categoryOperations.innerHTML = `<img class = 'category-icon' src = '../assets/icons/${category}.svg'><span class = 'fw-bold text-success'>${categoryLang}: </span> 
      <span class = 'category-total fw-bold ${textColor}' data-value = '${roundTotalByCategory}'>
      ${sign}${groupDecimals(roundTotalByCategory)}</span> <span class = 'fw-bold ${textColor}'>${currencyNames[currency]}</span>`;

      const sortedByCategories = dataByCategory.sort((a, b) => new Date(b.date) - new Date(a.date));

      const operationUl = document.createElement('ul');
      operationUl.classList.add('collapse', 'records');

      sortedByCategories.forEach((expense, index) => {
        const recordContainer = document.createElement('div');
        recordContainer.classList.add('record-container');

        const dateOperation = new Date(sortedByCategories[index].date);
        const day = dateOperation.getDate();
        const monthIndex = dateOperation.getMonth();
        const year = dateOperation.getFullYear();

        const operationLi = document.createElement('li');
        operationLi.classList.add('record-data');

        // here will be function than returns lang from seetings

        const operationValue = sortedByCategories[index].value;
        // groupDecimals(
        const dateText = `${addZeroes(day)} ${monthNames[lang][monthIndex]} ${year}`;
        operationLi.innerHTML = `<span class = '${textColor}'>${sign}${groupDecimals(operationValue)} <span class = 'currency ${textColor}'>${currencyNames[currency]}</span></span>
          <span>${dateText}</span>`;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-record');
        deleteBtn.dataset.id = sortedByCategories[index].id;
        deleteBtn.dataset.value = operationValue;
        deleteBtn.textContent = '✖';

        recordContainer.append(deleteBtn);
        recordContainer.append(operationLi);

        operationUl.append(recordContainer);
      });

      categoryOperations.append(operationUl);
      categoryOperations.append(horisontalLine.cloneNode());

      categoryContainer.append(expander, categoryOperations);

      fragment.append(categoryContainer);
    });

    const recordsContainer = document.createElement('div');
    recordsContainer.classList.add('records-container');
    recordsContainer.append(fragment);

    const totalForInterval = getSummaryOperationsForInterval(operationType, intervalOperations.value, currentDatestamp);
    const roundTotalForInterval = +totalForInterval.toFixed(2);

    const summary = document.createElement('div');

    summary.classList.add(textColor, 'fs-4');

    const operationText = operationLang[operationType][lang];
    summary.innerHTML = `<span>${operationText}: </span><span class='interval-total fw-bold' data-value = '${roundTotalForInterval}'>
    ${sign}${groupDecimals(roundTotalForInterval)}</span> <span class = 'fw-bold'>${currencyNames[currency]}</span>`;

    this.operations.append(summary);
    this.operations.append(horisontalLine.cloneNode());
    this.operations.append(recordsContainer);

    return this.operations;
  }

  createReport() {
    this.container = document.createElement('div');
    this.container.classList.add('operations-container', 'mt-5');
    this.container.append(this.createOperations('expense'));
    this.container.append(this.createOperations('income'));
    return this.container;
  }

  updateOperations() {
    const operationsEl = document.querySelector('.operations-container');
    operationsEl.replaceWith(this.createReport());
  }

  deleteRecord(target, operationType) {
    if (target.classList.contains('delete-record')) {
      const operationsCopy = [...getIntervalData(operationType)];
      const deleteId = target.dataset.id;
      const deleteRecordIndex = operationsCopy.findIndex(({ id }) => id === deleteId);

      operationsCopy.splice(deleteRecordIndex, 1);

      localStorage.setItem(operationType, JSON.stringify(operationsCopy));

      const deleteValue = target.dataset.value;
      updateSummaryForInterval(target, deleteValue, operationType);
      updateTotalForCategory(target, deleteValue, operationType);
      updateBalance();

      const record = target.parentElement;
      const categoryRecords = target.closest('.records').children;
      const isOneRecord = Array.from(categoryRecords).length === 1;

      if (isOneRecord) {
        const categoryContainer = target.closest('.category-container');
        categoryContainer.remove();
      } else {
        record.remove();
      }
      // updateData(localStorage.getItem('login'));
    }
  }

  renderIn(element) {
    element.append(this.createReport());
  }
}

function expandAndCollapseList({ target }) {
  if (target.classList.contains('record-expander')) {
    const category = target.nextElementSibling;
    const records = category.querySelector('.records');

    const isRecordsExpande = records.classList.contains('expande');

    if (isRecordsExpande) {
      records.classList.remove('expande');
      records.classList.add('collapse');
      target.textContent = '▼';
    } else {
      records.classList.remove('collapse');
      records.classList.add('expande');
      target.textContent = '▲';
    }
  }
}

function updateSummaryForInterval(deleteBtn, deleteValue, operationType) {
  const operation = deleteBtn.closest('.operations');
  const total = operation.querySelector('.interval-total');
  const currentValue = total.dataset.value;
  const updateValue = +(currentValue - deleteValue).toFixed(2);
  total.dataset.value = updateValue;
  total.textContent = (operationType === 'expense') ? `-${groupDecimals(updateValue)}` : `+${groupDecimals(updateValue)}`;
}

function updateTotalForCategory(deleteBtn, deleteValue, operationType) {
  const category = deleteBtn.closest('.category');
  const total = category.querySelector('.category-total');
  const currentValue = total.dataset.value;
  const updateValue = +(currentValue - deleteValue).toFixed(2);

  total.dataset.value = updateValue;
  total.textContent = (operationType === 'expense') ? `-${groupDecimals(updateValue)}` : `+${groupDecimals(updateValue)}`;
}
