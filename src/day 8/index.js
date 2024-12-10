const { loadInput } = require('../utils');

const input = loadInput(8).filter(Boolean);
const parsedData = () => {
  // parse input to map each antenna.
  const antennas = new Map();
  for (let i = 0; i < input.length; i++) {
    if (!input[i]) continue;
    for (let j = 0; j < input[i].length; j++) {
      const id = input[i][j];
      if (id !== '.') {
        if (!antennas.has(id)) {
          antennas.set(id, []);
        }
        antennas.get(id).push([i, j]);
      }
    }
  }
  return antennas;
};

/**** Part ONE ****/
const part1 = () => {
  let result = 0;
  const maxX = input.length;
  const maxY = input[0].length;
  const antennas = parsedData();
  // console.log(antennas);
  // For each antenna, calculate the distance between the two points and determine the antinodes.
  // Antinodes are position inline with the two points and at the same distance from the two points.
  const antinodes = new Set();
  antennas.forEach((antenna) => {
    // Compare each pair of points to determine the distance between them.
    for (let i = 0; i < antenna.length; i++) {
      for (let j = i + 1; j < antenna.length; j++) {
        const [x1, y1] = antenna[i];
        const [x2, y2] = antenna[j];
        const distX = x2 - x1;
        const antinode1X = x1 - distX;
        const antinode2X = x2 + distX;
        const distY = y2 - y1;
        const antinode1Y = y1 - distY;
        const antinode2Y = y2 + distY;
        // console.log(distX, distY, antinode1X, antinode1Y, antinode2X, antinode2Y);
        // Validate if the antinode is within the grid.
        if (antinode1X >= 0 && antinode1X < maxX && antinode1Y >= 0 && antinode1Y < maxY) {
          if (!antinodes.has(`${antinode1X},${antinode1Y}`)) {
            antinodes.add(`${antinode1X},${antinode1Y}`);
            result++;
          }
        }
        if (antinode2X >= 0 && antinode2X < maxX && antinode2Y >= 0 && antinode2Y < maxY) {
          if (!antinodes.has(`${antinode2X},${antinode2Y}`)) {
            antinodes.add(`${antinode2X},${antinode2Y}`);
            result++;
          }
        }
      }
    }
  });

  console.log(result);

  return result;
};

/**** Part TWO ****/
const part2 = () => {
  let result = 0;
  const maxX = input.length;
  const maxY = input[0].length;
  const antennas = parsedData();
  // console.log(antennas);
  // For each antenna, calculate the distance between the two points and determine the antinodes.
  // Antinodes are position inline with the two points and at the same distance from the two points.
  const antinodes = new Set();
  antennas.forEach((antenna) => {
    // Compare each pair of points to determine the distance between them.
    for (let i = 0; i < antenna.length; i++) {
      for (let j = i + 1; j < antenna.length; j++) {
        const [x1, y1] = antenna[i];
        const [x2, y2] = antenna[j];
        const distX = x2 - x1;
        const distY = y2 - y1;
        for (let k = 1; k < Math.max(maxX, maxY); k++) {
          const antinode1X = x1 - distX * k;
          const antinode2X = x2 + distX * k;
          const antinode1Y = y1 - distY * k;
          const antinode2Y = y2 + distY * k;
          // console.log(distX, distY, antinode1X, antinode1Y, antinode2X, antinode2Y);
          // Validate if the antinode is within the grid.
          if (antinode1X >= 0 && antinode1X < maxX && antinode1Y >= 0 && antinode1Y < maxY) {
            if (!antinodes.has(`${antinode1X},${antinode1Y}`)) {
              antinodes.add(`${antinode1X},${antinode1Y}`);
              result++;
            }
          }
          if (antinode2X >= 0 && antinode2X < maxX && antinode2Y >= 0 && antinode2Y < maxY) {
            if (!antinodes.has(`${antinode2X},${antinode2Y}`)) {
              antinodes.add(`${antinode2X},${antinode2Y}`);
              result++;
            }
          }
        }
      }
    }
  });
  antennas.forEach((antenna) => {
    if (antenna.length > 1) {
      antenna.forEach((point) => {
        if (!antinodes.has(`${point[0]},${point[1]}`)) {
          antinodes.add(`${point[0]},${point[1]}`);
          result++;
        }
      });
    }
  });

  console.log(result);

  return result;
};

part1();
part2();
