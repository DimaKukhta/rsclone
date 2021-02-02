import { switchLang, switchLangNoBind } from './baselayoutLang';

const addLangEN = {
  addExpence: 'Add Expense',
  category: 'Category',
  chooseOne: '-- choose one --',
  amount: 'Amount',
  enterTheAmount: '-- enter the amount --',
  saveExpence: 'Save expense',

  addIncome: 'Add Income',
  saveIncome: 'Save income',

};

const addLangRU = {
  addExpence: 'Добавить расходы',
  category: 'Категория',
  chooseOne: '-- выбрать категорию --',
  amount: 'Сумма',
  enterTheAmount: '-- введите сумму --',
  saveExpence: 'Сохранить расходы',

  addIncome: 'Добавить доход',
  saveIncome: 'Сохранить доход',

};

const addLangBY = {
  addExpence: 'Дадаць выдаткі',
  category: 'Катэгорыя',
  chooseOne: '-- выбраць катэгорыю --',
  amount: 'Сума',
  enterTheAmount: '-- увядзіце суму --',
  saveExpence: 'Захаваць выдаткі',

  addIncome: 'Дадаць даход',
  saveIncome: 'Захаваць даход',

};

export default function lang(en, ru, by) {
  const localSLang = localStorage.getItem('language');
  let langL;
  // if (localSLang === 'language_by') langL = by;
  if (!localSLang) langL = en;
  if (localSLang === 'language_en') langL = en;
  if (localSLang === 'language_ru') langL = ru;
  if (localSLang === 'language_by') langL = by;
  return langL;
}

export { addLangEN, addLangRU, addLangBY };
