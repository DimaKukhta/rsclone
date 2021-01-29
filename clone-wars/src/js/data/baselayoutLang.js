const en = {
  balance: 'Balance',
  day: 'Day',
  month: 'Month',
  year: 'Year',
  all: 'all',
  operations: 'Operations',
  reports: 'Reports',
  add: 'Add operation',
  categories: 'categories',
  settings: 'Settings',

};

const ru = {
  balance: 'Баланс',
  day: 'День',
  month: 'Месяц',
  year: 'Год',
  all: 'Общее',
  operations: 'Операции',
  reports: 'Отчет',
  add: 'Добавить операцию',
  categories: 'Категории',
  settings: 'Настройки',
};

const by = {
  balance: 'Баланс',
  day: 'Дзень',
  month: 'Месяц',
  year: 'Год',
  all: 'Агульнае',
  operations: 'Аперацыі',
  reports: 'Справаздача',
  add: 'Дадаць аперацыю',
  categories: 'Катэгорыі',
  settings: 'Налады',
};

const baselang = () => {
  const localSLang = localStorage.getItem('language');
  console.log(localSLang);
  let lang;
  switch (localSLang) {
    case null || 'undefined' || 'null' || undefined:
      lang = en;
      break;
    case 'language_ru':
      lang = ru;
      break;
    case 'language_by':
      lang = by;
      break;
    case 'language_en':
      lang = en;
      break;
    default:
      lang = en;
      break;
  }
  return lang;
};

export default baselang();
