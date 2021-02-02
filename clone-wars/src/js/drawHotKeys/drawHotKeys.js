function drawTable() {
  const mainContent = document.querySelector('#main-content');
  location.hash = 'hot-keys';
  mainContent.innerHTML = '';

  mainContent.insertAdjacentHTML('beforeend', `<div class="hotkeys-table">
  <h3 class="text-success">In the project you can use the following hotkeys</h3>
  <table>
    <tr>
      <th> BUTTONS</th>
      <th>"Operations"</th>
      <th> "Reports"</th>
      <th> "Add operating"</th>
      <th> "Hotkeys"</th>
      <th> "Settings"</th>
      <th> "Previous period"</th>
      <th> "Next period"</th>
      <th> "Select period"</th>
    </tr>
    <tr>
      <td class="fw-bold">HOTKEYS</td>
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
  <h4 class="text-success">In order to use hotkeys, find your operating system and browser in the table</h4>
  <table>
    <tr>
      <th>Browser</th>
      <th>Windows</th>
      <th>Linux</th>
      <th>Mac</th>
    </tr>
    <tr>
      <td class="fw-bold">Chrome</td>
      <td>[Alt] + hotkey</td>
      <td>[Alt] + hotkey</td>
      <td>[Control] + [Alt] + hotkey</td>
    </tr>
    <tr>
      <td class="fw-bold">Edge</td>
      <td>[Alt] + hotkey</td>
      <td>N/A</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td class="fw-bold">Internet Explorer</td>
      <td>[Alt] + hotkey</td>
      <td>N/A</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td class="fw-bold">Firefox</td>
      <td>[Alt] + [Shift] + hotkey</td>
      <td>[Alt] + [Shift] + hotkey</td>
      <td>[Control] + [Alt] + hotkey</td>
    </tr>
    <tr>
      <td class="fw-bold">Safari</td>
      <td>[Alt] + hotkey</td>
      <td>N/A</td>
      <td>[Control] + [Alt] + hotkey</td>
    </tr>
    <tr>
      <td class="fw-bold">Opera</td>
      <td colspan="3">
        <p>Opera 15 or newer: [Alt] + hotkey</з>
        <p>Opera 12.1 or older: [Shift] + [Esc] + hotkey</p>
      </td>
    </tr>
  </table>
</div>`);
}

export default function drawHotKeys() {
  drawTable();
}
