const test = require("node:test");
const assert = require("node:assert");
const first = require("./1");
const second = require("./2");

const input = `
Time:      7  15   30
Distance:  9  40  200
`;

test("first puzzle works", () => {
  // TODO: replace this value with the expected value
  assert.strictEqual(first(input), 288);
});

test("second puzzle works", () => {
  // TODO: replace this value with the expected value
  assert.strictEqual(second(input), 42);
});
