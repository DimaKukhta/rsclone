import { renderHTML, renderLayout } from '../baseLayout/renderBaseLayout';

export default class Authorization {
  constructor() {
    this.render();
    this.handlers();
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const htmlCode = `<div class="container-form">
    <form class="authorization-form">
      <div class="mb-3">
        <label for="InputLogin" class="form-label">Логин</label>
        <input type="login" class="form-control" id="InputLogin" aria-describedby="loginHelp">
        <div id="loginHelp" class="form-text">Введите ваши данные</div>
      </div>
      <div class="mb-3">
        <label for="InputPassword" class="form-label">Пароль</label>
        <input type="password" class="form-control" id="InputPassword">
      </div>
      <div class="mb-3">
        <div class="log-place">*</div>
      </div>
      <div class="mb-3 button-form">
        <button class="btn btn-primary sign-in-button" >Войти в аккаунт</button>
        <button class="btn btn-primary sign-up-button">Новый аккаунт</button>
      </div>
    </form>
    </div>`;
    const container = document.querySelector('body');
    container.insertAdjacentHTML('beforeend', htmlCode);
  }

  // eslint-disable-next-line class-methods-use-this
  hidden(element) {
    element.classList.add('hidden');
  }

  // eslint-disable-next-line class-methods-use-this
  getData(user) {
    if (user.history.length) {
      const expense = user.history[0] || [];
      const income = user.history[1] || [];

      localStorage.setItem('expense', JSON.stringify(expense));
      localStorage.setItem('income', JSON.stringify(income));
    } else {
      localStorage.setItem('expense', '[]');
      localStorage.setItem('income', '[]');
    }
  }

  async signIn(login, password, log, container, button, loginInput, passwordInput) {
    if (login && password) {
      // eslint-disable-next-line no-param-reassign
      button.disabled = true;
      const response = await fetch(`https://rs-clone-be1.herokuapp.com/authorization/${login}/${password}`);
      const json = await response.json();
      // eslint-disable-next-line no-param-reassign
      button.disabled = false;
      if (json.statusCode) {
        // eslint-disable-next-line no-param-reassign
        log.innerHTML = '<p class="warning">Неверный логин/пароль</p>';
        loginInput.classList.add('is-invalid');
        passwordInput.classList.add('is-invalid');
      } else {
        localStorage.setItem('login', json.login);
        this.getData(json);
        this.hidden(container);
        renderHTML();
        renderLayout();
      }
    } else {
      loginInput.classList.add('is-invalid');
      passwordInput.classList.add('is-invalid');
      // eslint-disable-next-line no-param-reassign
      log.innerHTML = '<p class="warning">Некорректные данные</p>';
    }
  }

  async signUp(login, password, log, container, button, loginInput, passwordInput) {
    if (login && password) {
      const user = {
        login,
        password,
      };
      // eslint-disable-next-line no-param-reassign
      button.disabled = true;
      const response = await fetch('https://rs-clone-be1.herokuapp.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user),
      });

      const result = await response.json();
      localStorage.setItem('login', result.login);
      // eslint-disable-next-line no-param-reassign
      button.disabled = false;
      if (result.statusCode) {
        // eslint-disable-next-line no-param-reassign
        log.innerHTML = '<p class="warning">Такой логин уже занят</p>';
        loginInput.classList.add('is-invalid');
        passwordInput.classList.add('is-invalid');
      } else {
        this.getData(result);
        this.hidden(container);
        renderHTML();
        renderLayout();
      }
    } else {
      loginInput.classList.add('is-invalid');
      passwordInput.classList.add('is-invalid');
      // eslint-disable-next-line no-param-reassign
      log.innerHTML = '<p class="warning">Некорректные данные</p>';
    }
  }

  handlers() {
    const loginInput = document.querySelector('#InputLogin');
    const passwordInput = document.querySelector('#InputPassword');

    const signInButton = document.querySelector('.sign-in-button');
    const signUpButton = document.querySelector('.sign-up-button');

    const logPlace = document.querySelector('.log-place');

    const containerForm = document.querySelector('.container-form');

    signInButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.signIn(loginInput.value, passwordInput.value,
        logPlace, containerForm, signInButton, loginInput, passwordInput);
    });
    signUpButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.signUp(loginInput.value, passwordInput.value,
        logPlace, containerForm, signUpButton, loginInput, passwordInput);
    });

    loginInput.addEventListener('input', () => {
      if (loginInput.classList.contains('is-invalid')) {
        loginInput.classList.remove('is-invalid');
      }
    });

    passwordInput.addEventListener('input', () => {
      if (passwordInput.classList.contains('is-invalid')) {
        passwordInput.classList.remove('is-invalid');
      }
    });
  }
}
