/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-case-declarations */

import { incomeCategories, expenseCategories } from './translate';

export function getOperations(operationType) {
  return JSON.parse(localStorage.getItem(operationType)) || [];
}

export function getCurrentCurrency() {
  return localStorage.getItem('currency') || 'currency_us';
}

export function getCurrentLanguage() {
  return localStorage.getItem('language') || 'language_us';
}

export function getCategoryLang(operationType, category, lang) {
  let categoryIndex;
  switch (operationType) {
    case 'expense':
      categoryIndex = expenseCategories.findIndex(({ name }) => category === name);
      return expenseCategories[categoryIndex].text[lang];
    case 'income':
      categoryIndex = incomeCategories.findIndex(({ name }) => category === name);
      return incomeCategories[categoryIndex].text[lang];
    default:
      break;
  }
}

export function getIntervalData(operationType, interval = 'all', currentDatestamp) {
  const operationsArray = getOperations(operationType);

  let intervalArray;

  switch (interval) {
    case 'Day':
      intervalArray = operationsArray.filter(({ date }) => new Date(date).getDate() === new Date(currentDatestamp).getDate()
        && new Date(date).getMonth() === new Date(currentDatestamp).getMonth()
        && new Date(date).getFullYear() === new Date(currentDatestamp).getFullYear());
      return intervalArray;

    case 'Month':
      intervalArray = operationsArray.filter(({ date }) => new Date(date).getMonth() === new Date(currentDatestamp).getMonth()
      && new Date(date).getFullYear() === new Date(currentDatestamp).getFullYear());
      return intervalArray;

    case 'Year':
      intervalArray = operationsArray.filter(({ date }) => new Date(date).getFullYear() === new Date(currentDatestamp).getFullYear());
      return intervalArray;

    case 'All':
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
    return accum;
  }, {});
}

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

export function getMaxDate() {
  const expenseArray = getIntervalData('expense');
  const incomeArray = getIntervalData('income');
  const datesArray = [...expenseArray, ...incomeArray].map(({ date }) => new Date(date).getTime());
  return Math.max(...datesArray);
}
