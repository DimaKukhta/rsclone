const currency = {
  currency_byn: 'BYN',
  currency_us: '$',
  currency_eu: '€',
};
const getCurrency = () => {
  const localCurrency = localStorage.getItem('currency');
  let cur;
  switch (localCurrency) {
    case null || 'undefined' || 'null' || undefined:
      cur = currency.currency_byn;
      break;
    case 'currency_us':
      cur = currency.currency_us;
      break;
    case 'currency_eu':
      cur = currency.currency_eu;
      break;
    default:
      cur = currency.currency_byn;
      break;
  }
  return cur;
};

export default getCurrency();
