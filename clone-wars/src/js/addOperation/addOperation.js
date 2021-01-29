import {
  saveOperationToLocalStorage,
  setDefaultOperation,
  isInputValid,
  enableInput,
  setCurrentDateByDefault,
  validateInput,
  updateBalance,
  pigAnimation,
} from './processingOperation';

import expenseCategories from '../data/dataExpenseCategories';
import incomeCategories from '../data/dataIncomeCategories';

// const mainContent = document.querySelector('#main-content');

function drawAddExpense() {
  const mainContent = document.querySelector('#main-content');
  const fragment = new DocumentFragment();
  const container = document.createElement('div');
  container.id = 'add-expense';
  container.classList.add('d-flex', 'flex-column', 'text-center', 'mt-5', 'add-expense');

  const title = document.createElement('p');
  title.classList.add('text-danger', 'text-uppercase', 'fs-4', 'mb-4');
  title.textContent = 'Add Expense';

  const labelCategory = document.createElement('labelCategory');
  labelCategory.classList.add('mb-1', 'text-danger', 'fw-bold');
  labelCategory.for = 'category-select-expense';
  labelCategory.textContent = 'Category';

  const select = document.createElement('select');

  select.addEventListener('change', () => {
    enableInput('expense');
    setCurrentDateByDefault('expense');
  });

  select.classList.add('form-select', 'col-5', 'mb-4');
  select.name = 'categories';
  select.id = 'category-select-expense';

  const firstOption = document.createElement('option');
  firstOption.value = 'none';
  firstOption.textContent = '-- choose one --';

  select.append(firstOption);

  expenseCategories.forEach(({ name }) => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    select.append(option);
  });

  const labelAmount = document.createElement('label');
  labelAmount.classList.add('mb-1', 'text-danger', 'fw-bold');
  labelAmount.for = 'add-expense';
  labelAmount.textContent = 'Amount';

  const input = document.createElement('input');

  input.addEventListener('input', () => {
    validateInput('expense');
  });

  input.classList.add('form-control', 'input-expense', 'mb-5');
  input.id = 'add-expense';
  input.placeholder = '-- enter the amount --';
  input.disabled = true;

  const inputDate = document.createElement('input');
  inputDate.type = 'date';
  inputDate.id = 'expense-date';
  inputDate.disabled = true;
  inputDate.classList.add('form-control', 'mb-5');

  const btn = document.createElement('button');

  btn.classList.add('btn', 'btn-danger', 'mx-auto', 'w-100');
  btn.id = 'save-expense';
  btn.disabled = true;
  btn.textContent = 'Save expense';

  const audio = document.createElement('audio');
  audio.id = 'audio';
  audio.src = './assets/audio/expense.mp3';

  btn.addEventListener('click', () => {
    if (isInputValid('expense')) {
      // Sound switch
      const audioLocalStorage = localStorage.getItem('sound');
      if (audioLocalStorage === 'true' || audioLocalStorage === null) audio.play();

      pigAnimation('expense', (+input.value).toFixed(2));
      saveOperationToLocalStorage('expense');
      setDefaultOperation('expense');
      updateBalance();
    }
  });

  container.append(title, labelCategory, select, labelAmount, input, inputDate, btn, audio);
  fragment.append(container);

  mainContent.append(fragment);
}

function drawAddIncome() {
  const mainContent = document.querySelector('#main-content');
  const fragment = new DocumentFragment();
  const container = document.createElement('div');
  container.id = 'add-income';
  container.classList.add('d-flex', 'flex-column', 'text-center', 'mt-5', 'add-income');

  const title = document.createElement('p');
  title.classList.add('text-warning', 'text-uppercase', 'fs-4', 'mb-4');
  title.textContent = 'Add Income';

  const labelCategory = document.createElement('labelCategory');
  labelCategory.classList.add('mb-1', 'text-warning', 'fw-bold');
  labelCategory.for = 'category-select-income';
  labelCategory.textContent = 'Category';

  const select = document.createElement('select');

  select.addEventListener('change', () => {
    enableInput('income');
    setCurrentDateByDefault('income');
  });

  select.classList.add('form-select', 'col-5', 'mb-4');
  select.name = 'categories';
  select.id = 'category-select-income';

  const firstOption = document.createElement('option');
  firstOption.value = 'none';
  firstOption.textContent = '-- choose one --';

  select.append(firstOption);
  // another options from separate file
  incomeCategories.forEach(({ name }) => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    select.append(option);
  });

  const labelAmount = document.createElement('label');
  labelAmount.classList.add('mb-1', 'text-warning', 'fw-bold');
  labelAmount.for = 'add-income';
  labelAmount.textContent = 'Amount';

  const input = document.createElement('input');

  input.addEventListener('input', () => {
    validateInput('income');
  });

  input.classList.add('form-control', 'input-income', 'mb-5');
  input.id = 'add-income';
  input.placeholder = '-- enter the amount --';
  input.disabled = true;

  const inputDate = document.createElement('input');
  inputDate.type = 'date';
  inputDate.id = 'income-date';
  inputDate.max = '2021-01-22';
  inputDate.disabled = true;
  inputDate.classList.add('form-control', 'mb-5');

  const btn = document.createElement('button');

  btn.classList.add('btn', 'btn-warning', 'mx-auto', 'w-100');
  btn.id = 'save-income';
  btn.disabled = true;
  btn.textContent = 'Save income';

  const audio = document.createElement('audio');
  audio.id = 'audio';
  audio.src = './assets/audio/income.mp3';

  btn.addEventListener('click', () => {
    if (isInputValid('income')) {
      // Sound switch
      const audioLocalStorage = localStorage.getItem('sound');
      if (audioLocalStorage === 'true' || audioLocalStorage === null) audio.play();

      pigAnimation('income', (+input.value).toFixed(2));
      saveOperationToLocalStorage('income');
      setDefaultOperation('income');
      updateBalance();
    }
  });

  container.append(title, labelCategory, select, labelAmount, input, inputDate, btn, audio);
  fragment.append(container);

  mainContent.append(fragment);
}

function drawImage() {
  const mainContent = document.querySelector('#main-content');
  const fragment = new DocumentFragment();
  const container = document.createElement('div');
  container.classList.add('add-operation-image');

  const image = document.createElement('img');
  const animationContainer = document.createElement('span');
  animationContainer.classList.add('animation-container');
  image.classList.add('w-100', 'mt-5', 'pig');
  image.src = './assets/icons/Saving.svg';
  container.append(animationContainer, image);
  fragment.append(container);
  mainContent.append(fragment);
}

export default function addOperation() {
  const mainContent = document.querySelector('#main-content');
  mainContent.innerHTML = '';

  drawAddExpense();
  drawAddIncome();
  drawImage();
}
