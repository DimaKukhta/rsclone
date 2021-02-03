import { switchLang } from '../data/baselayoutLang';

function drawTable() {
  const mainContent = document.querySelector('#main-content');
  location.hash = 'hot-keys';
  mainContent.innerHTML = '';

  const html = `<div class="hotkeys-table">
  <h3 class="text-success">${switchLang().firstTableTitle}</h3>
  <table>
    <tr>
      <th>${switchLang().buttons.toUpperCase()}</th>
      <th>${switchLang().operations}</th>
      <th> ${switchLang().reports}</th>
      <th> ${switchLang().add}</th>
      <th> ${switchLang().hotKeys}</th>
      <th> ${switchLang().settings}</th>
      <th> ${switchLang().prevPeriod}</th>
      <th> ${switchLang().nextPeriod}</th>
      <th> ${switchLang().selectPeriod}</th>
    </tr>
    <tr>
      <td class="fw-bold">${switchLang().hotkeys.toUpperCase()}</td>
      <td>1</td>
      <td>2</td>
      <td>3</td>
      <td>4</td>
      <td>5</td>
      <td>6</td>
      <td>7</td>
      <td>8</td>
    </tr>
    </table>
</div>
<div class="hotkeys-table">
  <h4 class="text-success">${switchLang().secondTableTitle}</h4>
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
        <p>Opera 15 or newer: [Alt] + ${switchLang().hotkey}</з>
        <p>Opera 12.1 or older: [Shift] + [Esc] + ${switchLang().hotkey}</p>
      </td>
    </tr>
  </table>
</div>`;

  mainContent.insertAdjacentHTML('beforeend', html);
}

export default function drawHotKeys() {
  drawTable();
}
