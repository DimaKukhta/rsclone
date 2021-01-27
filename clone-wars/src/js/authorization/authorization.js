export function getAuthorizationWindow() {
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
      <div class="mb-3 button-form">
        <button class="btn btn-primary">Войти в аккаунт</button>
        <button class="btn btn-primary">Новый аккаунт</button>
      </div>
    </form>
  </div>`;
  const container = document.querySelector('#main-content');
  container.insertAdjacentHTML(htmlCode);
}
