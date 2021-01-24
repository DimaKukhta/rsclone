export default function () {
  const mainContent = document.querySelector('#main-content');

  mainContent.innerHTML = '';

  const fragment = new DocumentFragment();
  const container = document.createElement('div');
  container.classList.add('d-flex', 'flex-column', 'text-center', 'mt-5 me-5 ms-5 ps-5 pe-5');

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

  const inputDate = document.createElement('input');
  inputDate.type = 'date';
  inputDate.id = 'expense-date';
  inputDate.max = '2021-01-22';
  inputDate.classList.add('form-control', 'mb-5');

  const btn = document.createElement('button');
  btn.classList.add('btn', 'btn-success', 'mx-auto', 'w-100');
  btn.id = 'save';
  btn.disabled = true;
  btn.textContent = 'Save income';

  const audio = document.createElement('audio');
  audio.id = 'audio';
  audio.src = './assets/audio/income.mp3';

  select.append(firstOption);
  container.append(labelCategory, select, labelAmount, input, inputDate, btn, audio);
  fragment.append(container);

  mainContent.append(fragment);
}
