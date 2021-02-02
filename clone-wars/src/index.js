// eslint-disable-next-line no-unused-vars
import style from './style/style.css';
import Authorization from './js/authorization/authorization';
import { renderHTML, renderLayout } from './js/baseLayout/renderBaseLayout';
import router from './js/routering/router';
// eslint-disable-next-line no-unused-vars
// const window = new Authorization();
renderHTML();
renderLayout();
router();
location.hash = 'operation';
