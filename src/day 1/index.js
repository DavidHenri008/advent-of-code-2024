const { loadInput } = require('../utils');

const input = loadInput(1);

const prepareData = () => {
  const left = [];
  const right = [];
  // Extract the numbers from the input.
  input.forEach((nums) => {
    if (nums) {
      const numbers = nums.split('   ');
      left.push(Number(numbers[0]));
      right.push(Number(numbers[1]));
    }
  });
  // Sort arrays.
  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);
  return { left, right };
};

/**** Part ONE ****/
const part1 = () => {
  const { left, right } = prepareData();

  // Calculate the difference between left and right.
  const diff = [];
  for (let i = 0; i < left.length; i++) {
    diff.push(Math.abs(left[i] - right[i]));
  }
  // Sum differences.
  const sum = diff.reduce((acc, curr) => acc + curr);
  console.log(sum);
};

/**** Part TWO ****/
const part2 = () => {
  const { left, right } = prepareData();
  // Calculate the similarity.
  const similarity = [];
  for (let i = 0; i < left.length; i++) {
    // Find the occurrences in right list.
    const occurrences = right.filter((num) => num === left[i]);
    similarity.push(left[i] * occurrences.length);
  }
  // Sum similarities.
  const sum = similarity.reduce((acc, curr) => acc + curr);
  console.log(sum);
};

part1();
part2();
