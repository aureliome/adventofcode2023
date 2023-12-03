const test = require("node:test");
const assert = require("node:assert");
const first = require("./1");
const second = require("./2");

const input = `
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
`;

test("first puzzle works", () => {
  assert.strictEqual(first(input), 4361);
});

test("second puzzle works", () => {
  assert.strictEqual(second(input), 467835);
});
