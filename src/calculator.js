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
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a % b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error('Square root of negative number');
  }
  return Math.sqrt(n);
}

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot };

// Simple CLI wrapper
if (require.main === module) {
  const args = process.argv.slice(2);
  const opRaw = args[0];

  if (!opRaw) {
    console.error('Usage: node src/calculator.js <operation> <num1> <num2>');
    console.error('Operations: add (+), subtract (-), multiply (*), divide (/), mod (%), pow (^), sqrt');
    process.exit(2);
  }

  const op = opRaw.toLowerCase();
  let aRaw = args[1];
  let bRaw = args[2];

  // sqrt is a unary operation (requires one operand)
  if (op === 'sqrt' || op === '√') {
    if (aRaw === undefined) {
      console.error('Usage: node src/calculator.js sqrt <num>');
      process.exit(2);
    }
    const a = toNumber(aRaw);
    if (Number.isNaN(a)) {
      console.error('Error: operand must be a valid number.');
      process.exit(3);
    }
    try {
      console.log(squareRoot(a));
      process.exit(0);
    } catch (err) {
      console.error('Error:', err.message || err);
      process.exit(5);
    }
  }

  // For all binary operations ensure both operands are present
  if (aRaw === undefined || bRaw === undefined) {
    console.error('Usage: node src/calculator.js <operation> <num1> <num2>');
    process.exit(2);
  }

  const a = toNumber(aRaw);
  const b = toNumber(bRaw);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Error: both operands must be valid numbers.');
    process.exit(3);
  }

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
    } else if (op === 'mod' || op === '%') {
      result = modulo(a, b);
    } else if (op === 'pow' || op === '^') {
      result = power(a, b);
    } else {
      console.error(`Unknown operation: ${opRaw}`);
      console.error('Supported operations: add (+), subtract (-), multiply (*), divide (/), mod (%), pow (^), sqrt');
      process.exit(4);
    }
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(5);
  }

  // Print result (use full precision for now)
  console.log(result);
}
