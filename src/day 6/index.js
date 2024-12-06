const { loadInput } = require('../utils');

const input = loadInput(6);

const parseData = () => {
  return input.filter(Boolean);
};
const findGuard = (map) => {
  // find guard represented by ^.
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === '^') {
        return [i, j];
      }
    }
  }
};
// const moveGuard = (map, initI, initJ, offsetI, offsetJ, count) => {
//   map[initI][initJ] = 'X';
//   const newI = initI + offsetI;
//   const newJ = initJ + offsetJ;
//   if (newI < 0 || newI >= map.length || newJ < 0 || newJ >= map[0].length) {
//     return;
//   }
//   if (map[newI][newJ] === '#') {
//     if (offsetI === -1 && offsetJ === 0) {
//       moveGuard(map, initI, initJ, 0, 1);
//     }
//     if (offsetI === 0 && offsetJ === 1) {
//       moveGuard(map, initI, initJ, 1, 0);
//     }
//     if (offsetI === 1 && offsetJ === 0) {
//       moveGuard(map, initI, initJ, 0, -1);
//     }
//     if (offsetI === 0 && offsetJ === -1) {
//       moveGuard(map, initI, initJ, -1, 0);
//     }
//   } else {
//     moveGuard(map, newI, newJ, offsetI, offsetJ);
//   }
// };

/**** Part ONE ****/
const part1 = () => {
  let result = 0;
  const map = parseData();
  const maxI = map.length;
  const maxJ = map[0].length;
  const [initI, initJ] = findGuard(map);

  let continueLoop = true;
  let i = initI;
  let j = initJ;
  let offsetI = -1;
  let offsetJ = 0;
  while (continueLoop) {
    if (map[i][j] !== 'X') {
      map[i] = map[i].substring(0, j) + 'X' + map[i].substring(j + 1);
      result++;
    }
    // Calculate new guard position.
    i += offsetI;
    j += offsetJ;
    // Calculate new guard mode.
    if (i < 0 || i >= maxI || j < 0 || j >= maxJ) {
      continueLoop = false;
    } else if (map[i][j] === '#') {
      i -= offsetI;
      j -= offsetJ;
      // Calculate new guard direction.
      if (offsetI === -1 && offsetJ === 0) {
        offsetI = 0;
        offsetJ = 1;
      } else if (offsetI === 0 && offsetJ === 1) {
        offsetI = 1;
        offsetJ = 0;
      } else if (offsetI === 1 && offsetJ === 0) {
        offsetI = 0;
        offsetJ = -1;
      } else if (offsetI === 0 && offsetJ === -1) {
        offsetI = -1;
        offsetJ = 0;
      }
      i += offsetI;
      j += offsetJ;
    }
    // console.log(result, map);
    //console.log(result, i, j, offsetI, offsetJ);
  }
  console.log(result);
};

/**** Part TWO ****/
const part2 = () => {
  let result = 0;
  const map = parseData();
  const maxI = map.length;
  const maxJ = map[0].length;
  const [initI, initJ] = findGuard(map);

  for (let posI = 0; posI < map.length; posI++) {
    for (let posJ = 0; posJ < map[0].length; posJ++) {
      // Skip if position is an obstacle or guard.
      const newMap = [...map];
      // Replace position by obstacle '#'.
      if (newMap[posI][posJ] !== '^') {
        newMap[posI] = newMap[posI].substring(0, posJ) + '#' + newMap[posI].substring(posJ + 1);
      }
      let sameSteps = 0;
      let continueLoop = true;
      let i = initI;
      let j = initJ;
      let offsetI = -1;
      let offsetJ = 0;
      while (continueLoop && sameSteps <= maxI * maxJ) {
        if (newMap[i][j] !== 'X') {
          newMap[i] = newMap[i].substring(0, j) + 'X' + newMap[i].substring(j + 1);
          sameSteps = 0;
        } else {
          sameSteps++;
        }
        // Calculate new guard position.
        i += offsetI;
        j += offsetJ;
        // Calculate new guard mode.
        if (i < 0 || i >= maxI || j < 0 || j >= maxJ) {
          continueLoop = false;
        } else if (newMap[i][j] === '#') {
          i -= offsetI;
          j -= offsetJ;
          // Calculate new guard direction.
          if (offsetI === -1 && offsetJ === 0) {
            offsetI = 0;
            offsetJ = 1;
          } else if (offsetI === 0 && offsetJ === 1) {
            offsetI = 1;
            offsetJ = 0;
          } else if (offsetI === 1 && offsetJ === 0) {
            offsetI = 0;
            offsetJ = -1;
          } else if (offsetI === 0 && offsetJ === -1) {
            offsetI = -1;
            offsetJ = 0;
          }
          i += offsetI;
          j += offsetJ;
        }
      }
      if (continueLoop) {
        result++;
        //console.log(continueLoop, sameSteps, result);
      }
    }
  }

  console.log(result);
};

part1();
part2();
