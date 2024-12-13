const { loadInput } = require('../utils');

const input = loadInput(11).filter(Boolean);
const parseData = () => {
  return input[0].split(' ').map(Number);
};

/**** Part ONE ****/
const part1 = () => {
  let result = 0;
  const stones = parseData();
  for (let i = 0; i < 25; i++) {
    // Update each stone.
    for (let j = 0; j < stones.length; j++) {
      // Number 0 becomes 1.
      // Even digit number becomes two stones, each with half of the number.
      // Otherwise the number is multiply by 2024.
      const valueString = stones[j].toString();
      if (stones[j] === 0) {
        stones[j] = 1;
      } else if (valueString.length % 2 === 0) {
        const left = Number(valueString.slice(0, valueString.length / 2));
        const right = Number(valueString.slice(valueString.length / 2));
        stones[j] = left;
        stones.splice(j + 1, 0, right);
        j++;
      } else {
        stones[j] = stones[j] * 2024;
      }
    }
  }
  result = stones.length;
  console.log(result);
};

/**** Part TWO ****/
const countLevel = (memo, number, count) => {
  if (count === 0) {
    return 1;
  }

  const valueString = number.toString();
  const key = `${number},${count}`;
  if (memo.has(key)) {
    return memo.get(key);
  }

  if (number === 0) {
    const newValue = countLevel(memo, 1, count - 1);
    memo.set(key, newValue);
    return newValue;
  }

  if (valueString.length % 2 === 0) {
    const left = Number(valueString.slice(0, valueString.length / 2));
    const right = Number(valueString.slice(valueString.length / 2));
    const newValueLeft = countLevel(memo, left, count - 1);
    const newValueRight = countLevel(memo, right, count - 1);
    memo.set(key, newValueLeft + newValueRight);
    return newValueLeft + newValueRight;
  }

  const newValue = countLevel(memo, number * 2024, count - 1);
  memo.set(key, newValue);
  return newValue;
};

const part2 = () => {
  let result = 0;
  const stones = parseData();
  var memo = new Map();
  for (let i = 0; i < stones.length; i++) {
    result += countLevel(memo, stones[i], 75);
  }

  console.log(result);
};

part1();
part2();
