export default class Settings {
  constructor() {
    this.theme = 'Theme';
    this.currency = 'Currency';
    this.language = 'Language';

    this.render();
    this.handler();
  }

  render() {
    this.settingsWindow = document.createElement('templete');
    this.settingsWindow.innerHTML = `
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
                  <label for="language_ru"><span>EN</span></label>
                </div>
                <div>
                  <input type="radio" class="settings_radio form-check-input" name="language" id="language_ru">
                  <label for="language_by"><span>RU</span></label>
                </div>
                <div>
                  <input type="radio" class="settings_radio form-check-input" name="language" id="language_by">
                  <label for="language_en"><span>BY</span></label>
                </div>
              </div>
            </div>
          </div>
        </div>
    `;

    this.main = document.querySelector('.bg-light');
    console.log(this.settingsWindow);
    this.main.appendChild(this.settingsWindow);
    // this.main.insertAdjacentHTML('beforeend', this.settingsWindow);
  }

  changeCurrency() {
    console.log(this.id);
  }

  changeLang() {
    console.log(this.id);
  }

  handler() {
    this.footerButtons = document.getElementById('settings');
    this.currencyName = document.getElementsByName('currency');
    this.languageName = document.getElementsByName('language');
    for (let i = 0; i < this.languageName.length; i += 1) {
      this.languageName[i].onchange = this.changeLang;
    }

    for (let i = 0; i < this.currencyName.length; i += 1) {
      this.currencyName[i].onchange = this.changeCurrency;
    }

    this.footerButtons.onclick = (event) => {
      console.log(event);
      console.log(this.byn);
      console.log(this.currencyName);
    };
  }
}
