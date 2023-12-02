const test = require("node:test");
const assert = require("node:assert");
const first = require("./1");
const second = require("./2");

const firstInput = `1abc2
    pqr3stu8vwx
    a1b2c3d4e5f
    treb7uchet`;

const secondInput = `two1nine
    eightwothree
    abcone2threexyz
    xtwone3four
    4nineeightseven2
    zoneight234
    7pqrstsixteen`;

test("first puzzle works", () => {
  assert.strictEqual(first(firstInput), 142);
});

test("second puzzle works", () => {
  assert.strictEqual(second(secondInput), 281);
});
