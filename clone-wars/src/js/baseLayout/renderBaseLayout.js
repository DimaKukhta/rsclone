// eslint-disable-next-line no-unused-vars
import lang from '../data/baselayoutLang';
import switchLangNoBind from '../data/addOperationLang';
import getCurrency from '../data/getCurrency';
import Settings from '../settings/Settings';

import addReport from '../addReport/addReport';
import addOperation from '../addOperation/addOperation';
import drawHotKeys from '../drawHotKeys/drawHotKeys';
import {
  getIntervalText,
  setIntervalDate,
  getPreviousDatestampForInterval,
  getNextDatestampForInterval,
} from '../interval/interval';

import Operations from '../operations/Operations';
import drawOperations from '../operations/drawOperations';
import { updateBalance } from '../addOperation/processingOperation';

export function renderHTML() {
  const html = `<header class="navbar navbar-light bg-white header border-bottom">
    <div class="container">
        <div class="col-2">
        <p id="balance">${lang.balance}</p>
        <p class="fw-bold">
            <span id="current-amount" class="current-amount balance"></span
            ><span id="current-currency">${getCurrency}</span>
        </p>
        </div>
        <div class="navigate-interval d-flex align-items-center">
        <button class = "iteration-button btn btn-outline-success" id = "prev" accesskey="1" title="hotkey '1'"> &lt; </button>
        <div id="interval" class="me-1 ms-1">current interval</div>
        <button class = "iteration-button btn btn-outline-success" id = "next" accesskey="2" title="hotkey '2'"> &gt; </button>
        </div>
        <div class="d-flex col-2">
        <select class="form-select" name="interval" id="interval-select" accesskey="3" title="hotkey '3'">
            <option value="Day">${lang.day}</option>
            <option value="Month" selected>${lang.month}</option>
            <option value="Year">${lang.year}</option>
            <option value="All">${lang.all}</option>
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
        <button type="button" id = "btn-operations" class="btn btn-success nav-button col-2" accesskey="4" title="hotkey '4'">
            <img class="footer-btn-image" src="./assets/icons/001.svg" alt="Operation" />
            <span id="operations" class="d-block">${lang.operations}</span>
        </button>

        <button type="button" id="btn-report" class="btn btn-success nav-button col-2" accesskey="5" title="hotkey '5'">
            <img class="footer-btn-image" src="./assets/icons/002.svg" alt="Report" />
            <span id="reports" class="d-block">${lang.reports}</span>
        </button>

        <button type="button" id="btn-add-operation" class="col-2 btn-add-operation" accesskey="6" title="hotkey '6'">
            <img class="footer-btn-image" src="./assets/icons/005.svg" alt="add">
            <span id="add" class="text-nowrap d-block text-success fw-bold">${lang.add}</span>
        </button>

        <button type="button" id="btn-hotkeys" class="btn btn-success col-2"  accesskey="7" title="hotkey '7'">
            <img class="footer-btn-image" src="./assets/icons/003.svg" alt="Category" />
            <span id="hotkeys" class="d-block">${lang.hotkeys}</span>
        </button>

        <button type="button" id="settings" class="btn btn-success col-2" accesskey="8" title="hotkey '8'">
            <img class="footer-btn-image" src="./assets/icons/004.svg" alt="Settings"/>
            <span id="settings_span" class="d-block">${lang.settings}</span>
        </button>
        </nav>
        <div class="flex-row d-flex justify-content-center align-items-end flex-wrap footer-text">
          <span>Created by:</span>
          <a class="footer-link" href="https://github.com/DimaKukhta">DimaKukhta, </a>
          <a class="footer-link" href="https://github.com/natgeo89">natgeo89, </a>
          <a class="footer-link" href="https://github.com/artemosadchuck">artemosadchuck, </a>
          <a class="footer-link" href="https://github.com/confesssa">confesssa</a>
          <span>for</span>
          <a class="footer-link" href="https://rs.school/js/"><img class="footer-image" src="./assets/rss.svg"
              alt="Rolling Scope School" />
            Rolling Scope School</a>
          <span>2021</span>
        </div>
      </div>
    </div>
    </footer>`;
  document.body.insertAdjacentHTML('beforeend', html);
}
export function settingsRewrite() {
  const oldSettings = document.querySelector('templete');
  oldSettings.parentNode.removeChild(oldSettings);
  const operationsSettings = document.querySelectorAll('.operations');
  const recordExpander = document.querySelectorAll('.record-expander');
  // eslint-disable-next-line no-unused-vars
  const settings = new Settings(operationsSettings, recordExpander);
}

export function renderLayout() {
  const intervalSelect = document.querySelector('#interval-select');
  const intervalReport = document.querySelector('#interval');
  const navigateInterval = document.querySelector('.navigate-interval');

  const btnOperations = document.querySelector('#btn-operations');
  const btnReport = document.querySelector('#btn-report');
  const btnAddOperation = document.querySelector('#btn-add-operation');
  const btnHotKeys = document.querySelector('#btn-hotkeys');

  btnReport.addEventListener('click', addReport);
  btnAddOperation.addEventListener('click', addOperation);
  btnHotKeys.addEventListener('click', drawHotKeys);

  // window.onload = addOperation;

  addOperation();
  updateBalance();

  const currentDatestamp = new Date().getTime();

  const operations = new Operations();

  intervalReport.textContent = getIntervalText(currentDatestamp);
  setIntervalDate(currentDatestamp);

  btnOperations.addEventListener('click', () => {
    drawOperations();
    // settings rewrite
    settingsRewrite();
  });

  intervalSelect.addEventListener('change', () => {
    // eslint-disable-next-line no-shadow
    const currentDatestamp = new Date().getTime();

    intervalReport.textContent = getIntervalText(currentDatestamp);
    setIntervalDate(currentDatestamp);

    const isOperationsTab = document.querySelector('.operations-container');
    if (isOperationsTab) {
      operations.updateOperations();
      settingsRewrite();
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
          settingsRewrite();
          break;
        case 'next':
          updatedStamp = getNextDatestampForInterval(interval, intervalDatestamp);
          settingsRewrite();
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
