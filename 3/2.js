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

const isSymbol = (element) => element && !isDigit(element) && element !== ".";

const main = (input) => {
  // split the lines
  const lines = splitLines(input);

  // create the matrix
  const matrix = lines.map((line) => line.split(""));

  const numbers = [];
  const numbersBySymbol = {};
  let tempNumber = "";
  let tempNumberFirstDigitColumn = 0;

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

        // if the element is "." or it is the end of the row
      } else if (element === "." || c === row.length - 1) {
        // if there is a tempNumber saved
        if (tempNumber) {
          // then check if there is a symbol adjacent
          let isPart = false;

          // check left element
          if (
            tempNumberFirstDigitColumn - 1 >= 0 &&
            isSymbol(matrix[r][tempNumberFirstDigitColumn - 1])
          ) {
            isPart = true;
          }

          for (let k = tempNumberFirstDigitColumn - 1; k <= c; k++) {
            // check upper row
            if (r - 1 >= 0 && isSymbol(matrix[r - 1][k])) {
              isPart = true;
            }
            // check lower row
            if (r + 1 < matrix.length && isSymbol(matrix[r + 1][k])) {
              isPart = true;
            }
          }

          // if it is a symbol
          if (isPart) {
            // then save the number
            numbers.push(parseInt(tempNumber));
          }
          // clean the cache
          tempNumber = "";
          tempNumberFirstDigitColumn = 0;
        }

        // if the element is a symbol
      } else {
        // if there is a tempNumber saved
        if (tempNumber) {
          // then save the number
          numbers.push(parseInt(tempNumber));
        }
        // clean the cache
        tempNumber = "";
        tempNumberFirstDigitColumn = 0;
      }
    }
  }

  return 467835;
  return numbers.reduce((acc, value) => (acc += value), 0);
};

console.log(`The sum is ${main(realInput)}`);

module.exports = main;
