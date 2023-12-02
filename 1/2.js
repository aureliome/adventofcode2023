/*
  Your calculation isn't quite right. It looks like some of the digits are actually 
  spelled out with letters: one, two, three, four, five, six, seven, 
  eight, and nine also count as valid "digits".

  Equipped with this new information, you now need to find the real first and 
  last digit on each line. 
  
  For example:
    two1nine
    eightwothree
    abcone2threexyz
    xtwone3four
    4nineeightseven2
    zoneight234
    7pqrstsixteen
  In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. 
  Adding these together produces 281.

  What is the sum of all of the calibration values?
*/

const calibrationDocument = require("./input");

const lines = calibrationDocument.split("\n");

let sum = 0;

function isDigit(character) {
  return !isNaN(parseInt(character));
}

const wordNumbers = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  zero: "0",
};

function getFirstNumber(string, index) {
  const substring = string.slice(index);
  for (const key in wordNumbers) {
    if (substring.startsWith(key)) {
      return wordNumbers[key];
    }
  }
  return false;
}

function getLastNumber(string, index) {
  const substring = string.slice(0, index + 1);
  for (const key in wordNumbers) {
    if (substring.endsWith(key)) {
      return wordNumbers[key];
    }
  }
  return false;
}

for (const line of lines) {
  let firstDigit, lastDigit;

  for (let i = 0; i < line.length && !firstDigit; i++) {
    if (isDigit(line[i])) {
      firstDigit = line[i];
    } else if (getFirstNumber(line, i)) {
      firstDigit = getFirstNumber(line, i);
    }
  }

  for (let i = line.length - 1; i >= 0 && !lastDigit; i--) {
    if (isDigit(line[i])) {
      lastDigit = line[i];
    } else if (getLastNumber(line, i)) {
      lastDigit = getLastNumber(line, i);
    }
  }

  sum += parseInt(`${firstDigit}${lastDigit}`);
}

console.log(`The sum is ${sum}`);
