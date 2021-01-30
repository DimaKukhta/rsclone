const en = {
  day: 'Day',
  month: 'Month',
  year: 'Year',
  all: 'all',
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
};

const ru = {
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
};

const by = {
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
};

const lang = () => {
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

const switchLang = lang;
export { switchLang };
export default lang();
