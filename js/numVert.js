const form = document.getElementById('form');
const input = document.getElementById('input');
const output = document.getElementById('output');

// Dropdown Button
const conversionButton = document.getElementById('dropdown-button')
const resultButton = document.getElementById('dropdown-button-result');

// Dropdown elements
const conversionDropdown = document.getElementById('dropdown');
const conversionDropdownResult = document.getElementById('dropdown-result');

// Conversion Option
const binary = document.getElementById('binary');
const octal = document.getElementById('octal');
const decimal = document.getElementById('decimal');
const hex = document.getElementById('hex');

// Result Conversion
const resultBinary = document.getElementById('result-binary');
const resultoctal = document.getElementById('result-octal');
const resultdecimal = document.getElementById('result-decimal');
const resulthex = document.getElementById('result-hex');

let currentConversion = 'decimal';
let resultType = 'decimal';

// Event listeners for conversion type selection
binary.addEventListener('click', () => {
  conversionButton.innerText = 'Binary';
  currentConversion = 'binary';
  conversionDropdown.classList.add('hidden');
  logic();
});

octal.addEventListener('click', () => {
  conversionButton.innerText = 'Octal';
  currentConversion = 'octal';
  conversionDropdown.classList.add('hidden');
  logic();
});

decimal.addEventListener('click', () => {
  conversionButton.innerText = 'Decimal';
  currentConversion = 'decimal';
  conversionDropdown.classList.add('hidden');
  logic();
});

hex.addEventListener('click', () => {
  conversionButton.innerText = 'Hexadecimal';
  currentConversion = 'hex';
  conversionDropdown.classList.add('hidden');
  logic();
});

// Event listeners for result type selection
resultBinary.addEventListener('click', () => {
  resultButton.innerText = 'Binary';
  resultType = 'binary';
  conversionDropdownResult.classList.add('hidden');
  logic();
})

resultoctal.addEventListener('click', () => {
  resultButton.innerText = 'Octal';
  resultType = 'octal';
  conversionDropdownResult.classList.add('hidden');
  logic();
});

resultdecimal.addEventListener('click', () => {
  resultButton.innerText = 'Decimal';
  resultType = 'decimal';
  conversionDropdownResult.classList.add('hidden');
  logic();
});

resulthex.addEventListener('click', () => {
  resultButton.innerText = 'Hexadecimal';
  resultType = 'hex';
  conversionDropdownResult.classList.add('hidden');
  logic();
});

// Event listeners for form
form.addEventListener('keyup', (even) => {
  even.preventDefault();
  logic();
});

form.addEventListener('submit', (even) => {
  even.preventDefault();
  logic();
});

// The Logic of System
function logic() {
  let number;
  if (currentConversion === 'binary') {
    number = parseInt(input.value, 2)
  } else if (currentConversion === 'octal') {
    number = parseInt(input.value, 8)
  } else if (currentConversion === 'decimal') {
    number = parseInt(input.value, 10)
  } else if (currentConversion === 'hex') {
    number = parseInt(input.value, 16)
  }

  if (resultType === 'binary') {
    output.value = number.toString('2')
  } else if (resultType === 'octal') {
    output.value = number.toString('8')
  } else if (resultType === 'decimal') {
    output.value = number.toString('10')
  } else if (resultType === 'hex') {
    output.value = number.toString('16').toUpperCase();
  }
}