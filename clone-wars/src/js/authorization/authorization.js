export default class Authorization {
  constructor() {
    this.render();
    this.handlers();
  }

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
    const container = document.querySelector('#main-content');
    console.log(container);
    container.insertAdjacentHTML('beforeend', htmlCode);
  }

  hidden(element) {
    element.classList.add('hidden');
  }

  async signIn(login, password, log, container) {
    console.log(login, password);
    const response = await fetch(`https://rs-clone-be1.herokuapp.com/authorization/${login}/${password}`);
    const json = await response.json();
    if (json.statusCode) {
      log.innerHTML = '<p class="warning">Нет такого пользователя</p>';
    } else {
      console.log(json);
      this.hidden(container);
    }
  }

  async signUp(login, password, log, container) {
    const user = {
      login,
      password,
    };
    const response = await fetch('https://rs-clone-be1.herokuapp.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(user),
    });

    const result = await response.json();
    if (result.statusCode) {
      log.innerHTML = '<p class="warning">Логин уже занят</p>';
    } else {
      console.log(result);
      this.hidden(container);
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
      this.signIn(loginInput.value, passwordInput.value, logPlace, containerForm);
    });
    signUpButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.signUp(loginInput.value, passwordInput.value, logPlace, containerForm);
    });
  }
}
