/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-prototype-builtins */
/* eslint-disable class-methods-use-this */
import { getIntervalData, getSummaryOperationsForInterval, groupOperationsByCategory } from '../data/getData';
import { updateBalance } from '../addOperation/processingOperation';
import addZeroes from '../utils/addZeroes';

const intervalOperations = document.querySelector('#interval-select');

const monthNames = {
  en: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.',
    'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
  ru: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  by: ['Студзень', 'Люты', 'Сакавик', 'Красавик', 'Май', 'Чэрвень',
    'Липень', 'Жнивень', 'Верасень', 'Кастрычник', 'Листапад', 'Снежань'],
};

export default class Operations {
  createOperations(operationType) {
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
      noDataText.textContent = `no ${operationType} for this interval...`;

      this.operations.append(noDataText, emptyFolder);

      return this.operations;
    }
    const sign = (operationType === 'expense') ? '-' : '+';

    this.operations.addEventListener('click', ({ target }) => {
      this.deleteRecord(target, operationType);
    });
    // function getCurrencyFromSettings
    const currency = 'BYN';

    const fragment = new DocumentFragment();
    const horisontalLine = document.createElement('hr');

    const operationsCatetegories = Object.keys(operationsObject).sort();

    operationsCatetegories.forEach((category) => {
      const categoryContainer = document.createElement('div');
      categoryContainer.classList.add('category-container');

      categoryContainer.addEventListener('click', expandAndCollapseList);

      const expander = document.createElement('button');
      expander.classList.add('record-expander');
      expander.textContent = '▼';

      const categoryOperations = document.createElement('li');
      categoryOperations.classList.add('category');
      const dataByCategory = operationsObject[category];

      const totalByCategory = dataByCategory.reduce((accum, { value }) => accum + value, 0);

      categoryOperations.textContent = `${category}: ${sign}${totalByCategory} ${currency}`;

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

        // here will be function than returns lang from seetings
        const lang = 'en';

        const dateText = `${addZeroes(day)} ${monthNames[lang][monthIndex]} ${year}`;
        operationLi.textContent = `
          ${sign}${sortedByCategories[index].value} ${currency};
          ${dateText}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-record');
        deleteBtn.dataset.id = sortedByCategories[index].id;
        deleteBtn.dataset.value = sortedByCategories[index].value;
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

    const totalForInterval = getSummaryOperationsForInterval(operationType, intervalOperations.value, currentDatestamp);

    const summary = document.createElement('div');
    summary.innerHTML = `<span>Summary ${operationType} for interval: ${sign}</span><span class='interval-total'>${totalForInterval}</span> <span>${currency}</span>`;

    this.operations.append(summary);
    this.operations.append(horisontalLine.cloneNode());
    this.operations.append(fragment);

    return this.operations;
  }

  createReport() {
    this.container = document.createElement('div');
    this.container.classList.add('operations-container');
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
      const interval = document.querySelector('#interval');

      const currentDatestamp = +interval.dataset.date;

      const operationsCopy = [...getIntervalData(operationType, intervalOperations.value, currentDatestamp)];
      const deleteId = target.dataset.id;
      const deleteRecordIndex = operationsCopy.findIndex(({ id }) => id === deleteId);
      operationsCopy.splice(deleteRecordIndex, 1);

      localStorage.setItem(operationType, JSON.stringify(operationsCopy));

      const record = target.parentElement;
      const categoryRecords = target.closest('.records').children;
      const isOneRecord = Array.from(categoryRecords).length === 1;

      if (isOneRecord) {
        const categoryContainer = target.closest('.category-container');
        categoryContainer.remove();
      } else {
        record.remove();
      }

      const deleteValue = target.dataset.value;
      updateSummaryForInterval(operationType, deleteValue);
      updateBalance();
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

function updateSummaryForInterval(operationType, deleteValue) {
  const operations = document.querySelector(`.operations-${operationType}`);
  const total = operations.querySelector('.interval-total');
  const currentValue = +total.textContent;
  const updateValue = currentValue - deleteValue;
  total.textContent = updateValue;
}
