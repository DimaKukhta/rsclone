export function addZeroes(num) {
  return num < 10 ? `0${num}` : num;
}

export function groupDecimals(num) {
  const result = num.toLocaleString();
  return result.replace(/,/g, ' ');
}

export function disableBtn(btn) {
  btn.disabled = true;
}

export function enableBtn(btn) {
  btn.disabled = false;
}
