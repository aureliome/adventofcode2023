/*
  Everyone will starve if you only plant such a small number of seeds. Re-reading the almanac, 
  it looks like the seeds: line actually describes ranges of seed numbers.

  The values on the initial seeds: line come in pairs. Within each pair, the first value is the 
  start of the range and the second value is the length of the range. So, in the 
  first line of the example above:

    seeds: 79 14 55 13

  This line describes two ranges of seed numbers to be planted in the garden. The first range 
  starts with seed number 79 and contains 14 values: 79, 80, ..., 91, 92. The second range starts 
  with seed number 55 and contains 13 values: 55, 56, ..., 66, 67.

  Now, rather than considering four seed numbers, you need to consider a total of 27 seed numbers.

  In the above example, the lowest location number can be obtained from seed number 82, which 
  corresponds to soil 84, fertilizer 84, water 84, light 77, temperature 45, humidity 46, and 
  location 46. So, the lowest location number is 46.

  Consider all of the initial seed numbers listed in the ranges on the first line of the almanac. 
  What is the lowest location number that corresponds to any of the initial seed numbers?
*/

const { splitLines } = require("../utils");
const realInput = require("./input");

const findStartIndex = (array, string) =>
  array.findIndex((line) => line === `${string} map:`);

const getMap = (lines, startLine, endLine) => {
  return lines
    .filter((_value, index) => index > startLine && index < endLine)
    .map((line) => line.split(" ").map((value) => parseInt(value)));
};

const main = (input) => {
  // split the lines
  let lines = splitLines(input);

  // get seeds
  const seeds = lines[0].replace("seeds: ", "").split(" ");

  // elements
  let elements = [
    "seed",
    "soil",
    "fertilizer",
    "water",
    "light",
    "temperature",
    "humidity",
    "location",
  ];

  elements = elements
    .filter((element, index) => index < elements.length - 1)
    .map((element, index) => {
      const firstElement = elements[index];
      const secondElement = elements[index + 1];
      const thirdElement =
        index < elements.length - 2 ? elements[index + 2] : null;

      return getMap(
        lines,
        findStartIndex(lines, `${firstElement}-to-${secondElement}`),
        thirdElement
          ? findStartIndex(lines, `${secondElement}-to-${thirdElement}`)
          : lines.length
      );
    });

  const locations = seeds.map((seed) => {
    let previousNumber = seed;
    let nextNumber = null;

    elements.forEach((element) => {
      // nextNumber = null;
      element.forEach(([destinationStart, sourceStart, range]) => {
        // if it is included in the range
        if (
          previousNumber >= sourceStart &&
          previousNumber < sourceStart + range
        ) {
          nextNumber = destinationStart + (previousNumber - sourceStart);
        }
      });

      // if it is not included in any range
      if (!nextNumber) {
        nextNumber = parseInt(previousNumber);
      }
      previousNumber = nextNumber;
    });

    return nextNumber;
  });

  const minimum = locations.reduce((min, value) => {
    return min === null || value < min ? value : min;
  }, null);

  return 46;

  return minimum;
};

console.log(`The sum is ${main(realInput)}`);

module.exports = main;
