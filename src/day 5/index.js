const { loadInput } = require('../utils');

const input = loadInput(5);

const parseInput = () => {
  const rules = [];
  const pages = [];
  let step = 0;
  input.forEach((line) => {
    if (step === 0) {
      if (line === '') {
        step = 1;
        return;
      }
      const rule = line.split('|').map(Number);
      rules.push(rule);
    } else {
      if (line === '') {
        return;
      }
      const page = line.split(',').map(Number);
      pages.push(page);
    }
  });
  return { rules, pages };
};

/**** Part ONE ****/
const part1 = () => {
  let result = 0;
  const { rules, pages } = parseInput();
  // For each document, validate if the rules are respected.
  pages.forEach((page) => {
    let isValid = true;
    for (let i = 0; i < page.length; i++) {
      // console.log(page[i]);
      // Validate each rule where the first page number must be before the second page number.
      for (let j = 0; j < rules.length; j++) {
        if (page[i] === rules[j][0] && page.indexOf(rules[j][1]) >= 0) {
          const greaterIndex = page.indexOf(rules[j][1]);
          // console.log(rules[j], page);
          if (greaterIndex < i) {
            isValid = false;
            break;
          }
        }
      }
    }
    if (isValid) {
      // console.log(page);
      const middleIndex = Math.floor(page.length / 2);
      result += page[middleIndex];
    }
  });
  console.log(result);
};

/**** Part TWO ****/
const part2 = () => {
  let result = 0;
  const { rules, pages } = parseInput();
  const fixed = [];
  // For each document, validate if the rules are respected.
  pages.forEach((page) => {
    let fixedPage = [...page];
    let isValid = true;
    // console.log(page);
    for (let i = 0; i < fixedPage.length; i++) {
      // Validate each rule where the first page number must be before the second page number.
      for (let j = 0; j < rules.length; j++) {
        if (fixedPage[i] === rules[j][0] && fixedPage.indexOf(rules[j][1]) >= 0) {
          const greaterIndex = fixedPage.indexOf(rules[j][1]);
          if (greaterIndex < i) {
            isValid = false;
            // Swap pages.
            fixedPage.splice(greaterIndex, 1);
            fixedPage.splice(i, 0, rules[j][1]);
            // console.log(rules[j], fixedPage);
            i = 0;
            j = 0;
            break;
          } else {
            // console.log(rules[j]);
          }
        }
      }
    }
    if (!isValid) {
      // console.log(page, fixedPage);
      fixed.push(fixedPage);
      const middleIndex = Math.floor(fixedPage.length / 2);
      result += fixedPage[middleIndex];
    }
  });
  console.log(result);
};

part1();
part2();
