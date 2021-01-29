// eslint-disable-next-line no-unused-vars
import EnExpenseCategories from '../data/dataExpenseCategories';
import Settings from '../settings/Settings';

import addOperation from '../addOperation/addOperation';
import {
  getIntervalText,
  setIntervalDate,
  getPreviousDatestampForInterval,
  getNextDatestampForInterval,
} from '../interval/interval';

import { disableBtn, enableBtn } from '../utils/utils';

import Operations from '../operations/Operations';
import { updateBalance } from '../addOperation/processingOperation';

export function renderHTML() {
  const html = `<header class="navbar navbar-light bg-white header border-bottom">
    <div class="container">
        <div class="col-2">
        <p>Balance:</p>
        <p class="fw-bold">
            <span id="current-amount" class="current-amount balance"></span
            ><span id="current-currency">BYN</span>
        </p>
        </div>
        <div class="navigate-interval d-flex align-items-center">
        <button class = "iteration-button btn btn-outline-success" id = "prev"> &lt; </button>
        <div id="interval" class="me-1 ms-1">current interval</div>
        <button class = "iteration-button btn btn-outline-success" id = "next"> &gt; </button>
        </div>
        <div class="d-flex col-2">
        <select class="form-select" name="interval" id="interval-select">
            <option value="Day">Day</option>
            <option value="Month" selected>Month</option>
            <option value="Year">Year</option>
            <option value="All">All</option>
        </select>
        <img class="header-image" src="./assets/icons/007.svg" alt="" />
        </div>
    </div>
    </header>
    <main class="bg-light">
    <div class="d-flex justify-content-center flex-wrap" id="main-content">
        
        <!-- all content is here -->

    </div>
    </main>
    <footer class="bg-white border-top">
    <div class="container">
        <nav
        class="row d-flex flex-row justify-content-sm-between align-items-center mt-3 text-center"
        >
        <button type="button" id = "btn-operations" class="btn btn-success nav-button col-2">
            <img class="footer-btn-image" src="./assets/icons/001.svg" alt="Operation" />
            <span class="d-block">Operations</span>
        </button>

        <button type="button" class="btn btn-success nav-button col-2">
            <img class="footer-btn-image" src="./assets/icons/002.svg" alt="Report" />
            <span class="d-block">Reports</span>
        </button>

        <button type="button" id="btn-add-operation" class="col-2 btn-add-operation">
            <img class="footer-btn-image" src="./assets/icons/005.svg" alt="add">
            <span class="text-nowrap d-block text-success fw-bold">Add operation</span>
        </button>

        <button type="button" class="btn btn-success col-2">
            <img class="footer-btn-image" src="./assets/icons/003.svg" alt="Category" />
            <span class="d-block">Categories</span>
        </button>

        <button type="button" class="btn btn-success col-2" id="settings">
            <img class="footer-btn-image" src="./assets/icons/004.svg" alt="Settings"/>
            <span class="d-block">Settings</span>
        </button>
        </nav>
    </div>
    </footer>`;
  document.body.insertAdjacentHTML('beforeend', html);
}
export function renderLayout() {
  const intervalSelect = document.querySelector('#interval-select');
  const intervalReport = document.querySelector('#interval');
  const navigateInterval = document.querySelector('.navigate-interval');

  // нужно перевесит обработчик событий на контейнер с кнопками
  const btnAddOperation = document.querySelector('#btn-add-operation');
  const btnOperations = document.querySelector('#btn-operations');

  btnAddOperation.addEventListener('click', addOperation);

  const settingsRewrite = () => {
    const oldSettings = document.querySelector('templete');
    oldSettings.parentNode.removeChild(oldSettings);
    const operationsSettings = document.querySelectorAll('.operations');
    const recordExpander = document.querySelectorAll('.record-expander');
    // eslint-disable-next-line no-unused-vars
    const settings = new Settings(operationsSettings, recordExpander);
  };

  addOperation();
  updateBalance();

  const currentDatestamp = new Date().getTime();

  const operations = new Operations();

  intervalReport.textContent = getIntervalText(currentDatestamp);
  setIntervalDate(currentDatestamp);

  btnOperations.addEventListener('click', () => {
    const main = document.querySelector('#main-content');
    main.innerHTML = '';
    operations.renderIn(main);

    // settings rewrite
    settingsRewrite();
  });

  intervalSelect.addEventListener('change', () => {
    const selectInterval = document.querySelector('#interval-select');
    const nextBtn = document.querySelector('#next');
    const prevBtn = document.querySelector('#prev');

    const isAllInterval = selectInterval.value === 'All';

    if (isAllInterval) {
      disableBtn(nextBtn);
      disableBtn(prevBtn);
    } else {
      enableBtn(nextBtn);
      enableBtn(prevBtn);
    }
    // eslint-disable-next-line no-shadow
    const currentDatestamp = new Date().getTime();

    intervalReport.textContent = getIntervalText(currentDatestamp);
    setIntervalDate(currentDatestamp);

    const isOperationsTab = document.querySelector('.operations-container');
    if (isOperationsTab) {
      operations.updateOperations();
    }
    // settings rewrite
    settingsRewrite();
  });

  navigateInterval.addEventListener('click', ({ target }) => {
    const isIterationBtn = target.classList.contains('iteration-button');
    if (isIterationBtn) {
      const intervalDatestamp = +intervalReport.dataset.date;
      const interval = intervalSelect.value;

      let updatedStamp;

      switch (target.id) {
        case 'prev':
          updatedStamp = getPreviousDatestampForInterval(interval, intervalDatestamp);
          break;
        case 'next':
          updatedStamp = getNextDatestampForInterval(interval, intervalDatestamp);
          break;
        default:
          break;
      }

      setIntervalDate(updatedStamp);

      intervalReport.textContent = getIntervalText(updatedStamp);

      const isOperationsTab = document.querySelector('.operations-container');

      if (isOperationsTab) {
        operations.updateOperations();
      }
      // settings init
      settingsRewrite();
    }
  });
  // eslint-disable-next-line no-unused-vars
  const settings = new Settings();
}
