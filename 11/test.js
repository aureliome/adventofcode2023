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
  assert.strictEqual(second(input, 2), 374);
  assert.strictEqual(second(input, 10), 1030);
  assert.strictEqual(second(input, 100), 8410);
});
