/*
  The researcher has collected a bunch of data and compiled the data into 
  a single giant image (your puzzle input). The image includes empty space 
  (.) and galaxies (#). For example:

    ...#......
    .......#..
    #.........
    ..........
    ......#...
    .#........
    .........#
    ..........
    .......#..
    #...#.....

  The researcher is trying to figure out the sum of the lengths of the shortest 
  path between every pair of galaxies. However, there's a catch: the universe 
  expanded in the time it took the light from those galaxies to reach the observatory.

  Due to something involving gravitational effects, only some space expands. 
  In fact, the result is that any rows or columns that contain no galaxies 
  should all actually be twice as big.

  In the above example, three columns and two rows contain no galaxies:

      v  v  v
    ...#......
    .......#..
    #.........
    >..........<
    ......#...
    .#........
    .........#
    >..........<
    .......#..
    #...#.....
      ^  ^  ^
  
  These rows and columns need to be twice as big; the result of 
  cosmic expansion therefore looks like this:

    ....#........
    .........#...
    #............
    .............
    .............
    ........#....
    .#...........
    ............#
    .............
    .............
    .........#...
    #....#.......

  Equipped with this expanded universe, the shortest path between 
  every pair of galaxies can be found. It can help to assign 
  every galaxy a unique number:

    ....1........
    .........2...
    3............
    .............
    .............
    ........4....
    .5...........
    ............6
    .............
    .............
    .........7...
    8....9.......

  In these 9 galaxies, there are 36 pairs. Only count each pair once; 
  order within the pair doesn't matter. For each pair, find any 
  shortest path between the two galaxies using only steps that move 
  up, down, left, or right exactly one . or # at a time. 
  (The shortest path between two galaxies is allowed 
  to pass through another galaxy.)

  For example, here is one of the shortest paths 
  between galaxies 5 and 9:

    ....1........
    .........2...
    3............
    .............
    .............
    ........4....
    .5...........
    .##.........6
    ..##.........
    ...##........
    ....##...7...
    8....9.......

  This path has length 9 because it takes a minimum of nine steps to 
  get from galaxy 5 to galaxy 9 (the eight locations marked # plus 
  the step onto galaxy 9 itself). Here are some other example 
  shortest path lengths:

  - Between galaxy 1 and galaxy 7: 15
  - Between galaxy 3 and galaxy 6: 17
  - Between galaxy 8 and galaxy 9: 5

  In this example, after expanding the universe, the sum of the 
  shortest path between all 36 pairs of galaxies is 374.

  Expand the universe, then find the length of the shortest 
  path between every pair of galaxies. 
  What is the sum of these lengths?
*/

const realInput = require("./input");
const { splitLines } = require("../utils");

const main = (input) => {
  // get the matrix
  let matrix = splitLines(input).map((line) => line.split(""));
  // console.log(matrix);

  // expand the matrix
  let emptyRows = [];
  let emptyColumns = [];
  // fill emptyColumns
  for (let i = 0; i < matrix[0].length; i++) {
    emptyColumns.push(i);
  }
  // add emptyRows and remove emptyColumns
  matrix.forEach((row, rowIndex) => {
    if (!row.includes("#")) {
      emptyRows.push(rowIndex);
    }
    row.forEach((element, columnIndex) => {
      if (element === "#") {
        emptyColumns = emptyColumns.filter((column) => column !== columnIndex);
      }
    });
  });
  emptyRows = emptyRows.reverse();
  emptyColumns = emptyColumns.reverse();
  // console.log("emptyRows", emptyRows);
  // console.log("emptyColumns", emptyColumns);

  // expand the universe
  // add columns
  matrix = matrix.map((row, rowIndex) => {
    let newRow = row;
    emptyColumns.forEach((emptyColumn) => {
      newRow.splice(emptyColumn, 0, "");
    });
    return newRow;
  });
  // add rows
  emptyRows.forEach((emptyRow) => {
    matrix.splice(emptyRow, 0, []);
  });
  // console.log(matrix);

  // create map
  const map = matrix.reduce((acc, row, rowIndex) => {
    row.forEach((element, columnIndex) => {
      if (element === "#") {
        acc.push([columnIndex, rowIndex]);
      }
    });
    return acc;
  }, []);

  // calculate differences and sum them
  let sum = 0;
  for (let i = 0; i < map.length - 1; i++) {
    for (let k = i + 1; k < map.length; k++) {
      sum += Math.abs(map[i][0] - map[k][0]) + Math.abs(map[i][1] - map[k][1]);
    }
  }

  return sum;
};

// TODO: uncomment this line when you're ready to test it with real input
// console.log(`The sum is ${main(realInput)}`);

module.exports = main;
