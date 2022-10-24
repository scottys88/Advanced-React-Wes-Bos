export default function formatMoney(amount = 0) {
  const options = {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 2,
  };

  if (amount % 100 === 0) {
    options.minimumFractionDigits = 0;
  }

  const formatter = Intl.NumberFormat('en-AU', options);

  return formatter.format(amount / 100);
}
