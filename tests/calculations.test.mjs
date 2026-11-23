import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateDiscount } from '../assets/calculations.mjs';

test('ordinary discount and endpoints', () => {
  for (const [price, discount, final, saved] of [
    ['2500', '20', 2000, 500], ['1000', '0', 1000, 0],
    ['1000', '100', 0, 1000], ['0', '20', 0, 0],
    ['1000000000', '50', 500000000, 500000000],
  ]) {
    const result = calculateDiscount(price, discount);
    assert.deepEqual(result.errors, {});
    assert.equal(result.final, final);
    assert.equal(result.saved, saved);
  }
});
test('decimal inputs retain precision until display', () => {
  const result = calculateDiscount('99.99', '12.5');
  assert.ok(Math.abs(result.final - 87.49125) < 1e-10);
  assert.equal(result.final.toFixed(2), '87.49');
});
test('rejects missing, invalid, nonfinite and out-of-range prices', () => {
  for (const value of ['', ' ', null, undefined, '-1', 'Infinity', 'NaN', '1e309', '1000000001', '2,500', '0xff']) {
    assert.ok(calculateDiscount(value, '20').errors.price, String(value));
  }
});
test('rejects invalid discounts including both fields empty', () => {
  for (const value of ['', '-1', '100.01', 'Infinity', 'hello']) {
    assert.ok(calculateDiscount('1000', value).errors.discount, value);
  }
  assert.deepEqual(Object.keys(calculateDiscount('', '').errors), ['price', 'discount']);
});
test('supports explicitly documented scientific notation', () => {
  assert.equal(calculateDiscount('1e3', '2e1').final, 800);
});
