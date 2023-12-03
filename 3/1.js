/*
  The engine schematic (your puzzle input) consists of a visual 
  representation of the engine. There are lots of numbers and 
  symbols you don't really understand, but apparently any number 
  adjacent to a symbol, even diagonally, is a "part number" and 
  should be included in your sum. (Periods (.) do not count as a symbol.)

  Here is an example engine schematic:

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

  In this schematic, two numbers are not part numbers because they are 
  not adjacent to a symbol: 114 (top right) and 58 (middle right). 
  Every other number is adjacent to a symbol and so is 
  a part number; their sum is 4361.

  Of course, the actual engine schematic is much larger. 
  What is the sum of all of the part numbers in the engine schematic?
*/

const { splitLines, isDigit } = require("../utils");

const isSymbol = (element) => element && !isDigit(element) && element !== ".";

const main = (input) => {
  // split the lines
  const lines = splitLines(input);

  // create the matrix
  const matrix = lines.map((line) => line.split(""));

  const numbers = [];
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

          // console.log(tempNumber, tempNumberFirstDigitColumn);
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
          // console.log(tempNumber, isPart);
          // clean the cache
          tempNumber = "";
          tempNumberFirstDigitColumn = 0;
        }

        // if the element is a symbol
      } else {
        // if there is a tempNumber saved
        if (tempNumber) {
          // console.log(tempNumber, true);
          // then save the number
          numbers.push(parseInt(tempNumber));
        }
        // clean the cache
        tempNumber = "";
        tempNumberFirstDigitColumn = 0;
      }
    }
  }

  // console.log(numbers);

  return numbers.reduce((acc, value) => (acc += value), 0);
};

// console.log(`The sum is ${main(realInput)}`);

module.exports = main;
