/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import { addZeroes } from '../utils/utils';

export function setIntervalDate(stamp) {
  const currentInterval = document.querySelector('#interval');

  const date = new Date(stamp);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  currentInterval.dataset.date = `${new Date(year, month, day).getTime()}`;
}

export function getIntervalText(stamp) {
  const intervalSelect = document.querySelector('#interval-select');

  const date = new Date(stamp);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const intervalValue = intervalSelect.value;

  switch (intervalValue) {
    case 'Day':
      return `${addZeroes(day)}.${addZeroes(month + 1)}.${year}`;
    case 'Month':
      return `${addZeroes(month + 1)}.${year}`;
    case 'Year':
      return `${year}`;
    case 'All':
      return 'All expenses';
    default:
      break;
  }
}

export function getNextDatestampForInterval(interval, stamp) {
  const currDate = new Date(stamp);

  let prevDatestamp;

  switch (interval) {
    case 'Day':
      currDate.setDate(currDate.getDate() + 1);
      prevDatestamp = currDate.getTime();
      return prevDatestamp;
    case 'Month':
      currDate.setMonth(currDate.getMonth() + 1);
      prevDatestamp = currDate.getTime();
      return prevDatestamp;
    case 'Year':
      currDate.setFullYear(currDate.getFullYear() + 1);
      prevDatestamp = currDate.getTime();
      return prevDatestamp;
    case 'All':
      return stamp;
    default:
      break;
  }
}

export function getPreviousDatestampForInterval(interval, stamp) {
  const currDate = new Date(stamp);

  let prevDatestamp;

  switch (interval) {
    case 'Day':
      currDate.setDate(currDate.getDate() - 1);
      prevDatestamp = currDate.getTime();
      return prevDatestamp;
    case 'Month':
      currDate.setMonth(currDate.getMonth() - 1);
      prevDatestamp = currDate.getTime();
      return prevDatestamp;
    case 'Year':
      // console.log(currDate, currDate.getFullYear()-1)
      currDate.setFullYear(currDate.getFullYear() - 1);
      prevDatestamp = currDate.getTime();
      return prevDatestamp;
    case 'All':
      return stamp;
    default:
      break;
  }
}
