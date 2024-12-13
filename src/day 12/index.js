const { loadInput } = require('../utils');

const input = loadInput(12).filter(Boolean);

/**** Part ONE ****/
const walkRegion = (i, j, visited) => {
  let area = 0;
  let perimeter = 0;
  const match = input[i][j];
  const queue = [[i, j]];

  while (queue.length) {
    const [x, y] = queue.shift();
    if (x < 0 || x >= input.length || y < 0 || y >= input[x].length) {
      perimeter++;
      continue;
    }
    if (input[x][y] !== match) {
      perimeter++;
      continue;
    }
    if (visited.has(`${x}-${y}`)) continue;

    visited.add(`${x}-${y}`);
    area++;
    queue.push([x + 1, y]);
    queue.push([x - 1, y]);
    queue.push([x, y + 1]);
    queue.push([x, y - 1]);
  }
  // console.log(match, area, perimeter);
  return { area, perimeter };
};

const part1 = () => {
  let result = 0;
  let visited = new Set();

  // Parse map to calculate region with same character.
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (visited.has(`${i}-${j}`)) continue;
      const { area, perimeter } = walkRegion(i, j, visited);
      result += area * perimeter;
    }
  }
  console.log(result);
};

/**** Part TWO ****/
const part2 = () => {
  let result = 0;

  console.log(result);
};

part1();
part2();
