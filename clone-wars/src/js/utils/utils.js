export function addZeroes(num) {
  return num < 10 ? `0${num}` : num;
}

export function groupDecimals(num) {
  let [main, rest] = `${num}`.split('.');
  const result = (+main).toLocaleString();
  rest = (rest) || '00';
  return `${result.replace(/,/g, ' ')}.${rest}`;
}

export function disableBtn(btn) {
  btn.disabled = true;
}

export function enableBtn(btn) {
  btn.disabled = false;
}
