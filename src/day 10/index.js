const { loadInput } = require('../utils');

const input = loadInput(10).filter(Boolean);

/**** Part ONE ****/
const walkNext1 = (trailFound, i, j, nextvalue) => {
  // Check if it is a trailhead.
  if (input[i][j] !== nextvalue.toString()) {
    return 0;
  }
  // Check if it is a trailend.
  if (nextvalue === 9 && !trailFound.includes(`${i},${j}`)) {
    trailFound.push(`${i},${j}`);
    return 1;
  }
  let result = 0;
  if (i > 0) {
    result += walkNext1(trailFound, i - 1, j, nextvalue + 1);
  }
  if (j > 0) {
    result += walkNext1(trailFound, i, j - 1, nextvalue + 1);
  }
  if (i < input.length - 1) {
    result += walkNext1(trailFound, i + 1, j, nextvalue + 1);
  }
  if (j < input[0].length - 1) {
    result += walkNext1(trailFound, i, j + 1, nextvalue + 1);
  }
  return result;
};
const part1 = () => {
  let result = 0;
  // For each trailhead, char 0, count the its value.
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      const trailFound = [];
      // Follow each trail, a suite of 0 to 9. It may only be N, E, S, W.
      const score = walkNext1(trailFound, i, j, 0);
      result += score;
    }
  }

  console.log(result);
};

/**** Part TWO ****/
const walkNext2 = (trailFound, i, j, nextvalue) => {
  // Check if it is a trailhead.
  if (input[i][j] !== nextvalue.toString()) {
    return 0;
  }
  // Check if it is a trailend.
  if (nextvalue === 9) {
    return 1;
  }
  let result = 0;
  if (i > 0) {
    result += walkNext2(trailFound, i - 1, j, nextvalue + 1);
  }
  if (j > 0) {
    result += walkNext2(trailFound, i, j - 1, nextvalue + 1);
  }
  if (i < input.length - 1) {
    result += walkNext2(trailFound, i + 1, j, nextvalue + 1);
  }
  if (j < input[0].length - 1) {
    result += walkNext2(trailFound, i, j + 1, nextvalue + 1);
  }
  return result;
};
const part2 = () => {
  let result = 0;
  // For each trailhead, char 0, count the its value.
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      const trailFound = [];
      // Follow each trail, a suite of 0 to 9. It may only be N, E, S, W.
      const score = walkNext2(trailFound, i, j, 0);
      result += score;
    }
  }

  console.log(result);
};

part1();
part2();
