const fs = require('fs');
const path = require('path');
const {
  MAX_DATE,
  BASE_FOLDER,
  DAY_FOLDER_NAME,
  INPUT_FOLDER_NAME,
  INPUT_FILE_NAME,
  INDEX_FILE_NAME,
} = require('./constants');

const INPUT_URL = 'https://adventofcode.com/2024/day/{{day}}/input';
const AOC_COOKIE =
  'session=53616c7465645f5f31e5eb32be18fe4c5ca419063d2532d96fe00421c8c0a376ab864197609e32e0631bde42935e20cf000e822c5fc9e575a4fd66d2db79a5d9';

const currentDate = new Date();
let daysToLoad = currentDate.getDate();

// Set daysToLoad to MAX_DATE if the current date is past December 25th, 2023.
if (
  currentDate.getFullYear() > 2024 ||
  currentDate.getMonth() !== 11 ||
  currentDate.getDate() > MAX_DATE
) {
  daysToLoad = MAX_DATE;
}

async function initDays() {
  for (let day = 1; day <= daysToLoad; day++) {
    const folderPath = path.join(BASE_FOLDER, DAY_FOLDER_NAME.replace('{{day}}', day));
    const inputFolderPath = path.join(folderPath, INPUT_FOLDER_NAME);
    const inputFilePath = path.join(inputFolderPath, INPUT_FILE_NAME);
    const indexFilePath = path.join(folderPath, INDEX_FILE_NAME);

    // Create folder structure if it doesn't exist.
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
      fs.mkdirSync(inputFolderPath);
    }

    // Fetch input file if it doesn't exist.
    if (!fs.existsSync(inputFilePath)) {
      const response = await fetch(INPUT_URL.replace('{{day}}', day), {
        method: 'get',
        headers: { Cookie: AOC_COOKIE },
      });
      if (response.status >= 300) {
        console.error(
          `Invalid request for day ${day}. Status code ${response.status}: ${response.statusText}`
        );
      } else {
        await response
          .text()
          .then((data) => {
            fs.writeFileSync(inputFilePath, data);
            console.log(`Day ${day} input saved to ${inputFilePath}`);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }

    // Create index.js if it doesn't exist.

    if (!fs.existsSync(indexFilePath)) {
      const data = `const { loadInput } = require('../utils');\n\nconst input = loadInput(${day});\n\n/**** Part ONE ****/\nconst part1 = () => {\n\n};\n\n/**** Part TWO ****/\nconst part2 = () => {\n\n};\n\npart1();\npart2();\n`;
      fs.writeFileSync(indexFilePath, data);
    }
  }
}

initDays();
