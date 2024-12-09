const { loadInput } = require('../utils');

const input = loadInput(7);
const parsedInput = () => {
  const result = [];
  // Parse each input line which has the format [result]: [input] [input] ...
  input.forEach((line) => {
    if (!line) {
      return;
    }
    const parts = line.split(': ');
    const endResult = Number(parts[0]);
    const values = parts[1].split(' ').map(Number);
    result.push({ result: endResult, values });
  });
  return result;
};

/**** Part ONE ****/
const part1 = () => {
  let result = 0;
  let nbMatches = 0;
  const equations = parsedInput();

  // Validate each equation.
  equations.forEach((equation) => {
    const { result: endResult, values } = equation;
    // Check if the equation is valid with either + or * between each value.
    const nbOperator = values.length - 1;
    const nbPossibleEquations = Math.pow(2, nbOperator);
    for (let i = 0; i < nbPossibleEquations; i++) {
      const operators = Number(i).toString(2).padStart(nbOperator, '0');
      const calc = values.reduce((acc, value, index) => {
        if (index === 0) {
          return value;
        }
        if (operators[index - 1] === '1') {
          return acc + value;
        } else {
          return acc * value;
        }
      }, 0);
      if (calc === endResult) {
        result += endResult;
        nbMatches++;
        return;
      }
    }
  });

  console.log(result, nbMatches);
};

const calculate = (values, index, endResult, tempValue) => {
  if (index === values.length) {
    return tempValue === endResult;
  }
  const plus = calculate(values, index + 1, endResult, tempValue + values[index]);
  const mult = calculate(values, index + 1, endResult, tempValue * values[index]);
  const merge = calculate(
    values,
    index + 1,
    endResult,
    Number(tempValue.toString() + values[index].toString())
  );

  return plus || mult || merge;
};

const part2 = () => {
  let result = 0;
  let nbMatches = 0;
  const equations = parsedInput();

  // Validate each equation.
  equations.forEach((equation) => {
    const { result: endResult, values } = equation;
    // Calculate equation via recursive function.
    const success = calculate(values, 1, endResult, values[0]);
    if (success) {
      result += endResult;
      nbMatches++;
      return;
    }
  });

  console.log(result, nbMatches);
};

part1();
part2();
