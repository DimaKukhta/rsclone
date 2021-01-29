export function addZeroes(num) {
  return num < 10 ? `0${num}` : num;
}

export function groupDecimals(num) {
  const result = num.toLocaleString();
  return result.replace(/,/g, ' ');
}
