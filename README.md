# Advent of Code 2023

This repository contains my solutions for [Advent of Code 2023](https://adventofcode.com/2023) challenge.

> Advent of Code is an Advent calendar of small programming puzzles for a variety of skill sets and skill levels that can be solved in any programming language you like. People use them as interview prep, company training, university coursework, practice problems, a speed contest, or to challenge each other.

- Every folder indicates the day of the month (e.g. `1/` => `1st december`);
- every folder contains 3 files:
  - `1.js` that resolves the first part of the puzzle;
  - `2.js` that resolves the second part of the puzzle;
  - `test.js` that contains the test for both puzzles;
  - any auxiliary files (e.g. `input.js` could contain part of the input of the puzzle);
- at the beginning of every file, you will find a comment with the text of the puzzle;
- to run the test you can use `node (day)/test.js`;
- all solutions are written in **Vanilla JavaScript**, so you can try them you using `node (day)/(part).js`. For example:
  ```bash
  # it runs the second part of the 3rd December puzzle
  node 3/2.js
  ```
- to create a new puzzle day, you can run `npm run create (day)`, for example `npm run create 24` to create the folder `24/`