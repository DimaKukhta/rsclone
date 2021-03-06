import { getOperations, getSummaryOperationsForInterval } from '../data/getData';
import { addZeroes, groupDecimals } from '../utils/utils';
import updateData from '../utils/updateData';

function generateId() {
  const str = '1234567890abcdefg';
  const maxNumber = str.length;
  let id = '';
  for (let i = 0; i < maxNumber; i += 1) {
    id += str[Math.trunc(Math.random() * maxNumber)];
  }
  return id;
}

function disableInput(operationType) {
  const input = document.querySelector(`.input-${operationType}`);
  const save = document.querySelector(`#save-${operationType}`);
  const date = document.querySelector(`#${operationType}-date`);
  input.setAttribute('disabled', true);
  save.setAttribute('disabled', true);
  date.setAttribute('disabled', true);
}

export function enableInput(operationType) {
  const input = document.querySelector(`.input-${operationType}`);
  const save = document.querySelector(`#save-${operationType}`);
  const date = document.querySelector(`#${operationType}-date`);
  const category = document.querySelector(`#category-select-${operationType}`);
  if (category.value !== 'none') {
    input.removeAttribute('disabled');
    save.removeAttribute('disabled');
    date.removeAttribute('disabled');
  } else {
    disableInput(operationType);
  }
}

export function setCurrentDateByDefault(operationType) {
  const date = document.querySelector(`#${operationType}-date`);
  const currendDate = new Date();
  const year = currendDate.getFullYear();
  const month = currendDate.getMonth();
  const day = currendDate.getDate();

  const currentDateStr = `${year}-${addZeroes(month + 1)}-${addZeroes(day)}`;
  date.value = currentDateStr;
  date.max = currentDateStr;
}

export function saveOperationToLocalStorage(operationType) {
  const category = document.querySelector(`#category-select-${operationType}`);
  const date = document.querySelector(`#${operationType}-date`);
  const input = document.querySelector(`.input-${operationType}`);
  const operationArray = getOperations(operationType);

  operationArray.push({
    value: +(+input.value).toFixed(2),
    category: category.value,
    date: date.value,
    id: generateId(),
  });

  localStorage.setItem(operationType, JSON.stringify(operationArray));
  updateData(localStorage.getItem('login'));
}

export function setDefaultOperation(operationType) {
  const input = document.querySelector(`.input-${operationType}`);
  const category = document.querySelector(`#category-select-${operationType}`);
  const date = document.querySelector(`#${operationType}-date`);

  category.selectedIndex = 0;
  input.value = '';
  date.value = '';
  disableInput(operationType);
}

export function isInputValid(operationType) {
  const input = document.querySelector(`.input-${operationType}`);
  const val = +input.value;
  const isNumber = Number.isFinite(val);

  return (isNumber && val > 0 && val < 10000001);
}

export function validateInput(operationType) {
  const input = document.querySelector(`.input-${operationType}`);

  if (!isInputValid(operationType)) {
    input.style.color = 'red';
  } else {
    input.style.color = 'black';
  }
}

export function updateBalance() {
  const allExpense = getSummaryOperationsForInterval('expense', 'all');
  const allIncome = getSummaryOperationsForInterval('income', 'all');
  const balanceValue = allIncome - allExpense;

  const balanceElem = document.querySelector('#current-amount');

  const setColorClassForElem = (elem, className) => {
    elem.classList.remove('red', 'green');
    elem.classList.add(className);
  };

  if (balanceValue >= 0) {
    setColorClassForElem(balanceElem, 'green');
  } else {
    setColorClassForElem(balanceElem, 'red');
  }

  balanceElem.textContent = groupDecimals(+balanceValue.toFixed(2));
}

function addClassForMS(elem, className, ms) {
  elem.classList.add(className);
  setTimeout(() => {
    elem.classList.remove(className);
    // eslint-disable-next-line no-param-reassign
    elem.textContent = '';
  }, ms);
}

export function pigAnimation(operationType, value) {
  const pigAmount = document.querySelector('.animation-container');
  pigAmount.textContent = (operationType === 'expense') ? `-${value}` : value;
  const removeClassAfterMS = 4000;
  addClassForMS(pigAmount, `${operationType}-animation`, removeClassAfterMS);
}
