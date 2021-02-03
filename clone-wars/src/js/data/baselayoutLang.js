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
  forRS: 'for &nbsp;',
  modalTitle: 'Do you want to delete the entry?',
  modalCancel: 'Cancel',
  modalDelete: 'Delete',
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
  forRS: 'для &nbsp;',
  modalTitle: 'Вы хотите удалить запись?',
  modalCancel: 'Отмена',
  modalDelete: 'Удалить',
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
  forRS: 'для &nbsp;',
  modalTitle: 'Вы хочаце выдаліць запіс?',
  modalCancel: 'Адмена',
  modalDelete: 'Выдаліць',
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
