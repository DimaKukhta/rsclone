/* eslint-disable import/no-duplicates */
import { switchLang } from '../data/baselayoutLang';
import lang from '../data/baselayoutLang';
import Operations from '../operations/Operations';
import addReport from '../addReport/addReport';
import drawOperations from '../addOperation/addOperation';
import drawHotKeys from '../drawHotKeys/drawHotKeys';

export default class Settings {
  constructor(operationsSettings, recordExpander) {
    this.theme = lang.theme;
    this.currency = lang.currency;
    this.language = lang.language;
    this.sound = lang.sound;
    this.set = document.querySelector('.settings');
    this.countButtonSettings = false;

    this.themeToggler = document.getElementsByName('onoffswitch');
    this.textP = document.querySelectorAll('p');
    this.textSpan = document.querySelectorAll('span');

    this.buttons = document.querySelectorAll('.btn');
    this.addButtonText = document.getElementById('btn-add-operation').lastElementChild;
    this.btnOperation = document.querySelector('btn-add-operation');
    this.header = document.querySelector('header');
    this.main = document.querySelector('main');
    this.footer = document.querySelector('footer');
    this.currentAmount = document.getElementById('current-amount');
    this.interval = document.getElementById('interval');
    this.createdBy = document.getElementById('createdBy_footer');
    this.forRS = document.getElementById('forRS_footer');
    this.readerLocalStorage();
    this.render();
    this.handlers();

    this.set = document.querySelector('.settings');
    this.outer = document.querySelector('.outer');

    this.operations = operationsSettings;
    this.recordExpander = recordExpander;
    this.themeChange();
  }

  readerLocalStorage() {
    this.langLocal = localStorage.getItem('language');
    if (this.langLocal === null || this.langLocal === undefined) {
      localStorage.setItem('language', 'language_en');
      this.langEnFirstTime = 'checked';
    }
    if (this.langLocal === 'language_en') this.langEnFirstTime = 'checked';
    if (this.langLocal === 'language_ru') this.langRu = 'checked';
    if (this.langLocal === 'language_by') this.langBy = 'checked';

    this.currencyLocal = localStorage.getItem('currency');
    if (this.currencyLocal === null || this.currencyLocal === undefined) {
      localStorage.setItem('currency', 'currency_byn');
      this.currencyFirstTime = 'checked';
    }
    if (this.currencyLocal === 'currency_byn') this.currencyFirstTimeBUN = 'checked';
    if (this.currencyLocal === 'currency_us') this.currencyUS = 'checked';
    if (this.currencyLocal === 'currency_eu') this.currencyEU = 'checked';

    this.themeLocal = localStorage.getItem('theme');
    if (this.themeLocal === undefined) this.checkedToggler = 'checked';
    if (this.themeLocal === 'false') this.checkedToggler = '';
    else this.checkedToggler = 'checked';

    this.isSound = localStorage.getItem('sound');
    if (this.isSound === undefined || !this.isSound) this.checked = 'checked';
    if (this.isSound === 'false') this.checked = '';
    if (this.isSound === 'true') this.checked = 'checked';
  }

  render() {
    this.settingsWindow = document.createElement('templete');
    this.settingsWindow.innerHTML = `
    <div class="outer"></div>
    <div class="container settings" width="400px">
          <div class="close_settings">x</div>
            <div>
            <div class="container_theme">
              <span class="theme_app" id="settings_theme">${this.theme} </span>
              <div class="onoffswitch">
                <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" tabindex="0" ${this.checkedToggler}>
                <label class="onoffswitch-label" for="myonoffswitch">
                    <span class="onoffswitch-inner"></span>
                    <span class="onoffswitch-switch"></span>
                </label>
              </div>
            </div>  

            <div class="box_sound">
              <label class="form-check-label box_sound__label" for="flexCheckChecked" id="settings_sound">
                ${this.sound}
              </label>
              <input class="form-check-input box_sound__input" type="checkbox" value="" id="flexCheckChecked" ${this.checked}>

            </div>
            
            <div class="settings_wrapper">
              <form class="column container settings_inner currency_form">
                <div class="head_list">
                  <span id="settings_currency">${this.currency}</span>
                </div>

                <div>
                  <input type="radio" class="settings_radio form-check-input" name="currency" value="BYN" id="currency_byn" ${this.currencyFirstTime} ${this.currencyFirstTimeBUN}>
                  <label for="currency_byn"><span>BYN</span></label>
                </div>
                <div>
                  <input type="radio" class="settings_radio form-check-input" name="currency" value="$" id="currency_us" ${this.currencyUS}>
                  <label for="currency_us"><span>US</span></label>
                </div>
                <div>
                  <input type="radio" class="settings_radio form-check-input" name="currency" value="€" id="currency_eu" ${this.currencyEU}>
                  <label for="currency_eu"><span>EU</span></label>
                </div>
              </form>
              <div class="column container settings_inner">
                <div class="head_list">
                  <span id="settings_language">${this.language}</span>
                </div>

                <div>
                  <input type="radio" class="settings_radio form-check-input" name="language" id="language_en" ${this.langEnFirstTime} ${this.checkedLang}>
                  <label for="language_en"><span>EN</span></label>
                </div>
                <div>
                  <input type="radio" class="settings_radio form-check-input" name="language" id="language_ru" ${this.langRu} ${this.checkedLang}>
                  <label for="language_ru"><span>RU</span></label>
                </div>
                <div>
                  <input type="radio" class="settings_radio form-check-input" name="language" id="language_by" ${this.langBy} ${this.checkedLang}>
                  <label for="language_by"><span>BY</span></label>
                </div>
              </div>
            </div>
          </div>
        </div>
    `;

    this.main = document.querySelector('.bg-light');
    this.main.appendChild(this.settingsWindow);
  }

  soundSwitch() {
    localStorage.setItem('sound', this.checked);
  }

  changeCurrency() {
    localStorage.setItem('currency', this.id);
    this.currentCurrency = document.getElementById('current-currency');
    this.currentCurrency.innerText = (() => this.value)();
    const isOperationsTab = document.querySelector('.operations-container');
    if (isOperationsTab) {
      const operationsL = new Operations();
      operationsL.updateOperations();
      this.isRecordExpander = document.querySelectorAll('.record-expander');
      this.isRecordExpander.forEach((el) => el.classList.add('text_dark'));
    }
  }

  changeLang() {
    localStorage.setItem('language', this.id);
    this.addButtonText = document.getElementById('btn-add-operation').lastElementChild;
    // interval
    this.isInterval = document.getElementById('interval');
    if (this.isInterval.dataset.date === '0') {
      this.isInterval.textContent = switchLang().allExpenses;
    }
    this.consoleOption = document.querySelector('#interval-select');
    this.arrSwitchLang = Object.values(switchLang());
    for (let i = 0; i < this.consoleOption.options.length; i += 1) {
      this.consoleOption.options[i].innerText = this.arrSwitchLang[i];
    }
    // footer
    this.operations = document.getElementById('operations');
    this.reports = document.getElementById('reports');
    this.add = document.getElementById('add');
    this.hotkeys = document.getElementById('hotkeys');
    this.settingsSpan = document.getElementById('settings_span');
    this.createdBy = document.getElementById('createdBy_footer');
    this.forRS = document.getElementById('forRS_footer');

    this.operations.innerText = switchLang().operations;
    this.reports.innerText = switchLang().reports;
    this.add.innerText = switchLang().add;
    this.hotkeys.innerText = switchLang().hotkeys;
    this.settingsSpan.innerText = switchLang().settings;

    this.themeLife = document.getElementById('settings_theme');
    this.currencyLife = document.getElementById('settings_currency');
    this.languageLife = document.getElementById('settings_language');
    this.soundLife = document.getElementById('settings_sound');

    this.themeLife.innerText = switchLang().theme;
    this.currencyLife.innerText = switchLang().currency;
    this.languageLife.innerText = switchLang().language;
    this.soundLife.innerText = switchLang().sound;
    this.createdBy.innerText = switchLang().createdBy;
    this.forRS.textContent = switchLang().forRS;

    const modalTitle = document.getElementById('modal_title');
    const modalCancel = document.getElementById('modal-cancel');
    const modalDelete = document.getElementById('modal-delete');
    modalTitle.innerText = switchLang().modalTitle;
    modalCancel.innerText = switchLang().modalCancel;
    modalDelete.innerText = switchLang().modalDelete;

    const isDrawHotKeys = document.querySelector('.hotkeys-table');
    if (isDrawHotKeys) {
      drawHotKeys();
      // settingsRewrite();
      this.themeLocal = localStorage.getItem('theme');
      // dark on
      if (this.themeLocal === 'false') {
        const table = document.querySelectorAll('table');
        table.forEach((tableIn) => tableIn.classList.add('text_dark'));
        const h3Table = document.querySelector('h3');
        const h4Table = document.querySelectorAll('h4');
        h3Table.classList.add('text-warning');
        h4Table.forEach((el) => el.classList.add('text-warning'));
      }
    }

    const isOperationsTab = document.querySelector('.operations-container');
    if (isOperationsTab) {
      const operationsL = new Operations();
      operationsL.updateOperations();
      this.isRecordExpander = document.querySelectorAll('.record-expander');
      this.isRecordExpander.forEach((el) => el.classList.add('text_dark'));
    }

    const isAddOperationTab = document.querySelector('#add-expense');
    if (isAddOperationTab) {
      drawOperations();
    }

    const isReportTab = document.querySelector('.chart-container');
    if (isReportTab) {
      addReport();
    }
  }

  themeChange() {
    this.themeChangeLocalS = () => {
      this.themeLocal = localStorage.getItem('theme');
      // dark on
      if (this.themeLocal === 'false') {
        this.textSpan[2].classList.add('text_dark');
        console.log(this.textSpan)
        this.header.classList.add('bgc_dark');
        this.main.classList.add('bgc_dark');
      
        this.footer.classList.add('bgc_dark');
        this.currentAmount.classList.add('text_dark');
        this.interval.classList.add('text_dark');
        this.createdBy.classList.add('text_dark');
        this.forRS.classList.add('text_dark');
        // settings
        this.set.classList.add('bgc_dark_settings');
        // add operation
        this.addButtonText.classList.add('btnOperation_dark');
        // operations
        if (this.operations) this.operations.forEach((el) => el.classList.add('text_dark'));
        this.isRecordExpander = document.querySelectorAll('.record-expander');
        if (this.isRecordExpander) {
          this.isRecordExpander.forEach((el) => el.classList.add('text_dark'));
        }
        // this.textP[0].classList.add('text_dark');
        this.buttons.forEach((btn) => {
          btn.classList.add('dark_btn');
        });
        this.textSpan[1].classList.remove('text_dark');
        this.isHotkeys = document.querySelector('.hotkeys-table');
        if (this.isHotkeys) {
          const table = document.querySelectorAll('table');
          table.forEach((tableIn) => tableIn.classList.add('text_dark'));
          const h3Table = document.querySelector('h3');
          const h4Table = document.querySelectorAll('h4');
          h3Table.classList.add('text-warning');
          h4Table.forEach((el) => el.classList.add('text-warning'));
        }
      }
      // dark off
      if (this.themeLocal === 'true') {
        this.textSpan[2].classList.remove('text_dark');

        this.textSpan[1].classList.remove('text_dark');
        this.header.classList.remove('bgc_dark');
        this.main.classList.remove('bgc_dark');
        this.footer.classList.remove('bgc_dark');
        this.currentAmount.classList.remove('text_dark');
        this.interval.classList.remove('text_dark');
        this.createdBy.classList.remove('text_dark');
        this.forRS.classList.remove('text_dark');

        this.set.classList.remove('bgc_dark_settings');

        this.addButtonText.classList.remove('btnOperation_dark');
        this.textP.forEach((elem) => {
          elem.classList.remove('text_dark');
        });
        // operations
        if (this.operations) this.operations.forEach((el) => el.classList.remove('text_dark'));
        this.isRecordExpander = document.querySelectorAll('.record-expander');
        if (this.isRecordExpander) {
          this.isRecordExpander.forEach((el) => el.classList.add('text_dark'));
        }
        if (this.isHotkeys) {
          const table = document.querySelectorAll('table');
          table.forEach((tableIn) => tableIn.classList.remove('text_dark'));
          const h3Table = document.querySelector('h3');
          const h4Table = document.querySelectorAll('h4');
          h3Table.classList.remove('text-warning');
          h4Table.forEach((el) => el.classList.remove('text-warning'));
        }
        this.buttons.forEach((btn) => {
          btn.classList.remove('dark_btn');
        });
      }
    };

    for (let i = 0; i < this.themeToggler.length; i += 1) {
      this.themeToggler[i].onchange = () => {
        localStorage.setItem('theme', this.themeToggler[i].checked);
        setTimeout(this.themeChangeLocalS(), 0);
        this.themeChange();
      };
    }
    this.themeChangeLocalS();
  }

  openSettings() {
    this.outer.classList.add('settings_outer');
    this.set.classList.add('set_on_slide');
    this.countButtonSettings = true;

    this.outer.addEventListener('mouseup', () => this.closeSettings());
  }

  closeSettings() {
    this.outer.classList.remove('settings_outer');
    this.countButtonSettings = false;
    this.set.classList.remove('set_on_slide');
    this.countButtonSettings = false;
    this.outer.removeEventListener('mouseup', () => this.closeSettings());
  }

  handlers() {
    this.ButtonSettings = document.getElementById('settings');
    this.currencyName = document.getElementsByName('currency');
    this.languageName = document.getElementsByName('language');
    this.closeButton = document.querySelector('.close_settings');
    this.soundCheck = document.querySelector('.box_sound__input');

    this.soundCheck.onchange = this.soundSwitch;

    for (let i = 0; i < this.languageName.length; i += 1) {
      this.languageName[i].onchange = this.changeLang;
    }

    for (let i = 0; i < this.currencyName.length; i += 1) {
      this.currencyName[i].onchange = this.changeCurrency;
    }

    this.ButtonSettings.onclick = () => {
      // eslint-disable-next-line no-unused-expressions
      if (!this.countButtonSettings) {
        this.openSettings();
      } else if (this.countButtonSettings) {
        this.closeSettings();
      }
    };

    this.themeToggler = document.getElementsByName('onoffswitch');
    this.closeButton.addEventListener('click', () => this.closeSettings());
  }
}
