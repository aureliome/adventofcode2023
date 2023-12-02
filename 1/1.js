/*
  The newly-improved calibration document consists of lines of text; each line originally 
  contained a specific calibration value that the Elves now need to recover. On each line, 
  the calibration value can be found by combining the first digit and the last digit 
  (in that order) to form a single two-digit number.

  For example:
    1abc2
    pqr3stu8vwx
    a1b2c3d4e5f
    treb7uchet
  In this example, the calibration values of these four lines are 12, 38, 15, and 77.
  Adding these together produces 142.

  Consider your entire calibration document. 
  What is the sum of all of the calibration values?
*/

const calibrationDocument = require("./input");

const lines = calibrationDocument.split("\n");

let sum = 0;

function isDigit(character) {
  return !isNaN(parseInt(character));
}

for (const line of lines) {
  let firstDigit, lastDigit;

  for (let i = 0; i < line.length && !firstDigit; i++) {
    if (isDigit(line[i])) {
      firstDigit = line[i];
    }
  }

  for (let i = line.length - 1; i >= 0 && !lastDigit; i--) {
    if (isDigit(line[i])) {
      lastDigit = line[i];
    }
  }

  sum += parseInt(`${firstDigit}${lastDigit}`);
}

console.log(`The sum is ${sum}`);
