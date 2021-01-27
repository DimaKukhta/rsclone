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
    container.insertAdjacentHTML('beforeend', htmlCode);
  }

  async signIn(login, password, log) {
    console.log(login, password);
    let response = await fetch(`https://rs-clone-be1.herokuapp.com/authorization/${login}/${password}`);
    const json = await response.json();
    if (json.statusCode) {
      log.innerHTML = 'Нет такого пользователя';
    } else {
      console.log(json);
    }
  }

   async signUp(login, password, log) {
    const user = {
      login: login,
      password: password
    }
    let response = await fetch('https://rs-clone-be1.herokuapp.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
    });
    let result = await response.json();
      if(result.statusCode) {
        log.innerHTML = 'Логин уже занят';
      } else {
        console.log(result);
      }
  }

  handlers() {
    const loginInput = document.querySelector('#InputLogin');
    const passwordInput = document.querySelector('#InputPassword');

    const signInButton = document.querySelector('.sign-in-button');
    const signUpButton = document.querySelector('.sign-up-button');

    const logPlace = document.querySelector('.log-place');
    
    signInButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.signIn(loginInput.value, passwordInput.value, logPlace);
    });
    signUpButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.signUp(loginInput.value, passwordInput.value, logPlace);
    });
  }
}

