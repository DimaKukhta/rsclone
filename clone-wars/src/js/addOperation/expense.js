import { getExpenses } from '../data/getData';
import addZeroes from '../utils/addZeroes';

function generateId() {
  const str = '1234567890abcdefg';
  const maxNumber = str.length;
  let id = '';
  for (let i = 0; i < maxNumber; i += 1) {
    id += str[Math.trunc(Math.random() * maxNumber)];
  }
  return id;
}

function disableInput() {
  const input = document.querySelector('.input-expense');
  const save = document.querySelector('#save');
  const date = document.querySelector('#expense-date');
  input.setAttribute('disabled', true);
  save.setAttribute('disabled', true);
  date.setAttribute('disabled', true);
}

export function enableInput() {
  const input = document.querySelector('.input-expense');
  const save = document.querySelector('#save');
  const date = document.querySelector('#expense-date');
  const category = document.querySelector('#category-select');
  if (category.value !== 'none') {
    input.removeAttribute('disabled');
    save.removeAttribute('disabled');
    date.removeAttribute('disabled');
  } else {
    disableInput();
  }
}

export function setCurrentDateByDefault() {
  const date = document.querySelector('#expense-date');
  const currendDate = new Date();
  const year = currendDate.getFullYear();
  const month = currendDate.getMonth();
  const day = currendDate.getDate();

  const currentDateStr = `${year}-${addZeroes(month + 1)}-${addZeroes(day)}`;
  date.value = currentDateStr;
  date.max = currentDateStr;
}

export function saveExpenseToLocalStorage() {
  const category = document.querySelector('#category-select');
  const date = document.querySelector('#expense-date');
  const input = document.querySelector('.input-expense');
  const expenseArray = getExpenses();

  expenseArray.push({
    value: +input.value,
    category: category.value,
    date: date.value,
    id: generateId(),
  });

  localStorage.setItem('expenses', JSON.stringify(expenseArray));
}

export function setDefaultExpense() {
  const input = document.querySelector('.input-expense');
  const category = document.querySelector('#category-select');
  const date = document.querySelector('#expense-date');

  category.selectedIndex = 0;
  input.value = '';
  date.value = '';
  disableInput();
}

export function isInputValid() {
  const input = document.querySelector('.input-expense');
  const val = +input.value;
  const isNumber = Number.isFinite(val);

  return (isNumber && val > 0);
}

export function validateInput() {
  const input = document.querySelector('.input-expense');

  if (!isInputValid()) {
    input.style.color = 'red';
  } else {
    input.style.color = 'black';
  }
}
