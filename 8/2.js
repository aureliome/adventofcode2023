/*
  After examining the maps a bit longer, your attention is drawn to a curious 
  fact: the number of nodes with names ending in A is equal to the number ending 
  in Z! If you were a ghost, you'd probably just start at every node that ends 
  with A and follow all of the paths at the same time until they all 
  simultaneously end up at nodes that end with Z.

  For example:

    LR

    11A = (11B, XXX)
    11B = (XXX, 11Z)
    11Z = (11B, XXX)
    22A = (22B, XXX)
    22B = (22C, 22C)
    22C = (22Z, 22Z)
    22Z = (22B, 22B)
    XXX = (XXX, XXX)

  Here, there are two starting nodes, 11A and 22A (because they both end with A). 
  As you follow each left/right instruction, use that instruction to simultaneously 
  navigate away from both nodes you're currently on. Repeat this process until all 
  of the nodes you're currently on end with Z. (If only some of the nodes you're on 
  end with Z, they act like any other node and you continue as normal.) 
  In this example, you would proceed as follows:

  - Step 0: You are at 11A and 22A.
  - Step 1: You choose all of the left paths, leading you to 11B and 22B.
  - Step 2: You choose all of the right paths, leading you to 11Z and 22C.
  - Step 3: You choose all of the left paths, leading you to 11B and 22Z.
  - Step 4: You choose all of the right paths, leading you to 11Z and 22B.
  - Step 5: You choose all of the left paths, leading you to 11B and 22C.
  - Step 6: You choose all of the right paths, leading you to 11Z and 22Z.

  So, in this example, you end up entirely on nodes that end in Z after 6 steps.

  Simultaneously start on every node that ends with A. 
  How many steps does it take before you're only on nodes that end with Z?
*/

const { splitLines } = require("../utils");
// const realInput = require("./input");

const createLocationsMap = (locations) =>
  locations.reduce((acc, location) => {
    const [key, routes] = location.split(" = ");
    const [routeLeft, routeRight] = routes
      .replace("(", "")
      .replace(")", "")
      .split(", ");
    return {
      ...acc,
      [key]: [routeLeft, routeRight],
    };
  }, {});

const main = (input) => {
  let [directions, ...locations] = splitLines(input);
  directions = directions.split("");

  const locationsMap = createLocationsMap(locations);

  // get all locations that end with "A" as starting points
  let currentLocations = Object.keys(locationsMap).filter((location) =>
    location.endsWith("A")
  );
  // define temporary variables
  let found = false,
    steps = 0,
    currentDirectionIndex = 0;

  while (!found) {
    const directionIndex = directions[currentDirectionIndex] === "L" ? 0 : 1;
    // go to the next locations
    currentLocations = currentLocations.map(
      (currentLocation) => locationsMap[currentLocation][directionIndex]
    );
    // check if all current locations end with "Z"
    found = currentLocations.every((location) => location.endsWith("Z"));
    // increase currentDirectionIndex and steps
    currentDirectionIndex = (currentDirectionIndex + 1) % directions.length;
    steps++;
  }

  return steps;
};

// console.log(`The sum is ${main(realInput)}`);

module.exports = main;
