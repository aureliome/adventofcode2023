const test = require("node:test");
const assert = require("node:assert");
const first = require("./1");
const second = require("./2");

const input = `
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`;

test("first puzzle works", () => {
  assert.strictEqual(first(input), 114);
});

test("second puzzle works", () => {
  assert.strictEqual(second(input), 2);
});
