// eslint-disable-next-line no-unused-vars
import style from './style/style.css';
import EnExpenseCategories from './js/data/EN_dataExpenseCategories';
import EnIncomeCategories from './js/data/EN_dataIncomeCategories';

const mainContent = document.querySelector('#main-content');
const btnAddExpense = document.querySelector('#btn-add-expense');
const btnAddIncome = document.querySelector('#btn-add-income');

btnAddExpense.addEventListener('click', addExpense);
btnAddIncome.addEventListener('click', addIncome);

function addExpense() {
  mainContent.innerHTML = '';

  const fragment = new DocumentFragment();
  const container = document.createElement('div');
  container.classList.add('d-flex', 'flex-column', 'text-center', 'mt-5');

  const label = document.createElement('label');
  label.classList.add('mb-1', 'text-success', 'fw-bold');
  label.for = 'category-select';
  label.textContent = 'Select category';

  const select = document.createElement('select');
  select.classList.add('form-select', 'col-5', 'mb-4');
  select.name = 'categories';
  select.id = 'category-select';

  const firstOption = document.createElement('option');
  firstOption.value = 'none';
  firstOption.textContent = '-- choose one --';

  const listOptions = EnExpenseCategories.map()


  select.append(firstOption);
  container.append(label, select);
  fragment.append(container);

  mainContent.append(fragment);
}

function addIncome() {
  mainContent.innerHTML = '';
}