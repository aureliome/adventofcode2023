const test = require("node:test");
const assert = require("node:assert");
const first = require("./1");
const second = require("./2");

const input = `
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`;

test("first puzzle works", () => {
  assert.strictEqual(first(input), 6440);
});

test("second puzzle works", () => {
  assert.strictEqual(second(input), 5905);
});
