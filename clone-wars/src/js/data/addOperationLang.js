import { switchLangNoBind } from './baselayoutLang';

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
const switchLangBind = switchLangNoBind.bind(addLangEN, addLangRU, addLangBY);
export { switchLangBind };
export default switchLangNoBind(addLangEN, addLangRU, addLangBY);
