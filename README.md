# Advent of Code 2023

This repository contains my solutions for [Advent of Code 2023](https://adventofcode.com/2023) challenge.

> Advent of Code is an Advent calendar of small programming puzzles for a variety of skill sets and skill levels that can be solved in any programming language you like. People use them as interview prep, company training, university coursework, practice problems, a speed contest, or to challenge each other.

## Premises

The code I wrote to resolve the puzzle is **not production-ready**. My main goal was just to solve the exerices. You may find code that is not perfectly clean, has few comments and could be refactored and optimized.

The language used to solve the exercises is **Vanilla JavaScript**.

## How it works

### Files Tree

Every folder is relative to a day of the month (e.g. `6/` => `6th december`) and it usually contains 4 files:
  - `1.js` that resolves the first part of the puzzle;
  - `2.js` that resolves the second part of the puzzle;
  - `test.js` that contains the tests for both puzzles;
  - `input.js` that contains the input of the puzzles.

Moreover, in this repository you will find:
- `utils.js` that contains some utils methods;
- `template/` folder that contains a template of a folder, used to create a new folder easily (see below).

### How to test it

To test it, you can use `node (day-of-month)/test.js`, for example: `node 6/test.js`.

It will print the result of the tests and a message with the result of the puzzles on the real input:

```
➜  adventofcode2023 git:(main) ✗ node 6/test.js
The sum is 219849    <-- result of the first puzzle
The sum is 29432455  <-- result of the second puzzle
✔ first puzzle works (0.552042ms)
✔ second puzzle works (0.182292ms)
ℹ tests 2
ℹ suites 0
ℹ pass 2
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 0.194708
```

### How to create a new day

To create a new day, you can run `npm run create (day)`, for example `npm run create 24` to create the folder `24/`.

It will contain the files mentioned in the chapter `Files Tree` above.

## Calendar

Legend:
- `difficulty level` (absolutely subjective): ⚪ easy, 🟡 medium, 🔴 hard;
- `resolved puzzles`: ✅ one part, ✅✅ all;

<table style="text-align: center;">
  <tr>
    <th>MON</th>
    <th>TUE</th>
    <th>WED</th>
    <th>THU</th>
    <th>FRI</th>
    <th>SAT</th>
    <th>SUN</th>
  </tr>
  <tr>
    <td>🎁</td>
    <td>⛄</td>
    <td>🔔</td>
    <td>❄️</td>
    <td>1st<br/>🟡<br/>✅✅</td>
    <td>2nd<br/>🟡<br/>✅✅</td>
    <td>3th<br/>🔴<br/>✅✅</td>
  </tr>
  <tr>
    <td>4th<br/>🟡<br/>✅✅</td>
    <td>5th<br/>🔴<br/>✅</td>
    <td>6th<br/>⚪<br/>✅✅</td>
    <td>7th<br/>🟡<br/>✅✅</td>
    <td>8th<br/>🔴<br/>✅</td>
    <td>9th<br/>⚪<br/>✅✅</td>
    <td>10th</td>
  </tr>
  <tr>
    <td>11th</td>
    <td>12th</td>
    <td>13th</td>
    <td>14th</td>
    <td>15th</td>
    <td>16th</td>
    <td>17th</td>
  </tr>
  <tr>
    <td>18th</td>
    <td>19th</td>
    <td>20th</td>
    <td>21st</td>
    <td>22nd</td>
    <td>23rd</td>
    <td>24th</td>
  </tr>
  <tr>
    <td>25th</td>
    <td>🎄</td>
    <td>🎅</td>
    <td>☃️</td>
    <td>🎉</td>
    <td>🤶</td>
    <td>🍾</td>
  </tr>
</table>
