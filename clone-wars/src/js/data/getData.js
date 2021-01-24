/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
export function getExpenses() {
  return JSON.parse(localStorage.getItem('expenses')) || [];
}

export function getIntervalData(interval = 'all', currentDatestamp) {
  const expensesArray = getExpenses();
  let intervalArray;

  switch (interval) {
    case 'day':
      intervalArray = expensesArray.filter(({ date }) => new Date(date).getDate() === new Date(currentDatestamp).getDate()
        && new Date(date).getMonth() === new Date(currentDatestamp).getMonth()
        && new Date(date).getFullYear() === new Date(currentDatestamp).getFullYear());
      return intervalArray;

    case 'month':
      intervalArray = expensesArray.filter(({ date }) => new Date(date).getMonth() === new Date(currentDatestamp).getMonth()
      && new Date(date).getFullYear() === new Date(currentDatestamp).getFullYear());
      return intervalArray;

    case 'year':
      intervalArray = expensesArray.filter(({ date }) => new Date(date).getFullYear() === new Date(currentDatestamp).getFullYear());
      return intervalArray;

    case 'all':
      return expensesArray;
    default:
      return expensesArray;
  }
}

export function getSummaryExpensesForInterval() {
  
}
