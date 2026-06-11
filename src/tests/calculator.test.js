const { add, subtract, multiply, divide, modulo, power, squareRoot } = require('../calculator');

describe('CLI calculator functions', () => {
  // Examples from the provided image
  test('2 + 3 => 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('10 - 4 => 6', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('45 * 2 => 90', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('20 / 5 => 4', () => {
    expect(divide(20, 5)).toBe(4);
  });

  // Extended operations (from calc-extended-operations.png)
  test('5 % 2 => 1 (modulo)', () => {
    expect(modulo(5, 2)).toBe(1);
  });

  test('2 ^ 3 => 8 (power)', () => {
    expect(power(2, 3)).toBe(8);
  });

  test('sqrt 16 => 4 (squareRoot)', () => {
    expect(squareRoot(16)).toBe(4);
  });

  // Edge cases
  test('division by zero throws an error', () => {
    expect(() => divide(5, 0)).toThrow('Division by zero');
  });

  test('modulo by zero throws an error', () => {
    expect(() => modulo(5, 0)).toThrow('Division by zero');
  });

  test('square root of negative number throws an error', () => {
    expect(() => squareRoot(-9)).toThrow('Square root of negative number');
  });

  test('handles negative numbers', () => {
    expect(add(-2, -3)).toBe(-5);
    expect(subtract(-2, 3)).toBe(-5);
    expect(multiply(-4, 3)).toBe(-12);
    expect(divide(-20, 5)).toBe(-4);
  });

  test('power with negative exponent', () => {
    expect(power(2, -1)).toBeCloseTo(0.5, 10);
  });

  test('handles floating point numbers (precision)', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3, 5);
    expect(divide(1.5, 0.5)).toBeCloseTo(3.0, 5);
  });
});
