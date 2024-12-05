const { loadInput } = require('../utils');

const input = loadInput(4).filter(Boolean);

/**** Part ONE ****/
const part1 = () => {
  // Count xmas strings in data. It may be horizontal, vertical, diagonal and backward.
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      const char = input[i][j];
      if (char === 'X') {
        // Check for xmas string in horizontal.
        if (input[i][j + 1] === 'M' && input[i][j + 2] === 'A' && input[i][j + 3] === 'S') {
          count++;
        }
        // Check for xmas string in backward horizontal.
        if (input[i][j - 1] === 'M' && input[i][j - 2] === 'A' && input[i][j - 3] === 'S') {
          count++;
        }
        // Check for xmas string in vertical.
        if (
          input[i + 1] &&
          input[i + 1][j] === 'M' &&
          input[i + 2] &&
          input[i + 2][j] === 'A' &&
          input[i + 3] &&
          input[i + 3][j] === 'S'
        ) {
          count++;
        }
        // Check for xmas string in backward vertical.
        if (
          input[i - 1] &&
          input[i - 1][j] === 'M' &&
          input[i - 2] &&
          input[i - 2][j] === 'A' &&
          input[i - 3] &&
          input[i - 3][j] === 'S'
        ) {
          count++;
        }
        // Check for xmas string in diagonal south-east.
        if (
          input[i + 1] &&
          input[i + 1][j + 1] === 'M' &&
          input[i + 2] &&
          input[i + 2][j + 2] === 'A' &&
          input[i + 3] &&
          input[i + 3][j + 3] === 'S'
        ) {
          count++;
        }
        // Check for xmas string in backward diagonal south-east.
        if (
          input[i - 1] &&
          input[i - 1][j - 1] === 'M' &&
          input[i - 2] &&
          input[i - 2][j - 2] === 'A' &&
          input[i - 3] &&
          input[i - 3][j - 3] === 'S'
        ) {
          count++;
        }
        // Check for xmas string in diagonal north-east.
        if (
          input[i - 1] &&
          input[i - 1][j + 1] === 'M' &&
          input[i - 2] &&
          input[i - 2][j + 2] === 'A' &&
          input[i - 3] &&
          input[i - 3][j + 3] === 'S'
        ) {
          count++;
        }
        // Check for xmas string in backward diagonal north-east.
        if (
          input[i + 1] &&
          input[i + 1][j - 1] === 'M' &&
          input[i + 2] &&
          input[i + 2][j - 2] === 'A' &&
          input[i + 3] &&
          input[i + 3][j - 3] === 'S'
        ) {
          count++;
        }
      }
    }
  }
  console.log(count);
};

/**** Part TWO ****/
const part2 = () => {
  // Count mas strings in x in data.
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      const char = input[i][j];
      if (char === 'A') {
        // Check for mas strings in format
        // M . M
        // . A .
        // S . S
        if (
          input[i - 1] &&
          input[i - 1][j - 1] === 'M' &&
          input[i - 1][j + 1] === 'M' &&
          input[i + 1] &&
          input[i + 1][j - 1] === 'S' &&
          input[i + 1][j + 1] === 'S'
        ) {
          count++;
        }
        // Check for mas strings in format
        // S . M
        // . A .
        // S . M
        if (
          input[i - 1] &&
          input[i - 1][j - 1] === 'S' &&
          input[i - 1][j + 1] === 'M' &&
          input[i + 1] &&
          input[i + 1][j - 1] === 'S' &&
          input[i + 1][j + 1] === 'M'
        ) {
          count++;
        }
        // Check for mas strings in format
        // S . S
        // . A .
        // M . M
        if (
          input[i - 1] &&
          input[i - 1][j - 1] === 'S' &&
          input[i - 1][j + 1] === 'S' &&
          input[i + 1] &&
          input[i + 1][j - 1] === 'M' &&
          input[i + 1][j + 1] === 'M'
        ) {
          count++;
        }
        // Check for mas strings in format
        // M . S
        // . A .
        // M . S
        if (
          input[i - 1] &&
          input[i - 1][j - 1] === 'M' &&
          input[i - 1][j + 1] === 'S' &&
          input[i + 1] &&
          input[i + 1][j - 1] === 'M' &&
          input[i + 1][j + 1] === 'S'
        ) {
          count++;
        }
      }
    }
  }
  console.log(count);
};

part1();
part2();
