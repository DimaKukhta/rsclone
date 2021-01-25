/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-prototype-builtins */
/* eslint-disable class-methods-use-this */
import { getIntervalData, getSummaryOperationsForInterval, groupOperationsByCategory } from '../data/getData';
import addZeroes from '../utils/addZeroes';

const intervalOperations = document.querySelector('#interval-select');

const monthNames = {
  en: ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'],
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

    const expensesArray = getIntervalData(operationType, intervalOperations.value, currentDatestamp);

    const operationsObject = groupOperationsByCategory(expensesArray);

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
      const categoryOperations = document.createElement('li');
      const dataByCategory = operationsObject[category];

      const totalExpenseByCategory = dataByCategory.reduce((accum, { value }) => accum + value, 0);

      categoryOperations.textContent = `${category}: ${sign}${totalExpenseByCategory} ${currency}`;

      const sortedExpensesByCategories = dataByCategory.sort((a, b) => new Date(b.date) - new Date(a.date));

      const expenseUl = document.createElement('ul');

      sortedExpensesByCategories.forEach((expense, index) => {
        const recordContainer = document.createElement('div');
        recordContainer.classList.add('record-container');

        const dateExpense = new Date(sortedExpensesByCategories[index].date);
        const day = dateExpense.getDate();
        const monthIndex = dateExpense.getMonth();
        const year = dateExpense.getFullYear();

        const expenseLi = document.createElement('li');

        // here will be function than returns lang from seetings
        const lang = 'en';

        const expenseDate = `${addZeroes(day)} ${monthNames[lang][monthIndex]} ${year}`;
        expenseLi.textContent = `
          ${sign}${sortedExpensesByCategories[index].value} ${currency};
          ${expenseDate}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-record');
        deleteBtn.dataset.id = sortedExpensesByCategories[index].id;
        deleteBtn.textContent = '✖';

        recordContainer.append(deleteBtn);
        recordContainer.append(expenseLi);

        expenseUl.append(recordContainer);
      });

      categoryOperations.append(expenseUl);
      categoryOperations.append(horisontalLine.cloneNode());
      fragment.append(categoryOperations);
    });

    const allExpensesForInterval = getSummaryOperationsForInterval(operationType, intervalOperations.value, currentDatestamp);

    const summaryExpenses = document.createElement('div');
    summaryExpenses.textContent = `Summary ${operationType} for interval: ${sign}${allExpensesForInterval} ${currency}`;

    this.operations.append(summaryExpenses);
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

      this.updateOperations(operationType);
    }
  }

  renderIn(element) {
    element.append(this.createReport());
  }
}
