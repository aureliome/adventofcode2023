const test = require("node:test");
const assert = require("node:assert");
const first = require("./1");
const second = require("./2");

const firstInput = `
LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)
`;

const secondInput = `
LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
`;

test("first puzzle works", () => {
  assert.strictEqual(first(firstInput), 6);
});

test("second puzzle works", () => {
  assert.strictEqual(second(secondInput), 6);
});
