/*
  The missing part wasn't the only issue - one of the gears 
  in the engine is wrong. A gear is any * symbol that is adjacent 
  to exactly two part numbers. Its gear ratio is the 
  result of multiplying those two numbers together.

  This time, you need to find the gear ratio of every gear and add 
  them all up so that the engineer can figure out which 
  gear needs to be replaced.

  Consider the same engine schematic again:

    467..114..
    ...*......
    ..35..633.
    ......#...
    617*......
    .....+.58.
    ..592.....
    ......755.
    ...$.*....
    .664.598..

  In this schematic, there are two gears. The first is in the top 
  left; it has part numbers 467 and 35, so its gear ratio is 16345. 
  The second gear is in the lower right; its gear ratio is 451490. 
  (The * adjacent to 617 is not a gear because it is only adjacent 
  to one part number.) Adding up all of the gear ratios produces 467835.

  What is the sum of all of the gear ratios in your engine schematic?
*/

const { splitLines, isDigit } = require("../utils");
const realInput = require("./input");

const isAsterisk = (element) => element && element === "*";

const main = (input) => {
  // split the lines
  const lines = splitLines(input);

  // create the matrix
  const matrix = lines.map((line) => line.split(""));

  let tempNumber = "";
  let tempNumberFirstDigitColumn = 0;

  // { (row,column): [(numbers)] }
  const asterisksNumbers = {};
  const addAsterickNumber = (number, row, column) => {
    const coordinates = `${row}-${column}`;
    if (!asterisksNumbers[coordinates]) {
      asterisksNumbers[coordinates] = [];
    }
    asterisksNumbers[coordinates].push(number);
  };

  for (let r = 0; r < matrix.length; r++) {
    const row = matrix[r];
    for (let c = 0; c < row.length; c++) {
      const element = matrix[r][c];

      // if the element is a digit
      if (isDigit(element)) {
        // if it is the first digit of tempNumber
        if (!tempNumber) {
          // then save its column number
          tempNumberFirstDigitColumn = c;
        }

        // add the digit to the tempNumber
        tempNumber += element;

        // if the element is not digit or asterisk
        // or it is the end of the row
      } else if (!isAsterisk(element) || c === row.length - 1) {
        // if there is a tempNumber saved
        if (tempNumber) {
          // then check if there is a asterisk adjacent

          // check left element
          if (
            tempNumberFirstDigitColumn - 1 >= 0 &&
            isAsterisk(matrix[r][tempNumberFirstDigitColumn - 1])
          ) {
            addAsterickNumber(
              parseInt(tempNumber),
              r,
              tempNumberFirstDigitColumn - 1
            );
          }

          for (let k = tempNumberFirstDigitColumn - 1; k <= c; k++) {
            // check upper row
            if (r - 1 >= 0 && isAsterisk(matrix[r - 1][k])) {
              addAsterickNumber(parseInt(tempNumber), r - 1, k);
            }
            // check lower row
            if (r + 1 < matrix.length && isAsterisk(matrix[r + 1][k])) {
              addAsterickNumber(parseInt(tempNumber), r + 1, k);
            }
          }

          // clean the cache
          tempNumber = "";
          tempNumberFirstDigitColumn = 0;
        }

        // if the element is a asterisk
      } else {
        // if there is a tempNumber saved
        if (tempNumber) {
          // then save the number
          addAsterickNumber(parseInt(tempNumber), r, c);
        }
        // clean the cache
        tempNumber = "";
        tempNumberFirstDigitColumn = 0;
      }
    }
  }

  let sum = 0;
  for (const key in asterisksNumbers) {
    const numbers = asterisksNumbers[key];
    if (numbers.length === 2) {
      sum += numbers.reduce((acc, value) => (acc *= value), 1);
    }
  }

  return sum;
};

console.log(`The sum is ${main(realInput)}`);

module.exports = main;
