const test = require("node:test");
const assert = require("node:assert");
const first = require("./1");
// const second = require("./2");

const input = `
LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)
`;

test("first puzzle works", () => {
  // TODO: replace this value with the expected value
  assert.strictEqual(first(input), 6);
});

// test("second puzzle works", () => {
//   // TODO: replace this value with the expected value
//   assert.strictEqual(second(input), 42);
// });
