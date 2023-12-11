const test = require("node:test");
const assert = require("node:assert");
const first = require("./1");
const second = require("./2");

/*
  TODO: insert here the test input of the puzzles
*/
const input = `
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
`;

test("first puzzle works", () => {
  assert.strictEqual(first(input), 374);
});

test("second puzzle works", () => {
  // TODO: replace this value with the expected value
  // assert.strictEqual(second(input), 42);
});
