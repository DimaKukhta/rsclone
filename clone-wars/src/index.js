// eslint-disable-next-line no-unused-vars
import style from './style/style.css';
import EnExpenseCategories from './js/data/EN_dataExpenseCategories';
import EnIncomeCategories from './js/data/EN_dataIncomeCategories';

const mainContent = document.querySelector('#main-content');

// перевешу обработчик событий на контейнер с кнопками
const btnAddExpense = document.querySelector('#btn-add-expense');
const btnAddIncome = document.querySelector('#btn-add-income');
btnAddExpense.addEventListener('click', addExpense);
btnAddIncome.addEventListener('click', addIncome);

// начало огромной функции, которая будет разбита на части и перенесена в отдельные файлы :)
function addExpense() {
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

  const btn = document.createElement('button');
  btn.classList.add('btn', 'btn-success', 'mx-auto', 'w-100');
  btn.id = 'save';
  btn.disabled = true;
  btn.textContent = 'Save expense';

  const audio = document.createElement('audio');
  audio.id = 'audio';
  audio.src = './assets/audio/expense.mp3';

  select.append(firstOption);
  container.append(labelCategory, select, labelAmount, input, btn, audio);
  fragment.append(container);

  mainContent.append(fragment);
}

function addIncome() {
  mainContent.innerHTML = '';
}

// конец огромной функции, которая будет разбита на части и перенесена в отдельные файлы :)
