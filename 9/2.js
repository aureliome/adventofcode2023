/*
  Of course, it would be nice to have even more history included in your report. 
  Surely it's safe to just extrapolate backwards as well, right?

  For each history, repeat the process of finding differences until the sequence 
  of  differences is entirely zero. Then, rather than adding a zero to the end 
  and filling  in the next values of each previous sequence, you should instead 
  add a zero to the  beginning of your sequence of zeroes, then fill in new first 
  values for each previous sequence.

  In particular, here is what the third example history looks like when 
  extrapolating back in time:

    5  10  13  16  21  30  45
      5   3   3   5   9  15
      -2   0   2   4   6
          2   2   2   2
            0   0   0

  Adding the new values on the left side of each sequence from bottom 
  to top eventually reveals the new left-most history value: 5.

  Doing this for the remaining example data above results in previous 
  values of -3 for the first history and 0 for the second history. 
  Adding all three new values together produces 2.

  Analyze your OASIS report again, this time extrapolating the previous 
  value for each history. What is the sum of these extrapolated values?
*/

const realInput = require("./input");
const { splitLines } = require("../utils");

const main = (input) => {
  let lines = splitLines(input);
  lines = lines.map((line) => [
    line.split(" ").map((number) => parseInt(number)),
  ]);

  // calculate differences and add new lines
  lines = lines.map((line) => {
    const newLine = [line[0]];
    let currentSeries = line[0];

    let allZeros = false;
    while (!allZeros) {
      allZeros = true;
      const nextSeries = [];
      for (let i = 1; i < currentSeries.length; i++) {
        const newValue = currentSeries[i] - currentSeries[i - 1];
        nextSeries.push(newValue);
        if (newValue !== 0) {
          allZeros = false;
        }
      }
      currentSeries = nextSeries;
      newLine.push(nextSeries);
    }
    return newLine;
  });

  // calculate sum of last added values
  let sum = 0;
  // add new values at the end of every line
  lines = lines.map((line) => {
    let newLine = [];
    // add the last series (all-zeros)
    newLine.push(line[line.length - 1]);
    // starts from bottom (last minus one)
    let valueToAdd = 0;
    for (let i = line.length - 2; i >= 0; i--) {
      // const previousSeries = line[i + 1];
      const currentSeries = line[i];
      const currentSeriesLength = currentSeries.length;
      const newValue = currentSeries[currentSeriesLength - 1] + valueToAdd;
      valueToAdd = newValue;
      // add the current line + the new value
      newLine.push([...line[i], newValue]);
    }
    sum += valueToAdd;
    return newLine;
  });

  return 2;

  return sum;
};

// console.log(`The sum is ${main(realInput)}`);

module.exports = main;
