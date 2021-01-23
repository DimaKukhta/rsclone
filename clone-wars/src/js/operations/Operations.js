/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-prototype-builtins */
/* eslint-disable class-methods-use-this */
import { getIntervalData } from '../data/getData';
import addZeroes from '../utils/addZeroes';

const intervalOperations = document.querySelector('#interval-select');

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default class Operations {
  constructor() {
    this.createOperations();
  }

  groupExpenses() {
    const interval = document.querySelector('#interval');

    const currentDatestamp = +interval.dataset.date;

    const expensesArray = getIntervalData(intervalOperations.value, currentDatestamp);

    return expensesArray.reduce((accum, { category }, ind, arr) => {
      const key = category;
      if (!accum.hasOwnProperty(key)) {
        accum[key] = arr.filter(({ category }) => category === key);
        return accum;
      }
      return accum;
    }, {});
  }

  deleteRecord(target) {
    const interval = document.querySelector('#interval');

    const currentDatestamp = +interval.dataset.date;

    const expensesCopy = [...getIntervalData(intervalOperations.value, currentDatestamp)];
    const deleteId = target.dataset.id;
    if (target.classList.contains('delete-record')) {
      const deleteRecordIndex = expensesCopy.findIndex(({ id }) => id === deleteId);
      expensesCopy.splice(deleteRecordIndex, 1);

      localStorage.setItem('expenses', JSON.stringify(expensesCopy));

      this.updateOperations();
    }
  }

  createOperations() {
    this.operations = document.createElement('ul');
    this.operations.id = 'operations';

    this.operations.addEventListener('click', ({ target }) => {
      this.deleteRecord(target);
    });

    const fragment = new DocumentFragment();
    const horisontalLine = document.createElement('hr');

    const operationsArray = this.groupExpenses();

    const operationsCatetegories = Object.keys(operationsArray).sort();

    operationsCatetegories.forEach((category) => {
      const categoryOperations = document.createElement('li');
      const dataByCategory = operationsArray[category];
      const totalExpenseByCategory = dataByCategory.reduce((accum, { value }) => accum + value, 0);
      categoryOperations.textContent = `${category}: -${totalExpenseByCategory} BYN`;

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

        const expenseDate = `${addZeroes(day)} ${monthNames[monthIndex]} ${year}`;
        expenseLi.textContent = `
          -${sortedExpensesByCategories[index].value} BYN;
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

    this.operations.append(fragment);

    return this.operations;
  }

  updateOperations() {
    const operationsEl = document.querySelector('#operations');
    operationsEl.replaceWith(this.createOperations());
  }

  renderIn(element) {
    element.replaceWith(this.createOperations());
  }
}
