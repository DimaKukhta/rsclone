export default class Settings {
  constructor() {
    this.theme = 'Theme';
    this.currency = 'Currency';
    this.language = 'Language';
    this.set = document.querySelector('.settings');
    this.countButtonSettings = false;

    this.render();
    this.handlers();
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
                <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" tabindex="0" checked>
                <label class="onoffswitch-label" for="myonoffswitch">
                    <span class="onoffswitch-inner"></span>
                    <span class="onoffswitch-switch"></span>
                </label>
              </div>
            </span>
            
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
    console.log(this.settingsWindow);
    this.main.appendChild(this.settingsWindow);
  }

  changeCurrency() {
    console.log(this.id);
    localStorage.setItem('currency', this.id);
  }

  changeLang() {
    console.log(this.id);
    localStorage.setItem('language', this.id);
  }

  themeChange() {
    this.themeToggler = document.getElementsByName('onoffswitch');

    for (let i = 0; i < this.themeToggler.length; i += 1) {
      this.themeToggler[i].onchange = () => {
        this.themeChange();
        console.log(this.themeToggler[i].checked);
        localStorage.setItem('theme', this.themeToggler[i].checked);
      };
    }
  }

  openSettings() {
    this.set = document.querySelector('.settings');
    this.outer = document.querySelector('.outer');
    this.outer.classList.add('settings_outer');
    this.set.classList.add('set_on_slide');
    this.countButtonSettings = true;

    this.outer.addEventListener('mouseup', () => this.closeSettings());
  }

  closeSettings() {
    this.set = document.querySelector('.settings');
    this.outer = document.querySelector('.outer');
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
    console.log(this.themeToggler);

    this.closeButton.addEventListener('click', () => this.closeSettings());
  }
}
