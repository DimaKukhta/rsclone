// eslint-disable-next-line no-unused-vars
import style from './style/style.css';
import { renderHTML, renderLayout, renderEventLayout } from './js/baseLayout/renderBaseLayout';

renderHTML();
document.body.addEventListener('click', () => {
  renderLayout();
  renderEventLayout();
});