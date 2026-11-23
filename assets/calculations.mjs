// Keep arithmetic independent of the DOM so it can be tested in Node and the browser.
export function calculateDiscount(priceInput, discountInput) {
  const errors = {};
  const fields = [
    ['price', priceInput, 1e9, 'Enter a price from 0 to 1,000,000,000.'],
    ['discount', discountInput, 100, 'Enter a discount from 0 to 100%.'],
  ];
  for (const [name, input, maximum, message] of fields) {
    // Decimal and scientific notation are supported, as with HTML number inputs.
    const text = String(input ?? '').trim();
    if (!/^[+]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(text)
      || !Number.isFinite(Number(text)) || Number(text) > maximum) {
      errors[name] = message;
    }
  }
  if (Object.keys(errors).length) return { errors };
  const original = Number(priceInput);
  const percent = Number(discountInput);
  const saved = original * percent / 100;
  return { errors, original, percent, saved, final: original - saved };
}
