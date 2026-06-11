#!/usr/bin/env node

// CLI Calculator
// Supported operations:
//  - add (or +)        : addition
//  - subtract (or -)   : subtraction
//  - multiply (or *)   : multiplication
//  - divide (or /)     : division

// Usage (CLI):
//   node src/calculator.js <operation> <num1> <num2>
// Examples:
//   node src/calculator.js add 5 7
//   node src/calculator.js + 5 7

function toNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
}

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

// Programmatic API
module.exports = { add, subtract, multiply, divide };

// Simple CLI wrapper
if (require.main === module) {
  const [, , opRaw, aRaw, bRaw] = process.argv;

  if (!opRaw || aRaw === undefined || bRaw === undefined) {
    console.error('Usage: node src/calculator.js <operation> <num1> <num2>');
    console.error('Operations: add (+), subtract (-), multiply (*), divide (/)');
    process.exit(2);
  }

  const a = toNumber(aRaw);
  const b = toNumber(bRaw);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Error: both operands must be valid numbers.');
    process.exit(3);
  }

  const op = opRaw.toLowerCase();
  let result;

  try {
    if (op === 'add' || op === '+') {
      result = add(a, b);
    } else if (op === 'subtract' || op === 'sub' || op === '-') {
      result = subtract(a, b);
    } else if (op === 'multiply' || op === 'mul' || op === '*') {
      result = multiply(a, b);
    } else if (op === 'divide' || op === 'div' || op === '/') {
      result = divide(a, b);
    } else {
      console.error(`Unknown operation: ${opRaw}`);
      console.error('Supported operations: add (+), subtract (-), multiply (*), divide (/)');
      process.exit(4);
    }
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(5);
  }

  // Print result (use full precision for now)
  console.log(result);
}
