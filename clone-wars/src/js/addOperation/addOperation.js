import { saveExpenseToLocalStorage, setDefaultExpense, isInputValid, enableInput, setCurrentDateByDefault, validateInput } from './expense';
import expenseCategories from '../data/dataExpenseCategories';
import incomeCategories from '../data/dataIncomeCategories';

const mainContent = document.querySelector('#main-content');

function drawAddExpense() {
  const fragment = new DocumentFragment();
  const container = document.createElement('div');
  container.id = 'add-operation';
  container.classList.add('d-flex', 'flex-column', 'text-center', 'mt-5', 'pe-5', 'add-expense');

  const title = document.createElement('p');
  title.classList.add('text-danger', 'text-uppercase', 'fs-4', 'mb-4');
  title.textContent = 'Add Expense';

  const labelCategory = document.createElement('labelCategory');
  labelCategory.classList.add('mb-1', 'text-danger', 'fw-bold');
  labelCategory.for = 'category-select';
  labelCategory.textContent = 'Category';

  const select = document.createElement('select');

  select.addEventListener('change', () => {
    enableInput();
    setCurrentDateByDefault();
  });

  select.classList.add('form-select', 'col-5', 'mb-4');
  select.name = 'categories';
  select.id = 'category-select';

  const firstOption = document.createElement('option');
  firstOption.value = 'none';
  firstOption.textContent = '-- choose one --';

  select.append(firstOption);
  // another options from separate file
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

  input.addEventListener('input', validateInput);

  input.classList.add('form-control', 'input-expense', 'mb-5');
  input.id = 'add-expense';
  input.placeholder = '-- enter the amount --';
  input.disabled = true;

  const inputDate = document.createElement('input');
  inputDate.type = 'date';
  inputDate.id = 'expense-date';
  inputDate.max = '2021-01-22';
  inputDate.disabled = true;
  inputDate.classList.add('form-control', 'mb-5');

  const btn = document.createElement('button');

  btn.classList.add('btn', 'btn-danger', 'mx-auto', 'w-100');
  btn.id = 'save';
  btn.disabled = true;
  btn.textContent = 'Save expense';

  const audio = document.createElement('audio');
  audio.id = 'audio';
  audio.src = './assets/audio/expense.mp3';

  btn.addEventListener('click', () => {
    if (isInputValid()) {
      audio.play();
      saveExpenseToLocalStorage();
      setDefaultExpense();
    }
  });

  container.append(title, labelCategory, select, labelAmount, input, inputDate, btn, audio);
  fragment.append(container);

  mainContent.append(fragment);
}

function drawAddIncome() {
  const fragment = new DocumentFragment();
  const container = document.createElement('div');
  container.id = 'add-operation';
  container.classList.add('d-flex', 'flex-column', 'text-center', 'mt-5', 'ps-5', 'add-income');

  const title = document.createElement('p');
  title.classList.add('text-warning', 'text-uppercase', 'fs-4', 'mb-4');
  title.textContent = 'Add Income';

  const labelCategory = document.createElement('labelCategory');
  labelCategory.classList.add('mb-1', 'text-warning', 'fw-bold');
  labelCategory.for = 'category-select';
  labelCategory.textContent = 'Category';

  const select = document.createElement('select');

  select.addEventListener('change', () => {
    enableInput();
    setCurrentDateByDefault();
  });

  select.classList.add('form-select', 'col-5', 'mb-4');
  select.name = 'categories';
  select.id = 'category-select';

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

  input.addEventListener('input', validateInput);

  input.classList.add('form-control', 'input-expense', 'mb-5');
  input.id = 'add-income';
  input.placeholder = '-- enter the amount --';
  input.disabled = true;

  const inputDate = document.createElement('input');
  inputDate.type = 'date';
  inputDate.id = 'expense-date';
  inputDate.max = '2021-01-22';
  inputDate.disabled = true;
  inputDate.classList.add('form-control', 'mb-5');

  const btn = document.createElement('button');

  btn.classList.add('btn', 'btn-warning', 'mx-auto', 'w-100');
  btn.id = 'save';
  btn.disabled = true;
  btn.textContent = 'Save income';

  const audio = document.createElement('audio');
  audio.id = 'audio';
  audio.src = './assets/audio/expense.mp3';

  btn.addEventListener('click', () => {
    if (isInputValid()) {
      audio.play();
      saveExpenseToLocalStorage();
      setDefaultExpense();
    }
  });

  container.append(title, labelCategory, select, labelAmount, input, inputDate, btn, audio);
  fragment.append(container);

  mainContent.append(fragment);
}

function drawImage() {
  const fragment = new DocumentFragment();
  const container = document.createElement('div');
  container.classList.add('add-operation-image');

  const image = document.createElement('img');
  image.classList.add('w-100', 'mt-5');
  image.src = './assets/icons/Saving.svg';
  container.append(image);
  fragment.append(container);
  mainContent.append(fragment);
}

export default function addOperation() {
  mainContent.innerHTML = '';

  drawAddExpense();
  drawAddIncome();
  drawImage();
}
