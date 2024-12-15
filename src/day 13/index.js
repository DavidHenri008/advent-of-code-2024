const { loadInput } = require('../utils');

const input = loadInput(13).filter(Boolean);
const parseData = (offset=0) => {
  let machines = [];
  // Parse data where each three lines are a machine.
  for (let i = 0; i < input.length; i += 3) {
    const machine = {};
    const buttonRegex = /X\+(\d+), Y\+(\d+)/i;
    const matchesA = input[i].match(buttonRegex);
    machine.aX = Number(parseInt(matchesA[1]));
    machine.aY = Number(parseInt(matchesA[2]));
    const matchesB = input[i + 1].match(buttonRegex);
    machine.bX = Number(parseInt(matchesB[1]));
    machine.bY = Number(parseInt(matchesB[2]));
    const prizeRegex = /X=(\d+), Y=(\d+)/i;
    const matchesP = input[i + 2].match(prizeRegex);
    machine.pX = Number(parseInt(matchesP[1])) + offset;
    machine.pY = Number(parseInt(matchesP[2])) + offset;
    machines.push(machine);
  }
  return machines;
};

/**** Part ONE ****/
const calculateCost1 = (machine, memo, posX, posY, count, nbPressA, nbPressB) => {
  // Validate if the position is the same as the prize.
  if (posX === machine.pX && posY === machine.pY) {
    return count;
  }
  // Validate it cannot be more than 100 press per button.
  if (nbPressA > 100 || nbPressB > 100 || posX > machine.pX || posY > machine.pY) {
    return null;
  }
  if (memo.has(`${nbPressA},${nbPressB}`)) {
    return memo.get(`${nbPressA},${nbPressB}`);
  }
  // Calculate the next position for each button.
  const countA = calculateCost1(
    machine,
    memo,
    posX + machine.aX,
    posY + machine.aY,
    count + 3,
    nbPressA + 1,
    nbPressB
  );
  const countB = calculateCost1(
    machine,
    memo,
    posX + machine.bX,
    posY + machine.bY,
    count + 1,
    nbPressA,
    nbPressB + 1
  );

  // Return the minimum cost between the two buttons.
  let result = Math.min(countA, countB);
  if (countA === null) {
    result = countB;
  }
  if (countB === null) {
    result = countA;
  }
  memo.set(`${nbPressA},${nbPressB}`, result);
  return result;
};

const part1 = () => {
  let result = 0;
  const machines = parseData();
  // For each machine, calculate the minimum number of token to obtain the prize.
  // Each A press cost 3 tokens and B press 1 token.
  machines.forEach((machine) => {
    const memo = new Map();
    const minToken = calculateCost1(machine, memo, 0, 0, 0, 0, 0);
    if (minToken !== null) {
      result += minToken;
    }
    // let success = [];
    // let posX = 0;
    // let posY = 0;
    // for (let a = 0; a < 100; a++) {
    //   for (let b = 0; b < 100; b++) {
    //     posX = machine.aX * a + machine.bX * b;
    //     posY = machine.aY * a + machine.bY * b;
    //     // console.log(posX, posY, a, b);
    //     if (posX === machine.pX && posY === machine.pY) {
    //       success.push(a * 3 + b);
    //     }
    //     if (posX > machine.pX || posY > machine.pY) {
    //       break;
    //     }
    //   }
    // }
    // if (success.length > 0) {
    //   result += success.sort()[0];
    // }
  });

  console.log(result);
};

/**** Part TWO ****/
const calculateCost2 = (machine, memo, posX, posY, count, nbPressA, nbPressB) => {
  // Validate if the position is the same as the prize.
  if (posX === machine.pX && posY === machine.pY) {
    return count;
  }
  if ( posX > machine.pX || posY > machine.pY) {
    return null;
  }
  if (memo.has(`${nbPressA},${nbPressB}`)) {
    return memo.get(`${nbPressA},${nbPressB}`);
  }
  // Calculate the next position for each button.
  const countA = calculateCost2(
    machine,
    memo,
    posX + machine.aX,
    posY + machine.aY,
    count + 3,
    nbPressA + 1,
    nbPressB
  );
  const countB = calculateCost2(
    machine,
    memo,
    posX + machine.bX,
    posY + machine.bY,
    count + 1,
    nbPressA,
    nbPressB + 1
  );

  // Return the minimum cost between the two buttons.
  let result = Math.min(countA, countB);
  if (countA === null) {
    result = countB;
  }
  if (countB === null) {
    result = countA;
  }
  memo.set(`${nbPressA},${nbPressB}`, result);
  return result;
};

const part2 = () => {let result = 0;
const machines = parseData(10000000000000);
// For each machine, calculate the minimum number of token to obtain the prize.
// Each A press cost 3 tokens and B press 1 token.
machines.forEach((machine) => {
  // const memo = new Map();
  // const minToken = calculateCost2(machine, memo, 0, 0, 0, 0, 0);
  // if (minToken !== null) {
  //   result += minToken;
  // }
  let success = [];
  let posX = 0;
  let posY = 0;
  for (let a = 0; a < 1000; a++) {
    for (let b = 0; b < 1000; b++) {
      posX = machine.aX * a + machine.bX * b;
      posY = machine.aY * a + machine.bY * b;
      // console.log(posX, posY, a, b);
      if (posX === machine.pX && posY === machine.pY) {
        success.push(a * 3 + b);
      }
      if (posX > machine.pX || posY > machine.pY) {
        break;
      }
    }
  }
  if (success.length > 0) {
    result += success.sort()[0];
  }
});

console.log(result);};

part1();
part2();
