// eslint-disable-next-line no-unused-vars
import style from './style/style.css';
import { expenseCategoriesEN } from './js/data/DataExpenseCategories';

const mainContent = document.querySelector('#main-content');
const elem = expenseCategoriesEN[0].icon;
mainContent.append(elem);
