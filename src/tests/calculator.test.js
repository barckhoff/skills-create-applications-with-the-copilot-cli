const { add, subtract, multiply, divide } = require('../calculator');

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

  // Edge cases
  test('division by zero throws an error', () => {
    expect(() => divide(5, 0)).toThrow('Division by zero');
  });

  test('handles negative numbers', () => {
    expect(add(-2, -3)).toBe(-5);
    expect(subtract(-2, 3)).toBe(-5);
    expect(multiply(-4, 3)).toBe(-12);
    expect(divide(-20, 5)).toBe(-4);
  });

  test('handles floating point numbers (precision)', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3, 5);
    expect(divide(1.5, 0.5)).toBeCloseTo(3.0, 5);
  });
});
