import { switchLang } from '../data/baselayoutLang';

function drawTable() {
  const mainContent = document.querySelector('#main-content');
  location.hash = 'hot-keys';
  mainContent.innerHTML = '';

  mainContent.insertAdjacentHTML('beforeend', `<div class="container-tables">
  <div class="hotkeys-table">
    <h3 class="text-success fw-bold">${switchLang().firstTableTitle}</h3>
    <h5 class="text-success text-uppercase mt-3">HEADER</h5>
    <table>
      <tr>
        <th> ${switchLang().buttons.toUpperCase()}</th>
        <th> ${switchLang().prevPeriod}</th>
        <th> ${switchLang().nextPeriod}</th>
        <th> ${switchLang().selectPeriod}</th>
      </tr>
      <tr>
        <td class="fw-bold">HOTKEYS</td>
        <td>6</td>
        <td>7</td>
        <td>8</td>
      </tr>
      </table>
  
      <h5 class="text-success text-uppercase mt-3">FOOTER</h5>
      <table>
        <tr>
          <th> ${switchLang().buttons.toUpperCase()}</th>
          <th>${switchLang().operations}</th>
          <th> ${switchLang().reports}</th>
          <th> ${switchLang().add}</th>
          <th> ${switchLang().hotKeys}</th>
          <th> ${switchLang().settings}</th>
        </tr>
        <tr>
          <td class="fw-bold">HOTKEYS</td>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          <td>5</td>
        </tr>
        </table>
  </div>
  <div class="hotkeys-table">
    <h4 class="text-success mt-5 fw-bold">  <h4 class="text-success">${switchLang().secondTableTitle}</h4>
    </h4>
    <table>
      <tr>
        <th>${switchLang().browser}</th>
        <th>Windows</th>
        <th>Linux</th>
        <th>Mac</th>
      </tr>
      <tr>
        <td class="fw-bold">Chrome</td>
        <td>[Alt] + ${switchLang().hotkey}</td>
        <td>[Alt] + ${switchLang().hotkey}</td>
        <td>[Control] + [Alt] + ${switchLang().hotkey}</td>
      </tr>
      <tr>
        <td class="fw-bold">Edge</td>
        <td>[Alt] + ${switchLang().hotkey}</td>
        <td>N/A</td>
        <td>N/A</td>
      </tr>
      <tr>
        <td class="fw-bold">Internet Explorer</td>
        <td>[Alt] + ${switchLang().hotkey}</td>
        <td>N/A</td>
        <td>N/A</td>
      </tr>
      <tr>
        <td class="fw-bold">Firefox</td>
        <td>[Alt] + [Shift] + ${switchLang().hotkey}</td>
        <td>[Alt] + [Shift] + ${switchLang().hotkey}</td>
        <td>[Control] + [Alt] + ${switchLang().hotkey}</td>
      </tr>
      <tr>
        <td class="fw-bold">Safari</td>
        <td>[Alt] + ${switchLang().hotkey}</td>
        <td>N/A</td>
        <td>[Control] + [Alt] + ${switchLang().hotkey}</td>
      </tr>
      <tr>
        <td class="fw-bold">Opera</td>
        <td colspan="3">
          <P>Opera 15 or newer: [Alt] + ${switchLang().hotkey}</P>
          <p>Opera 12.1 or older: [Shift] + [Esc] + ${switchLang().hotkey}</p>
        </td>
      </tr>
    </table>
  </div>
</div>`);
}

export default function drawHotKeys() {
  drawTable();
}
