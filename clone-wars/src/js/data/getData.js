/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
export function getOperations(operationType) {
  return JSON.parse(localStorage.getItem(operationType)) || [];
}

export function getIntervalData(operationType, interval = 'all', currentDatestamp) {
  const operationsArray = getOperations(operationType);
  let intervalArray;

  switch (interval) {
    case 'day':
      intervalArray = operationsArray.filter(({ date }) => new Date(date).getDate() === new Date(currentDatestamp).getDate()
        && new Date(date).getMonth() === new Date(currentDatestamp).getMonth()
        && new Date(date).getFullYear() === new Date(currentDatestamp).getFullYear());
      return intervalArray;

    case 'month':
      intervalArray = operationsArray.filter(({ date }) => new Date(date).getMonth() === new Date(currentDatestamp).getMonth()
      && new Date(date).getFullYear() === new Date(currentDatestamp).getFullYear());
      return intervalArray;

    case 'year':
      intervalArray = operationsArray.filter(({ date }) => new Date(date).getFullYear() === new Date(currentDatestamp).getFullYear());
      return intervalArray;

    case 'all':
      return operationsArray;
    default:
      return operationsArray;
  }
}

export function groupOperationsByCategory(arrayOfOperations) {
  return arrayOfOperations.reduce((accum, { category }, ind, arr) => {
    const key = category;
    if (!accum.hasOwnProperty(key)) {
      accum[key] = arr.filter(({ category }) => category === key);
      return accum;
    }
    console.log(accum);
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

export function getOperationsForChart(operationType, interval, stamp) {
  const operationsArray = getIntervalData(operationType, interval, stamp);

  return operationsArray.reduce((accum, { category }, ind, arr) => {
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

export function getSummaryOperationsForInterval(operationType, interval, stamp) {
  const operationsArray = getIntervalData(operationType, interval, stamp);
  const summaryOperation = operationsArray.reduce((accum, { value }) => accum + value, 0);

  return summaryOperation;
}
