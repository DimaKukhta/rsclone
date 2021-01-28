export default class Settings {
  constructor(operationsSettings, recordExpander) {
    this.theme = 'Theme';
    this.currency = 'Currency';
    this.language = 'Language';
    this.sound = 'Sound';
    this.set = document.querySelector('.settings');
    this.countButtonSettings = false;
    this.themeLocal = localStorage.getItem('theme');
    if (this.themeLocal === undefined) {
      this.checkedToggler = 'checked';
    }
    if (this.themeLocal === 'false') {
      this.checkedToggler = '';
    } else {
      this.checkedToggler = 'checked';
    }

    this.themeToggler = document.getElementsByName('onoffswitch');

    this.textP = document.querySelectorAll('p');
    this.textSpan = document.querySelectorAll('span');

    this.buttons = document.querySelectorAll('.btn');
    this.btnOperation = document.querySelector('btn-add-operation');
    this.header = document.querySelector('header');
    this.main = document.querySelector('main');
    this.footer = document.querySelector('footer');
    this.currentAmount = document.getElementById('current-amount');
    this.interval = document.getElementById('interval');

    this.render();
    this.handlers();
    // this.themeChange();

    this.set = document.querySelector('.settings');
    this.outer = document.querySelector('.outer');

    this.operations = operationsSettings;
    this.recordExpander = recordExpander;
    this.themeChange();
  }

  render() {
    this.settingsWindow = document.createElement('templete');
    this.settingsWindow.innerHTML = `
    <div class="outer"></div>
    <div class="container settings" width="400px">
          <div class="close_settings">x</div>
          <div>
            <span class="theme_app">${this.theme} 
              <div class="onoffswitch">
                <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" tabindex="0" ${this.checkedToggler}>
                <label class="onoffswitch-label" for="myonoffswitch">
                    <span class="onoffswitch-inner"></span>
                    <span class="onoffswitch-switch"></span>
                </label>
              </div>
            </span>

            <div class="box_sound">
              <label class="form-check-label box_sound__label" for="flexCheckChecked">
                ${this.sound}
              </label>
              <input class="form-check-input box_sound__input" type="checkbox" value="" id="flexCheckChecked" checked>

            </div>
            
            <div class="settings_wrapper">
              <form class="column container settings_inner currency_form">
                <div class="head_list">
                  <span>${this.currency}:</span>
                </div>

                <div>
                  <input type="radio" class="settings_radio form-check-input" name="currency" id="currency_byn" checked>
                  <label for="currency_byn"><span>BYN</span></label>
                </div>
                <div>
                  <input type="radio" class="settings_radio form-check-input" name="currency" id="currency_us">
                  <label for="currency_us"><span>US</span></label>
                </div>
                <div>
                  <input type="radio" class="settings_radio form-check-input" name="currency" id="currency_eu">
                  <label for="currency_eu"><span>EU</span></label>
                </div>
              </form>
              <div class="column container settings_inner">
                <div class="head_list">
                  <span>${this.language}:</span>
                </div>

                <div>
                  <input type="radio" class="settings_radio form-check-input" name="language" id="language_en" checked>
                  <label for="language_en"><span>EN</span></label>
                </div>
                <div>
                  <input type="radio" class="settings_radio form-check-input" name="language" id="language_ru">
                  <label for="language_ru"><span>RU</span></label>
                </div>
                <div>
                  <input type="radio" class="settings_radio form-check-input" name="language" id="language_by">
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
    console.log(this.id);
    localStorage.setItem('currency', this.id);
  }

  changeLang() {
    this.textP = document.querySelectorAll('p');
    this.textSpan = document.querySelectorAll('span');
    console.log(this.id);
    localStorage.setItem('language', this.id);
  }

  themeChange() {
    console.log(this.buttons);
    console.log(this.textP.length);

    this.themeChangeLocalS = function () {
      this.themeLocal = localStorage.getItem('theme');
      // dark on
      if (this.themeLocal === 'false') {
        // ===================================================================================
        this.rr = Array.from(document.documentElement.textContent);
        console.log(this.rr);
        // ==================================================================================
        this.textSpan[1].classList.add('text_dark');
        this.header.classList.add('bgc_dark');
        this.main.classList.add('bgc_dark');
        this.footer.classList.add('bgc_dark');
        this.currentAmount.classList.add('text_dark');
        this.interval.classList.add('text_dark');
        // settings
        this.set.classList.add('bgc_dark_settings');
        // add operation
        this.textSpan[4].classList.add('btnOperation_dark');
        // operations
        if (this.operations) this.operations.forEach((el) => el.classList.add('text_dark'));
        if (this.recordExpander) this.recordExpander.forEach((el) => el.classList.add('text_dark'));
        // console.log(this.themeLocal);
        this.textP.forEach((el) => el.classList.add('text_dark'));
        this.buttons.forEach((btn) => {
          btn.classList.add('dark_btn');
        });
      }
      // dark off
      if (this.themeLocal === 'true') {
        this.textSpan[1].classList.remove('text_dark');
        // console.log(this.themeLocal);
        this.header.classList.remove('bgc_dark');
        this.main.classList.remove('bgc_dark');
        this.footer.classList.remove('bgc_dark');
        this.currentAmount.classList.remove('text_dark');
        this.interval.classList.remove('text_dark');

        this.set.classList.remove('bgc_dark_settings');

        this.textSpan[4].classList.remove('btnOperation_dark');
        this.textP.forEach((elem) => {
          elem.classList.remove('text_dark');
        });
        // operations
        if (this.operations) this.operations.forEach((el) => el.classList.remove('text_dark'));
        if (this.recordExpander) this.recordExpander.forEach((el) => el.classList.remove('text_dark'));


        this.buttons.forEach((btn) => {
          btn.classList.remove('dark_btn');
        });
      }
    };

    for (let i = 0; i < this.themeToggler.length; i += 1) {
      this.themeToggler[i].onchange = () => {
        // console.log(this.themeToggler[i].checked);
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
