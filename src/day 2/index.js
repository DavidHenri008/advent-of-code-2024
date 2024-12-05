const { loadInput } = require('../utils');

const input = loadInput(2);

const prepareData = () => {
  const reports = [];
  // Extract the reports from the input.
  input.forEach((report) => {
    if (report) {
      const numbers = report.split(' ');
      reports.push(numbers.map(Number));
    }
  });

  return reports;
};

/**** Part ONE ****/
const part1 = () => {
  const reports = prepareData();
  let nbSafe = 0;
  reports.forEach((report) => {
    let isSafe = true;
    let isIncreasing = undefined;
    let prevValue = report[0];
    for (let i = 1; i < report.length; i++) {
      const delta = report[i] - prevValue;
      if (delta === 0 || Math.abs(delta) > 3) {
        isSafe = false;
        break;
      }
      if (i === 1) {
        isIncreasing = delta > 0;
      } else {
        if ((isIncreasing && delta < 0) || (!isIncreasing && delta > 0)) {
          isSafe = false;
          break;
        }
      }
      prevValue = report[i];
    }
    if (isSafe) {
      nbSafe++;
    }
  });
  console.log(nbSafe);
};

/**** Part TWO ****/

const validateReport = (report) => {
  let isSafe = true;
  let isIncreasing = undefined;
  for (let i = 1; i < report.length; i++) {
    const delta = report[i] - report[i - 1];
    if (delta === 0 || Math.abs(delta) > 3) {
      isSafe = false;
      break;
    }
    if (i === 1) {
      isIncreasing = delta > 0;
    } else {
      if ((isIncreasing && delta < 0) || (!isIncreasing && delta > 0)) {
        isSafe = false;
        break;
      }
    }
  }
  return isSafe;
};

const part2 = () => {
  const reports = prepareData();
  let nbSafe = 0;
  reports.forEach((report) => {
    let isSafe = validateReport(report);
    if (!isSafe) {
      for (let i = 0; i < report.length; i++) {
        const copy = [...report];
        copy.splice(i, 1);
        isSafe = validateReport(copy);
        if (isSafe) {
          break;
        }
      }
    }
    if (isSafe) {
      nbSafe++;
    }
  });
  console.log(nbSafe);
};

part1();
part2();
