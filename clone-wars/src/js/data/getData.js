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

export function groupExpensesByCategory(arrayOfExpenses) {
  return arrayOfExpenses.reduce((accum, { category }, ind, arr) => {
    const key = category;
    if (!accum.hasOwnProperty(key)) {
      accum[key] = arr.filter(({ category }) => category === key);
      return accum;
    }
    return accum;
  }, {});
}

// Дима, interval это значения: day, month, year, all.
// его получаем так:
// const intervalSelect = document.querySelector('#interval-select');
// const interval = intervalSelect.value; (1-й параметр ф-ии)
// stamp - временная отметка, которая управляется кнопками "prev/next"
// const currentInterval = document.querySelector('#interval');
// const currentDatestamp = +currentInterval.dataset.date; (2-й параметр ф-ии)

export function getExpensesForChart(interval, stamp) {
  const expensesArray = getIntervalData(interval, stamp);

  return expensesArray.reduce((accum, { category }, ind, arr) => {
    const key = category;
    if (!accum.hasOwnProperty(key)) {
      accum[key] = arr.reduce((accum, { category, value }) => {
        if (category === key) {
          return accum + value;
        }
        return accum;
      }, 0);
      return accum;
    }
    return accum;
  }, {});
}

export function getSummaryExpensesForInterval(interval, stamp) {
  const expensesArray = getIntervalData(interval, stamp);
  const summaryExpense = expensesArray.reduce((accum, { value }) => accum + value, 0);

  return summaryExpense;
}
