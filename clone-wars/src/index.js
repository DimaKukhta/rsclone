// eslint-disable-next-line no-unused-vars
import style from './style/style.css';
import { renderHTML, renderLayout } from './js/baseLayout/renderBaseLayout';

renderHTML();
setTimeout(renderLayout, 0);
