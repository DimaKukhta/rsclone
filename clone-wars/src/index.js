// eslint-disable-next-line no-unused-vars
import style from './style/style.css';
import EnExpenseCategories from './js/data/EN_dataExpenseCategories';
import EnIncomeCategories from './js/data/EN_dataIncomeCategories';
import addOperation from './js/addOperation';

// нужно перевесит обработчик событий на контейнер с кнопками
const btnAddOperation = document.querySelector('#btn-add-operation');
btnAddOperation.addEventListener('click', addOperation);

window.onload = addOperation;
