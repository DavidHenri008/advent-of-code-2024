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
// const part2 = () => {
//   let result = 0;
//   const map = parseData();
//   const maxI = map.length;
//   const maxJ = map[0].length;
//   const [initI, initJ] = findGuard(map);

//   // Loop through all map positions.
//   for (let posI = 0; posI < map.length; posI++) {
//     for (let posJ = 0; posJ < map[0].length; posJ++) {
//       // Clone map.
//       const newMap = [...map];
//       // Skip if it is an obstacle '#' or a guard '^'.
//       if (newMap[posI][posJ] === '#' || newMap[posI][posJ] === '^') {
//         continue;
//       }
//       // Replace position by obstacle '#'.
//       newMap[posI] = newMap[posI].substring(0, posJ) + '#' + newMap[posI].substring(posJ + 1);

//       // Begin the guard movement.
//       let sameSteps = 0;
//       let continueLoop = true;
//       let i = initI;
//       let j = initJ;
//       let offsetI = -1;
//       let offsetJ = 0;
//       while (continueLoop && sameSteps <= maxI * maxJ) {
//         // Detect if it is a new position.
//         if (newMap[i][j] !== 'X') {
//           newMap[i] = newMap[i].substring(0, j) + 'X' + newMap[i].substring(j + 1);
//           // Reset same position steps counter.
//           sameSteps = 0;
//         } else {
//           // Count how many time the guard steps in the same position.
//           sameSteps++;
//         }
//         // Calculate new guard position.
//         const currentI = i;
//         const currentJ = j;
//         i += offsetI;
//         j += offsetJ;
//         // Detect if it is out of the map.
//         if (i < 0 || i >= maxI || j < 0 || j >= maxJ) {
//           continueLoop = false;
//         } else if (newMap[i][j] === '#') {
//           // Calculate new guard direction.
//           if (offsetI === -1 && offsetJ === 0) {
//             offsetI = 0;
//             offsetJ = 1;
//           } else if (offsetI === 0 && offsetJ === 1) {
//             offsetI = 1;
//             offsetJ = 0;
//           } else if (offsetI === 1 && offsetJ === 0) {
//             offsetI = 0;
//             offsetJ = -1;
//           } else if (offsetI === 0 && offsetJ === -1) {
//             offsetI = -1;
//             offsetJ = 0;
//           }
//           // Calculate new guard position once the direction is changed.
//           i = currentI + offsetI;
//           j = currentJ + offsetJ;
//         }
//       }

//       // Detect if it is a valid path. Having true means that we were in a loop.
//       if (continueLoop) {
//         result++;
//         //console.log(continueLoop, sameSteps, result);
//       }
//     }
//   }

//   console.log(result);
// };
const part2 = () => {
  let result = 0;
  const map = parseData();
  const maxI = map.length;
  const maxJ = map[0].length;
  const [initI, initJ] = findGuard(map);

  // Loop through all map positions.
  for (let posI = 0; posI < map.length; posI++) {
    for (let posJ = 0; posJ < map[0].length; posJ++) {
      // Clone map.
      const newMap = [...map];
      // Skip if it is an obstacle '#' or a guard '^'.
      if (newMap[posI][posJ] === '#' || newMap[posI][posJ] === '^') {
        continue;
      }
      // Replace position by obstacle '#'.
      newMap[posI] = newMap[posI].substring(0, posJ) + '#' + newMap[posI].substring(posJ + 1);

      // Begin the guard movement.
      let sameSteps = 0;
      let continueLoop = true;
      let i = initI;
      let j = initJ;
      let offsetI = -1;
      let offsetJ = 0;
      while (continueLoop && sameSteps <= maxI * maxJ) {
        // Detect if it is out of the map.
        if (i < 0 || i >= maxI || j < 0 || j >= maxJ) {
          continueLoop = false;
        } else if (newMap[i][j] === '#') {
          // Calculate previous guard position.
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
          // Do not calculate new guard position here to avoid positionning over an obstacle.
        } else {
          // Detect if it is a new position.
          if (newMap[i][j] !== 'X') {
            newMap[i] = newMap[i].substring(0, j) + 'X' + newMap[i].substring(j + 1);
            // Reset same position steps counter.
            sameSteps = 0;
          } else {
            // Count how many time the guard steps in the same position.
            sameSteps++;
          }
          // Only calculate new position here.
          // Calculate new guard position once the direction is changed.
          i += offsetI;
          j += offsetJ;
        }
      }

      // Detect if it is a valid path. Having true means that we were in a loop.
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
