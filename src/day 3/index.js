const { loadInput } = require('../utils');

const input = loadInput(3);

const prepareData = () => {
  // Concatenate lines into a single string.
  return input.join('\n');
};

const calculateCmd = (command) => {
  const regexp = /mul\((\d{1,3}),(\d{1,3})\)/g;
  const commands = [...command.matchAll(regexp)];
  let result = 0;
  for (let i = 0; i < commands.length; i++) {
    const [, a, b] = commands[i];
    result += a * b;
  }
  return result;
};

/**** Part ONE ****/
const part1 = () => {
  const command = prepareData();

  // Calculate commands
  const result = calculateCmd(command);
  console.log(result);
};

/**** Part TWO ****/
const part2 = () => {
  const command = prepareData();
  const regexpDo = /do\(\)/g;
  const regexpDont = /don't\(\)/g;
  const dontIndex = [...command.matchAll(regexpDont)].map((dontMatch) => dontMatch.index);
  const doIndex = [...command.matchAll(regexpDo)].map((doMatch) => doMatch.index);
  // Splice command by removing dont't segments.
  let parsedCommand = '';
  let startIndex = 0;
  for (let i = 0; i < dontIndex.length; i++) {
    const start = dontIndex[i];
    if (start > startIndex) {
      // Find the next do index greater than don't index.
      const end = doIndex.find((doIndex) => doIndex > start);
      parsedCommand += command.substring(startIndex, start);
      // console.log(startIndex, start);
      startIndex = end;
    }
  }
  if (startIndex < command.length) {
    parsedCommand += command.substring(startIndex);
  }
  // console.log(dontIndex, doIndex);

  const result = calculateCmd(parsedCommand);
  console.log(result);
};

part1();
part2();
