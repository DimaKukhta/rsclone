const enL = {
  day: 'Day',
  month: 'Month',
  year: 'Year',
  all: 'All',
  operations: 'Operations',
  reports: 'Reports',
  add: 'Add operation',
  hotkeys: 'Hotkeys',
  settings: 'Settings',
  theme: 'Theme',
  sound: 'Sound',
  currency: 'Currency:',
  language: 'Language:',
  balance: 'Balance',
  allExpenses: 'All expenses',
  createdBy: 'Created by:',
  forRS: 'for ',
  modalTitle: 'Do you want to delete the entry?',
  modalCancel: 'Cancel',
  modalDelete: 'Delete',
  firstTableTitle: 'In the project you can use the following hotkeys',
  secondTableTitle: 'In order to use hotkeys, find your operating system and browser in the table',
  buttons: 'BUTTONS',
  prevPeriod: 'Previous period',
  nextPeriod: 'Next period',
  selectPeriod: 'Select period',
  hotKeys: 'Hotkeys',
  browser: 'browser',
  hotkey: 'hotkey',
  operaOld: 'Opera 12.1 or older:',
  operaNew: 'Opera 15 or newer:',

};

const ruL = {
  day: 'День',
  month: 'Месяц',
  year: 'Год',
  all: 'Общее',
  operations: 'Операции',
  reports: 'Отчет',
  add: 'Добавить',
  hotkeys: 'Клавиши',
  settings: 'Настройки',
  theme: 'Тема',
  sound: 'Звук',
  currency: 'Валюта:',
  language: 'Язык:',
  balance: 'Баланс',
  allExpenses: 'Все расходы',
  createdBy: 'Cозданно:',
  forRS: 'для ',
  modalTitle: 'Вы хотите удалить запись?',
  modalCancel: 'Отмена',
  modalDelete: 'Удалить',
  firstTableTitle: 'В проекте вы можете использовать следующие горячие клавиши',
  secondTableTitle: 'Чтобы использовать горячие клавиши, найдите свою операционную систему и браузер в таблице.',
  buttons: 'Кнопки',
  prevPeriod: 'Предыдущий период',
  nextPeriod: 'Следующий период',
  selectPeriod: 'Выбор периода',
  hotKeys: 'Горячие клавиши',
  browser: 'Браузер',
  hotkey: 'клавиша',
  operaOld: 'Opera 12.1 или старше:',
  operaNew: 'Opera 15 или новее:',
};

const byL = {
  day: 'Дзень',
  month: 'Месяц',
  year: 'Год',
  all: 'Агульнае',
  operations: 'Аперацыі',
  reports: 'Справаздача',
  add: 'Дадаць',
  hotkeys: 'Клавішы',
  settings: 'Налады',
  theme: 'Тэма',
  sound: 'Гук',
  currency: 'Валюта:',
  language: 'Мова:',
  balance: 'Баланс',
  allExpenses: 'Усе выдаткі',
  createdBy: 'Створаны:',
  forRS: 'для ',
  modalTitle: 'Вы хочаце выдаліць запіс?',
  modalCancel: 'Адмена',
  modalDelete: 'Выдаліць',
  firstTableTitle: 'У праекце вы можаце выкарыстоўваць наступныя гарачыя клавішы',
  secondTableTitle: 'Каб выкарыстоўваць гарачыя клавішы, знайдзіце сваю аперацыйную сістэму і браўзэр ў табліцы.',
  buttons: 'Кнопкі',
  prevPeriod: 'Папярэдні перыяд',
  nextPeriod: 'Наступны перыяд',
  selectPeriod: 'Выбар перыяду',
  hotKeys: 'Гарачыя клавішы',
  browser: 'Браўзэр',
  hotkey: 'клавіша',
  operaOld: 'Opera 12.1 або старэй:',
  operaNew: 'Opera 15 або навей:',
};

const lang = (en, ru, by) => {
  const localSLang = localStorage.getItem('language');
  let langL;
  switch (localSLang) {
    case null || 'undefined' || 'null' || undefined:
      langL = en;
      break;
    case 'language_ru':
      langL = ru;
      break;
    case 'language_by':
      langL = by;
      break;
    case 'language_en':
      langL = en;
      break;
    default:
      langL = en;
      break;
  }
  return langL;
};

const switchLang = lang.bind(...[null, enL, ruL, byL]);
const switchLangNoBind = lang;
export { switchLang, switchLangNoBind };
export default lang(enL, ruL, byL);
