const { loadInput } = require('../utils');

const input = loadInput(9).filter(Boolean);
const parsedData = () => {
  const result = [];
  const diskMap = input[0];
  // Convert input string by following the format [nb ID][nb spaces][nb ID]...
  let id = 0;
  for (let i = 0; i < diskMap.length; i++) {
    if (i % 2 === 0) {
      // Add ID.
      for (let j = 0; j < diskMap[i]; j++) {
        result.push(id);
      }
      id++;
    } else {
      // Add spaces.
      for (let j = 0; j < diskMap[i]; j++) {
        result.push(null);
      }
    }
  }
  return result;
};

/**** Part ONE ****/
const part1 = () => {
  let result = 0;
  const data = parsedData();
  // Replace null by the last ID found.
  for (let i = 0; i < data.length; i++) {
    if (data[i] === null) {
      // Find the last ID.
      for (let j = data.length - 1; j >= i; j--) {
        if (data[j] !== null) {
          data[i] = data[j];
          data[j] = null;
          break;
        }
      }
    }
  }
  // Calculate checksum with equation = position * ID.
  for (let i = 0; i < data.length; i++) {
    if (data[i] !== null) {
      result += i * data[i];
    }
  }

  console.log(result);
};

/**** Part TWO ****/
const part2 = () => {
  let result = 0;
  const data = parsedData();
  // Replace null by the last ID found.
  for (let i = data.length - 1; i > 0; i--) {
    if (data[i] !== null) {
      // Count the number of IDs.
      let countId = 0;
      for (let j = i; j >= 0; j--) {
        if (data[j] === data[i]) {
          countId++;
        } else {
          break;
        }
      }

      // Find the first nulls.
      for (let k = 0; k <= i - countId; k++) {
        if (data[k] === null) {
          // Count the number of nulls.
          let countNull = 0;
          for (let j = k; j <= i - countId; j++) {
            if (data[j] === null) {
              countNull++;
            } else {
              break;
            }
          }
          if (countNull >= countId) {
            // Replace nulls by IDs and IDs by nulls.
            for (let j = 0; j < countId; j++) {
              data[k + j] = data[i - j];
              data[i - j] = null;
            }
            break;
          }
        }
      }
      i -= countId-1;
    }
  }
  // Calculate checksum with equation = position * ID.
  for (let i = 0; i < data.length; i++) {
    if (data[i] !== null) {
      result += i * data[i];
    }
  }

  console.log(result);
};

part1();
part2();
